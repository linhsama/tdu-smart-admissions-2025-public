
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Send, Bot, X, Mic, MicOff, Trash2, Sparkles, MessageSquare, ChevronLeft, History, User as UserIcon, Menu, LogOut, Plus, LogIn, UserPlus, AlertCircle, MoreVertical, Eraser, Info, CheckCircle2, ArrowDown, Clock } from 'lucide-react';
import { Message, Conversation, ChatInterfaceProps, User as UserType } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { db } from '../services/db';

// --- AUTH SCREEN ---
const AuthScreen = ({ onLoginSuccess, onGuest }: { onLoginSuccess: (u: UserType) => void, onGuest: () => void }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = isRegister 
                ? db.registerUser(form.name, form.phone, form.password)
                : db.loginUser(form.phone, form.password);
            onLoginSuccess(user);
        } catch (err: any) { setError(err.message); }
    };

    return (
        <div className="absolute inset-0 z-[60] bg-white/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="w-full max-w-[300px] bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 ring-4 ring-slate-50">
                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200 transform rotate-3">
                        <Bot size={28} className="text-white"/>
                    </div>
                    <h3 className="text-xl font-black text-slate-800">TDU Assistant</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Đăng nhập để lưu lại lịch sử tư vấn của bạn</p>
                </div>
                
                {error && <div className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-xl mb-4 text-center border border-red-100 flex items-center justify-center gap-2"><AlertCircle size={14}/>{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-3">
                    {isRegister && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Họ tên</label>
                            <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                                placeholder="Nguyễn Văn A" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required/>
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Số điện thoại</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                            placeholder="0912..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required/>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Mật khẩu</label>
                        <input type="password" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                            placeholder="••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required/>
                    </div>
                    
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 text-sm transition-all active:scale-95 mt-2">
                        {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="mt-5 flex flex-col gap-3 text-center">
                    <button onClick={() => {setIsRegister(!isRegister); setError('');}} className="text-blue-600 text-xs font-bold hover:underline">
                        {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
                    </button>
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
                        <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-3 text-slate-400 font-bold">Hoặc</span></div>
                    </div>
                    <button onClick={onGuest} className="text-slate-500 hover:text-slate-800 text-xs font-bold py-2 hover:bg-slate-50 rounded-lg transition-colors">
                        Tiếp tục với vai trò Khách thăm
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- ENHANCED RICH CONTENT RENDERER ---
const RichContent = ({ content }: { content: string }) => {
    const process = (text: string) => {
        let html = text || "";
        
        // Escape HTML to prevent XSS (basic)
        html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // 1. Tables (Improved Regex for Robustness)
        // Matches | header | header | \n | --- | --- | \n | row | row |
        const tableRegex = /\|(.+)\|\n\|[-:| ]+\|\n((?:\|.*\|\n?)+)/g;
        html = html.replace(tableRegex, (match, header, body) => {
            const headers = header.split('|').filter((s:string) => s.trim()).map((s:string) => 
                `<th class="px-4 py-3 text-left bg-blue-50 border-b border-blue-100 font-bold text-blue-900 text-xs whitespace-nowrap first:rounded-tl-lg last:rounded-tr-lg">${s.trim()}</th>`
            ).join('');
            
            const rows = body.trim().split('\n').map((row:string) => {
                const cells = row.split('|').filter((s:string) => s.trim()).map((s:string) => 
                    `<td class="px-4 py-3 text-slate-700 text-xs leading-relaxed border-r border-slate-100 last:border-0">${s.trim()}</td>`
                ).join('');
                return `<tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">${cells}</tr>`;
            }).join('');
            
            return `<div class="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100"><div class="overflow-x-auto custom-scrollbar"><table class="w-full border-collapse min-w-[320px]"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
        });

        // 2. Headings
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-blue-700 mt-4 mb-2 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-base font-black text-slate-800 mt-5 mb-3 pb-1 border-b border-slate-100">$1</h2>');

        // 3. Bold (**text**)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 bg-slate-100/50 px-0.5 rounded">$1</strong>');

        // 4. Italic (*text*)
        html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-600 font-serif">$1</em>');

        // 5. Lists (Unordered)
        html = html.replace(/^\s*-\s+(.*)$/gm, '<li class="flex items-start gap-2.5 mb-1.5 ml-1"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span><span class="text-slate-700 leading-relaxed">$1</span></li>');
        html = html.replace(/(<li.*<\/li>)/s, '<ul class="my-3 pl-1">$1</ul>');
        
        // 6. Links
        const urlRegex = /(https?:\/\/[^\s<]+)/g;
        html = html.replace(urlRegex, `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline decoration-blue-300 hover:decoration-blue-600 underline-offset-2 transition-all font-bold break-all">$1</a>`);

        // 7. Info Blocks (:::info ... ::: or Note:)
        html = html.replace(/(?:Lưu ý|Note):(.*?)(\n|$)/gim, `<div class="mt-3 mb-3 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-900 flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5 text-amber-600"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span><strong class="font-bold text-amber-700">Lưu ý:</strong> $1</span></div>`);

        // New lines to BR (except inside tags)
        html = html.replace(/\n/g, '<br/>');
        html = html.replace(/(<br\/>)+/g, '<br/>'); // Deduplicate breaks

        return html;
    };
    return <div className="text-[13.5px] leading-7 break-words rich-text font-sans tracking-normal" dangerouslySetInnerHTML={{ __html: process(content) }} />;
};

// --- UPDATED THINKING BUBBLE ---
const ThinkingBubble = () => (
    <div className="flex items-center gap-3">
        <div className="flex gap-1.5 p-3.5 bg-white border border-slate-100 rounded-2xl rounded-tl-none w-fit items-center h-10 shadow-sm animate-in fade-in zoom-in-95 duration-300">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
        <span className="text-xs font-bold text-slate-400 animate-pulse">AI đang suy nghĩ...</span>
    </div>
);

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isFullScreen, isWidget, initialMessage, pageContext }) => {
    // --- STATE ---
    const [user, setUser] = useState<UserType | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [showAuth, setShowAuth] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [streamedText, setStreamedText] = useState('');
    
    // --- REFS & SCROLLING ---
    const endRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const recognitionRef = useRef<any>(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    // --- INIT ---
    useEffect(() => {
        const currentUser = db.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            loadConversations(currentUser.id);
            setShowAuth(false);
        } else if (initialMessage && !showAuth) {
             handleGuest();
        }
        
        // Voice Setup
        if ('webkitSpeechRecognition' in window) {
            const Speech = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new Speech();
            recognitionRef.current.lang = 'vi-VN';
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (e: any) => {
                const transcript = e.results[0][0].transcript;
                setInput(prev => prev + (prev ? ' ' : '') + transcript);
                setIsListening(false);
            };
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    useEffect(() => {
        if (user && initialMessage && !activeConvId && !isLoading) {
            handleNewChat(initialMessage);
        }
    }, [user, initialMessage]);

    // --- SMART SCROLL LOGIC ---
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 150; // Threshold
        setShouldAutoScroll(isNearBottom);
    };

    const scrollToBottom = (force = false) => {
        if (shouldAutoScroll || force) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages, streamedText, isLoading]);

    // --- LOGIC ---
    const loadConversations = (uid: string) => setConversations(db.getConversations(uid));

    const handleLoginSuccess = (u: UserType) => {
        setUser(u);
        loadConversations(u.id);
        setShowAuth(false);
    };

    const handleGuest = () => {
        const guest = db.getOrCreateGuest();
        setUser(guest);
        loadConversations(guest.id);
        setShowAuth(false);
    };

    const handleLogout = () => {
        if (window.confirm("Bạn muốn đăng xuất?")) {
            db.logout();
            setUser(null);
            setMessages([]);
            setConversations([]);
            setShowAuth(true);
            setIsSidebarOpen(false);
        }
    };

    const handleNewChat = (firstMsg?: string) => {
        setActiveConvId(null);
        setMessages([]);
        if (firstMsg) handleSend(firstMsg);
        setIsSidebarOpen(false);
    };

    const loadChat = (convId: string) => {
        setActiveConvId(convId);
        setMessages(db.getMessages(convId));
        setIsSidebarOpen(false);
        setTimeout(() => scrollToBottom(true), 100);
    };

    const handleClearMessages = () => {
        if (!activeConvId) return;
        if (window.confirm("Bạn có chắc muốn xóa nội dung cuộc trò chuyện này? Hành động này không thể hoàn tác.")) {
            db.clearMessages(activeConvId);
            setMessages([]);
        }
    };

    const handleDeleteChat = (convId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Xóa toàn bộ cuộc trò chuyện này?")) {
            db.deleteConversation(convId);
            if (activeConvId === convId) {
                setActiveConvId(null);
                setMessages([]);
            }
            if (user) loadConversations(user.id);
        }
    };

    const handleSend = async (text: string = input) => {
        if (!text.trim() || !user || isLoading) return;

        let convId = activeConvId;
        if (!convId) {
            const newConv = db.createConversation(user.id, text);
            setConversations(prev => [newConv, ...prev]);
            convId = newConv.id;
            setActiveConvId(convId);
        }

        const userMsg: Message = { id: crypto.randomUUID(), conversationId: convId, role: 'user', text, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        db.addMessage(userMsg);
        setInput('');
        if (inputRef.current) inputRef.current.style.height = 'auto'; // Reset height
        setIsLoading(true);
        setShouldAutoScroll(true); // Force scroll on new message

        try {
            const stream = sendMessageStream(text, convId, pageContext);
            let fullResponse = "";
            for await (const chunk of stream) {
                fullResponse += chunk;
                // Quick Replies parsing assumes they come at the end
                const parts = fullResponse.split('///QUICK_REPLIES///');
                setStreamedText(parts[0]);
            }

            let quickReplies: string[] = [];
            if (fullResponse.includes('///QUICK_REPLIES///')) {
                const parts = fullResponse.split('///QUICK_REPLIES///');
                fullResponse = parts[0].trim();
                quickReplies = parts[1].split('|').map(s => s.trim()).filter(Boolean);
            }

            const botMsg: Message = { 
                id: crypto.randomUUID(), 
                conversationId: convId, 
                role: 'model', 
                text: fullResponse, 
                timestamp: Date.now(),
                quickReplies 
            };
            
            setMessages(prev => [...prev, botMsg]);
            db.addMessage(botMsg);
            if (user) loadConversations(user.id); 
            
        } catch (e) {
            console.error(e);
            // Add error message
            const errorMsg: Message = {
                id: crypto.randomUUID(),
                conversationId: convId,
                role: 'model',
                text: "⚠️ Đã xảy ra lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
            setStreamedText('');
        }
    };

    const isGuest = user?.id.startsWith('guest_');

    // --- SIDEBAR ---
    const Sidebar = () => (
        <div className="absolute inset-0 z-50 bg-slate-900/30 backdrop-blur-sm transition-opacity">
            <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                {/* Sidebar Header */}
                <div className="p-5 bg-slate-900 text-white flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border border-white/20">
                                <UserIcon size={18}/>
                            </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-bold text-sm leading-none truncate max-w-[140px]">{user?.name}</span>
                            <span className="text-[10px] text-slate-400 mt-1">{isGuest ? 'Khách thăm' : 'Thành viên'}</span>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white">
                        <X size={20}/>
                    </button>
                </div>

                {/* New Chat Button */}
                <div className="p-4 border-b border-slate-100 flex gap-2 shrink-0">
                    <button onClick={() => { handleNewChat(); setIsSidebarOpen(false); }} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                        <Plus size={16}/> Cuộc trò chuyện mới
                    </button>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase px-3 mb-2 mt-2 tracking-widest">Lịch sử tư vấn</div>
                    {conversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3 opacity-60">
                            <History size={32} strokeWidth={1.5}/>
                            <span className="text-xs font-medium">Chưa có lịch sử</span>
                        </div>
                    ) : (
                        conversations.map(c => (
                            <div key={c.id} 
                                onClick={() => loadChat(c.id)}
                                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${activeConvId === c.id ? 'bg-blue-50 border-blue-200 shadow-sm' : 'hover:bg-slate-50 border-transparent hover:border-slate-100'}`}
                            >
                                <div className="min-w-0 flex-1 pr-3">
                                    <p className={`text-xs truncate font-bold mb-0.5 ${activeConvId === c.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                        {c.title || 'Đoạn chat mới'}
                                    </p>
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                        <Clock size={10}/> {new Date(c.updatedAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <button 
                                    onClick={(e) => handleDeleteChat(c.id, e)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 size={14}/>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
                    {isGuest ? (
                        <button onClick={() => setShowAuth(true)} className="w-full py-3 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                           <LogIn size={14}/> Đăng nhập để lưu
                        </button>
                    ) : (
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 bg-white text-slate-600 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors shadow-sm">
                            <LogOut size={14}/> Đăng xuất
                        </button>
                    )}
                </div>
            </div>
            
            {/* Backdrop click to close */}
            <div className="absolute inset-0 z-[-1]" onClick={() => setIsSidebarOpen(false)}></div>
        </div>
    );

    return (
        <div className={`flex flex-col h-full bg-slate-50 relative overflow-hidden font-sans text-slate-900 ${isFullScreen ? '' : 'rounded-2xl'}`}>
            {showAuth && <AuthScreen onLoginSuccess={handleLoginSuccess} onGuest={handleGuest} />}
            {isSidebarOpen && <Sidebar />}

            {/* HEADER */}
            <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-20 shadow-sm relative">
                <div className="flex items-center gap-3 md:gap-4">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-xl transition-colors active:bg-slate-200"
                    >
                        <Menu size={22}/>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                                <Bot size={20}/>
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-white rounded-full"></span>
                        </div>
                        <div>
                            <div className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                                TDU Assistant <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[9px] rounded font-bold uppercase tracking-wider border border-blue-100">AI</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                                Luôn sẵn sàng 24/7
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Header Actions */}
                <div className="flex items-center gap-1">
                    {messages.length > 0 && (
                        <button onClick={handleClearMessages} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Xóa nội dung chat">
                            <Trash2 size={18}/>
                        </button>
                    )}
                    <button onClick={() => handleNewChat()} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Chat mới">
                        <Eraser size={20}/>
                    </button>
                </div>
            </div>

            {/* MESSAGES AREA */}
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar bg-slate-50/50 relative scroll-smooth"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-in fade-in zoom-in-95 duration-500 pb-10">
                        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-blue-100 border border-white flex items-center justify-center mb-6 relative">
                             <div className="absolute inset-0 bg-blue-600 rounded-[2rem] opacity-5 blur-xl"></div>
                            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white relative z-10">
                                <Bot size={32}/>
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Xin chào {user?.name}! 👋</h3>
                        <p className="text-sm text-slate-500 mb-8 max-w-[260px] leading-relaxed">
                            Mình là trợ lý ảo AI. Mình có thể giúp bạn tra cứu điểm chuẩn, học phí và tư vấn chọn ngành 2025.
                        </p>
                        <div className="grid grid-cols-2 gap-3 w-full max-w-[340px]">
                            {[
                                {label: "Điểm chuẩn 2025", icon: "📊"}, 
                                {label: "Học phí HK1", icon: "💰"}, 
                                {label: "Học bổng 100%", icon: "🎁"}, 
                                {label: "Xét học bạ", icon: "📝"}
                            ].map((q) => (
                                <button key={q.label} onClick={() => handleSend(q.label)} className="text-xs py-3.5 px-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all font-bold text-slate-600 flex items-center justify-start gap-3 group text-left">
                                    <span className="text-lg group-hover:scale-110 transition-transform">{q.icon}</span> {q.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-300`}>
                                {msg.role === 'model' && (
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md border border-white">
                                        <Bot size={16}/>
                                    </div>
                                )}
                                <div className={`max-w-[85%] sm:max-w-[80%] min-w-0 ${
                                    msg.role === 'user' ? 'order-1' : 'order-2'
                                }`}>
                                     <div className={`px-5 py-3.5 shadow-sm text-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                                        : 'bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm'
                                    }`}>
                                        {msg.role === 'user' ? (
                                            <p className="leading-7 whitespace-pre-wrap font-medium">{msg.text}</p>
                                        ) : (
                                            <RichContent content={msg.text}/>
                                        )}
                                     </div>
                                     
                                     {/* Timestamp */}
                                     <div className={`text-[10px] text-slate-400 mt-1.5 font-medium ${msg.role === 'user' ? 'text-right' : 'text-left ml-1'}`}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                     </div>

                                     {/* Quick Replies for Bot - NEW TAG STYLE */}
                                     {msg.role === 'model' && msg.quickReplies && msg.quickReplies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-500 delay-100 max-w-full overflow-x-auto no-scrollbar pb-1">
                                            {msg.quickReplies.map((r, i) => (
                                                <button key={i} onClick={() => handleSend(r)} className="shrink-0 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-[11px] font-bold rounded-full hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95 flex items-center gap-1.5 group whitespace-nowrap">
                                                    <Sparkles size={12} className="opacity-70 group-hover:text-amber-300"/> {r}
                                                </button>
                                            ))}
                                        </div>
                                     )}
                                </div>
                            </div>
                        ))}
                        
                        {/* Loading State & Streaming */}
                        {isLoading && (
                            <div className="flex gap-4 animate-in fade-in duration-300">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md border border-white">
                                    <Bot size={16}/>
                                </div>
                                <div className="max-w-[85%]">
                                    {streamedText ? (
                                        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-3.5 shadow-sm text-sm">
                                            <RichContent content={streamedText}/>
                                        </div>
                                    ) : (
                                        <ThinkingBubble />
                                    )}
                                </div>
                            </div>
                        )}
                        <div ref={endRef} className="h-4"/>
                    </>
                )}
            </div>

            {/* INPUT AREA */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0 relative z-30">
                <div className="flex items-end gap-3 bg-slate-50 p-2 rounded-[24px] border border-slate-200 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400 transition-all shadow-inner">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Nhập câu hỏi của bạn..."
                        className="flex-1 max-h-[120px] min-h-[44px] bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-base md:text-sm text-slate-700 placeholder:text-slate-400 custom-scrollbar leading-relaxed font-medium"
                        rows={1}
                    />
                    <div className="flex items-center gap-1.5 pr-1 pb-1">
                        <button 
                            onClick={() => {
                                if(isListening) recognitionRef.current?.stop();
                                else recognitionRef.current?.start();
                                setIsListening(!isListening);
                            }}
                            className={`p-2.5 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse ring-2 ring-red-200' : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'}`}
                            title="Nhập bằng giọng nói"
                        >
                            {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
                        </button>
                        <button 
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            className={`p-2.5 rounded-full transition-all transform duration-200 ${
                                input.trim() 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-95' 
                                : 'bg-slate-200 text-slate-400'
                            }`}
                        >
                            <Send size={20} className={input.trim() ? "ml-0.5" : ""}/>
                        </button>
                    </div>
                </div>
                <div className="text-[10px] text-center text-slate-400 mt-2.5 font-bold flex items-center justify-center gap-1.5 opacity-60">
                    <Info size={12}/> AI có thể mắc sai sót. Vui lòng kiểm tra lại thông tin.
                </div>
            </div>
        </div>
    );
};
