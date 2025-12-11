
import { User, Conversation, Message, RAGDocument, NewsItem, LLMConfig, NLUIntent, Category, SystemBackup, RasaRule, RasaStory } from '../types';
import { UNIVERSITY_DATA, SYSTEM_INSTRUCTION } from '../data/universityData';
import { RAG_CONTENT } from '../data/rag_documents';

class DatabaseService {
  private static instance: DatabaseService;
  
  private constructor() {
    this.init();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private init() {
    // --- USER INIT ---
    if (!localStorage.getItem('tdu_users')) {
        const defaultUsers: User[] = [
            {
                id: 'admin_01',
                name: 'Quản trị viên',
                username: 'admin',
                password: 'admin123', // Demo only
                role: 'admin',
                status: 'active',
                createdAt: Date.now(),
                lastActiveAt: Date.now(),
                messagesCount: 0,
                email: 'admin@tdu.edu.vn'
            }
        ];
        localStorage.setItem('tdu_users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('tdu_conversations')) localStorage.setItem('tdu_conversations', JSON.stringify([]));
    if (!localStorage.getItem('tdu_messages')) localStorage.setItem('tdu_messages', JSON.stringify([]));
    
    // Initialize CMS News if empty
    if (!localStorage.getItem('tdu_content_news')) {
        localStorage.setItem('tdu_content_news', JSON.stringify(UNIVERSITY_DATA.news));
    }

    // --- LLM CONFIG & KEY MIGRATION ---
    const currentConfigStr = localStorage.getItem('tdu_llm_config');
    const NEW_DEFAULT_KEY = 'AIzaSyDyazYgdqSvwmwCB7AGoI5enUdSwlE9y6A'; // User provided key
    const OLD_DEFAULT_KEY = 'AIzaSyC87OOluvOH1BMUxgNCjvJnF0ApwDtFa38';

    const defaultConfig: LLMConfig = {
        provider: 'gemini',
        apiKey: NEW_DEFAULT_KEY,
        modelName: 'gemini-2.5-flash',
        systemPrompt: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        maxOutputTokens: 2048,
        quotaUsed: 0,
        quotaLimit: 1000000,
        lastTrainedAt: Date.now()
    };

    if (!currentConfigStr) {
        localStorage.setItem('tdu_llm_config', JSON.stringify(defaultConfig));
    } else {
        // Migration: If the stored key is the old default or missing, update it to the new one
        try {
            const currentConfig = JSON.parse(currentConfigStr) as LLMConfig;
            if (!currentConfig.apiKey || currentConfig.apiKey === OLD_DEFAULT_KEY) {
                currentConfig.apiKey = NEW_DEFAULT_KEY;
                localStorage.setItem('tdu_llm_config', JSON.stringify(currentConfig));
            }
        } catch (e) {
            // If corrupt, reset
            localStorage.setItem('tdu_llm_config', JSON.stringify(defaultConfig));
        }
    }

    // Initialize RAG Docs (Force update on fresh load or checking specific version)
    // In a real app, we would version check. Here we overwrite if it looks default.
    const ragDocs: RAGDocument[] = [
            { id: 'doc_1', title: 'Thông tin Tuyển sinh 2025', content: RAG_CONTENT.ADMISSIONS_2025, type: 'PDF', status: 'Indexed', updatedAt: Date.now(), size: '1.2MB' },
            { id: 'doc_2', title: 'Học phí 2025', content: RAG_CONTENT.TUITION_2025, type: 'PDF', status: 'Indexed', updatedAt: Date.now(), size: '500KB' },
            { id: 'doc_3', title: 'Học bổng 2025', content: RAG_CONTENT.SCHOLARSHIPS_2025, type: 'PDF', status: 'Indexed', updatedAt: Date.now(), size: '850KB' },
            { id: 'doc_4', title: 'Sau Đại học 2025', content: RAG_CONTENT.MASTERS_PHD, type: 'PDF', status: 'Indexed', updatedAt: Date.now(), size: '600KB' },
            { id: 'doc_5', title: 'Văn bằng 2 & Liên thông', content: RAG_CONTENT.SECOND_DEGREE, type: 'PDF', status: 'Indexed', updatedAt: Date.now(), size: '700KB' }
    ];
    
    // Only set if not exists to avoid overwriting user uploads in this demo session context
    if (!localStorage.getItem('tdu_rag_docs')) {
        localStorage.setItem('tdu_rag_docs', JSON.stringify(ragDocs));
    }
  }

  // --- HELPER ---
  public generateSlug(text: string): string {
      return text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
  }

  // --- LLM CONFIG ---
  public getLLMConfig(): LLMConfig {
      return JSON.parse(localStorage.getItem('tdu_llm_config') || '{}');
  }

  public saveLLMConfig(config: LLMConfig) {
      localStorage.setItem('tdu_llm_config', JSON.stringify(config));
  }

  // --- NEWS ---
  public getNews(): NewsItem[] {
      return JSON.parse(localStorage.getItem('tdu_content_news') || '[]');
  }

  // --- USER MANAGEMENT ---
  public getAllUsers(): User[] {
      return JSON.parse(localStorage.getItem('tdu_users') || '[]');
  }
  
  public loginAdmin(username: string, pass: string): User {
      const users = this.getAllUsers();
      const user = users.find(u => u.username === username && u.password === pass && u.role === 'admin');
      if (!user) throw new Error("Thông tin đăng nhập quản trị không hợp lệ");
      
      user.lastActiveAt = Date.now();
      this.saveUser(user);
      this.setCurrentUserId(user.id);
      return user;
  }

  public loginUser(phone: string, pass: string): User {
      const users = this.getAllUsers();
      const user = users.find(u => u.phone === phone && u.password === pass);
      if (!user) throw new Error("Sai số điện thoại hoặc mật khẩu");
      
      user.lastActiveAt = Date.now();
      this.saveUser(user);
      this.setCurrentUserId(user.id);
      return user;
  }

  public registerUser(name: string, phone: string, pass: string): User {
      const users = this.getAllUsers();
      if (users.find(u => u.phone === phone)) throw new Error("Số điện thoại đã tồn tại");
      
      const user: User = {
          id: crypto.randomUUID(),
          name, phone, password: pass,
          role: 'user',
          status: 'active',
          createdAt: Date.now(),
          lastActiveAt: Date.now(),
          messagesCount: 0
      };
      users.push(user);
      this.saveUsers(users);
      this.setCurrentUserId(user.id);
      return user;
  }

  public getOrCreateGuest(): User {
      const id = localStorage.getItem('tdu_current_user_id');
      if (id && id.startsWith('guest_')) {
          const user = this.getAllUsers().find(u => u.id === id);
          if (user) return user;
      }

      const guest: User = {
          id: 'guest_' + Date.now(), name: "Bạn", role: 'user', status: 'active',
          createdAt: Date.now(), lastActiveAt: Date.now(), messagesCount: 0
      };
      this.setCurrentUserId(guest.id);
      return guest;
  }

  public getCurrentUser(): User | null {
      const id = localStorage.getItem('tdu_current_user_id');
      if (!id) return null;
      return this.getAllUsers().find(u => u.id === id) || null;
  }

  private saveUsers(users: User[]) { localStorage.setItem('tdu_users', JSON.stringify(users)); }
  public saveUser(user: User) {
      const users = this.getAllUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) users[idx] = user; else users.push(user);
      this.saveUsers(users);
  }
  private setCurrentUserId(id: string) { localStorage.setItem('tdu_current_user_id', id); }
  public logout() { localStorage.removeItem('tdu_current_user_id'); }

  // --- CONVERSATION & MESSAGES ---
  public createConversation(userId: string, title: string): Conversation {
      const convs = JSON.parse(localStorage.getItem('tdu_conversations') || '[]');
      // Smart truncate for title
      const smartTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
      const newConv: Conversation = { 
          id: crypto.randomUUID(), 
          userId, 
          title: smartTitle, 
          lastMessage: title.substring(0, 50), 
          updatedAt: Date.now(), 
          isRead: true 
      };
      convs.unshift(newConv);
      localStorage.setItem('tdu_conversations', JSON.stringify(convs));
      return newConv;
  }
  
  public getConversations(userId: string): Conversation[] {
      return JSON.parse(localStorage.getItem('tdu_conversations') || '[]')
          .filter((c: Conversation) => c.userId === userId)
          .sort((a: Conversation, b: Conversation) => b.updatedAt - a.updatedAt);
  }

  public addMessage(msg: Omit<Message, 'id'>): Message {
      const msgs = JSON.parse(localStorage.getItem('tdu_messages') || '[]');
      const newMsg = { ...msg, id: crypto.randomUUID() };
      msgs.push(newMsg);
      localStorage.setItem('tdu_messages', JSON.stringify(msgs));
      
      // Update last message in conv
      const convs = JSON.parse(localStorage.getItem('tdu_conversations') || '[]');
      const idx = convs.findIndex((c: Conversation) => c.id === msg.conversationId);
      if (idx !== -1) {
          convs[idx].lastMessage = msg.text.substring(0, 50);
          convs[idx].updatedAt = Date.now();
          // If this is the very first user message (and not default title), simple title update could happen here if logic requires
          localStorage.setItem('tdu_conversations', JSON.stringify(convs));
      }
      return newMsg;
  }

  public getMessages(convId: string): Message[] {
      return JSON.parse(localStorage.getItem('tdu_messages') || '[]')
          .filter((m: Message) => m.conversationId === convId)
          .sort((a: Message, b: Message) => a.timestamp - b.timestamp);
  }

  // Clear messages for a specific conversation but keep the conversation
  public clearMessages(convId: string) {
      let msgs = JSON.parse(localStorage.getItem('tdu_messages') || '[]');
      msgs = msgs.filter((m: Message) => m.conversationId !== convId);
      localStorage.setItem('tdu_messages', JSON.stringify(msgs));
  }

  public deleteConversation(convId: string) {
      let convs = JSON.parse(localStorage.getItem('tdu_conversations') || '[]');
      convs = convs.filter((c: Conversation) => c.id !== convId);
      localStorage.setItem('tdu_conversations', JSON.stringify(convs));
      
      // Clean up messages
      this.clearMessages(convId);
  }

  public deleteAllHistory(userId: string) {
      let convs = JSON.parse(localStorage.getItem('tdu_conversations') || '[]');
      const userConvs = convs.filter((c: Conversation) => c.userId === userId).map((c: Conversation) => c.id);
      
      // Remove convs
      convs = convs.filter((c: Conversation) => c.userId !== userId);
      localStorage.setItem('tdu_conversations', JSON.stringify(convs));

      // Remove messages
      let msgs = JSON.parse(localStorage.getItem('tdu_messages') || '[]');
      msgs = msgs.filter((m: Message) => !userConvs.includes(m.conversationId));
      localStorage.setItem('tdu_messages', JSON.stringify(msgs));
  }

  public updateConversationTitle(convId: string, title: string) {
      const convs = JSON.parse(localStorage.getItem('tdu_conversations') || '[]');
      const idx = convs.findIndex((c: Conversation) => c.id === convId);
      if (idx !== -1) { convs[idx].title = title; localStorage.setItem('tdu_conversations', JSON.stringify(convs)); }
  }

  // --- RAG (Improved Scoring Search) ---
  public getRAGDocuments(): RAGDocument[] { return JSON.parse(localStorage.getItem('tdu_rag_docs') || '[]'); }
  
  public searchRAGDocuments(query: string, limit: number = 3): RAGDocument[] {
      const docs = this.getRAGDocuments();
      if (!query) return [];

      const queryTerms = query.toLowerCase()
        .replace(/[^\w\s\u00C0-\u1EF9]/g, '') // Keep Vietnamese chars, remove punctuation
        .split(/\s+/)
        .filter(t => t.length > 2); // Ignore very short words
      
      if (queryTerms.length === 0) return [];

      const scoredDocs = docs.map(doc => {
          let score = 0;
          const lowerContent = doc.content.toLowerCase();
          const lowerTitle = doc.title.toLowerCase();
          const lowerQuery = query.toLowerCase();

          // 1. Exact Phrase Match (High weight)
          if (lowerContent.includes(lowerQuery)) score += 10;
          if (lowerTitle.includes(lowerQuery)) score += 15;

          // 2. Term Match
          queryTerms.forEach(term => {
              // Title matches are worth more
              if (lowerTitle.includes(term)) score += 5;
              
              // Content matches (Frequency approximate)
              const regex = new RegExp(term, 'g');
              const matches = (lowerContent.match(regex) || []).length;
              score += matches * 1; 
          });
          
          return { doc, score };
      });

      // Filter out low scores and sort
      return scoredDocs
        .filter(d => d.score > 2) // Minimum threshold
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(i => i.doc);
  }

  public addRAGDocument(doc: RAGDocument) {
      const docs = this.getRAGDocuments();
      docs.unshift(doc);
      localStorage.setItem('tdu_rag_docs', JSON.stringify(docs));
  }

  public deleteRAGDocument(id: string) {
      let docs = this.getRAGDocuments();
      docs = docs.filter(d => d.id !== id);
      localStorage.setItem('tdu_rag_docs', JSON.stringify(docs));
  }

  // --- MOCK STATS FOR ADMIN DASHBOARD ---
  public getAdvancedStats() {
      const users = this.getAllUsers();
      
      const topMajors = [
          { name: 'Dược học', value: 45 },
          { name: 'Điều dưỡng', value: 38 },
          { name: 'QTKD', value: 32 },
          { name: 'Ngôn ngữ Anh', value: 25 },
          { name: 'Công nghệ thông tin', value: 20 },
      ];

      const conversionRates = [
          { name: 'Học bạ', applied: 150, enrolled: 110 },
          { name: 'Thi THPT', applied: 90, enrolled: 50 },
          { name: 'ĐGNL', applied: 40, enrolled: 15 },
      ];

      return {
          overview: { 
              totalUsers: users.length, 
              totalConversations: Math.floor(users.length * 1.5) + 120, 
              messagesToday: 412, 
              totalLeads: 45 
          },
          charts: { 
              msgsPerDay: [{name: 'T2', messages: 120}, {name: 'T3', messages: 145}, {name: 'T4', messages: 110}, {name: 'T5', messages: 180}, {name: 'T6', messages: 160}, {name: 'T7', messages: 90}, {name: 'CN', messages: 85}],
              topMajors,
              conversionRates
          }
      };
  }
}

export const db = DatabaseService.getInstance();
