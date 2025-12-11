
import { GoogleGenAI, GenerateContentResponse, Content, Part } from "@google/genai";
import { db } from "./db";

export const sendMessageStream = async function* (
    message: string, 
    conversationId: string,
    pageContext?: string
): AsyncGenerator<string, void, unknown> {
  try {
    const config = db.getLLMConfig();
    
    // Strict adherence: Use process.env.API_KEY as the primary source.
    // We fall back to config.apiKey only if the env var is not present (e.g., local dev overrides),
    // but the system is designed to rely on the injected environment variable.
    const apiKey = process.env.API_KEY || config.apiKey; 

    if (!apiKey) {
        console.error("API Key not found in environment or config");
        throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey }); 

    // --- RAG LOGIC (Strict Context Injection) ---
    // Use the limit parameter (4 docs)
    const relevantDocs = db.searchRAGDocuments(message, 4); 
    
    let ragContextBlock = "";
    if (relevantDocs.length > 0) {
        ragContextBlock = `<context_data>\n${relevantDocs.map(d => `SOURCE: ${d.title}\nCONTENT:\n${d.content}\n----------------`).join('\n')}\n</context_data>`;
    } else {
        ragContextBlock = `<context_data>Không tìm thấy tài liệu cụ thể trong hệ thống. Hãy trả lời dựa trên kiến thức chung về quy chế tuyển sinh đại học hiện hành, nhưng phải lịch sự nhắc người dùng liên hệ hotline để xác thực.</context_data>`;
    }

    // --- USER CONTEXT & HISTORY LOGIC ---
    const dbMessages = db.getMessages(conversationId);
    
    // De-duplicate the last message to prevent echo in history construction
    const validHistory = dbMessages.filter(m => m.text !== message); 

    const history: Content[] = validHistory.map(m => ({
        role: m.role === 'admin' ? 'model' : m.role,
        parts: [{ text: m.text }] as Part[]
    }));

    // --- PERSONALIZATION CONTEXT ---
    const user = db.getCurrentUser();
    const now = new Date();
    const timeString = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    
    let userContext = `[System: Current Time ${timeString} | Page: ${pageContext || 'N/A'}]`;
    
    if (user && user.role !== 'admin') {
        const userName = user.name === 'Bạn' || user.name === 'Khách' ? 'bạn' : user.name;
        userContext += `\n[User: Name="${userName}", Role="${user.id.startsWith('guest') ? 'Guest' : 'Member'}"]`;
    }

    // --- FINAL PROMPT ASSEMBLY ---
    // Enforce persona and strict RAG adherence in the system instruction
    const systemPrompt = config.systemPrompt || "Bạn là TDU BOT - Chuyên viên Tư vấn Tuyển sinh ảo (AI) của Trường Đại học Tây Đô.";
    const finalSystemInstruction = `${systemPrompt}

${userContext}

**HƯỚNG DẪN TRẢ LỜI:**
1. **Ưu tiên tuyệt đối dữ liệu trong <context_data>.**
2. **Không bịa đặt:** Nếu không có thông tin, hãy hướng dẫn liên hệ hotline.
3. **Định dạng:** Sử dụng Markdown (Bold, List, Table) để trình bày đẹp mắt.
4. **Tương tác:** Luôn gợi ý câu hỏi tiếp theo (Quick Replies) ở cuối câu trả lời.

**CONTEXT DATA (RAG):**
${ragContextBlock}`;

    // Create Chat Session
    // Force usage of gemini-2.5-flash as per guidelines for basic text tasks
    const session = ai.chats.create({
        model: "gemini-2.5-flash", 
        config: {
            systemInstruction: finalSystemInstruction,
            temperature: 0.7, // Balanced creativity and accuracy
            topK: 40,
        },
        history: history
    });
    
    const resultStream = await session.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) yield c.text;
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('API_KEY')) {
        yield "⚠️ Lỗi cấu hình hệ thống (API Key). Vui lòng báo cho quản trị viên.";
    } else {
        yield "Hệ thống đang bận xử lý nhiều yêu cầu. Bạn vui lòng thử lại sau giây lát hoặc gọi hotline 0939 028 579 nhé! 🙏";
    }
  }
};
