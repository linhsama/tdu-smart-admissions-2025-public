
import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { MajorsPage } from './pages/MajorsPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { Admin } from './pages/Admin';
import { ChatInterface } from './components/ChatInterface';
import { Navbar } from './components/Navbar';
import { MessageCircle, X } from 'lucide-react';
import { ViewState, NewsItem } from './types';

function App() {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string>('');
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState]);

  const handleOpenChat = (message: string = '') => {
      setChatInitialMessage(message);
      setIsChatOpen(true);
      // Optional: if on mobile, go to full screen chat page
      if (window.innerWidth < 768) {
          setViewState(ViewState.CHAT_FULL);
      }
  };

  const handleNavigate = (page: ViewState, data?: any) => {
      if (page === ViewState.NEWS_DETAIL && data) {
          setSelectedNewsItem(data);
      }
      setViewState(page);
  };

  const renderPage = () => {
    switch (viewState) {
      case ViewState.ADMIN:
        return <Admin />;
      case ViewState.CHAT_FULL:
        return (
          <div className="h-[100dvh] bg-slate-50 flex flex-col">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:p-6 p-0">
               <div className="hidden md:flex mb-4 items-center justify-between px-2">
                 <button onClick={() => setViewState(ViewState.HOME)} className="text-slate-500 hover:text-indigo-700 flex items-center gap-2 text-sm font-bold transition-colors">
                   ← Quay lại Trang chủ
                 </button>
               </div>
               <div className="flex-1 min-h-0 bg-white md:rounded-2xl md:shadow-2xl md:border border-slate-200 overflow-hidden relative">
                 <ChatInterface isFullScreen={true} initialMessage={chatInitialMessage} pageContext="Chat Fullscreen" />
                 <button 
                    onClick={() => setViewState(ViewState.HOME)}
                    className="md:hidden absolute top-3 right-3 z-[60] p-1.5 bg-white/20 backdrop-blur-md rounded-full text-slate-800 shadow-sm hover:bg-white/40"
                 >
                    <X size={18} />
                 </button>
               </div>
            </div>
          </div>
        );
      case ViewState.CHATBOT:
        return (
            <div className="h-[100dvh] flex flex-col bg-slate-50">
                <Navbar onOpenChat={() => {}} onNavigate={handleNavigate} activePage={ViewState.CHATBOT} />
                <div className="flex-1 pt-20 pb-6 px-4 md:px-6">
                    <div className="max-w-6xl mx-auto h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative">
                        <ChatInterface isFullScreen={true} initialMessage="" pageContext="Trợ lý AI chuyên sâu" />
                    </div>
                </div>
            </div>
        );
      case ViewState.ABOUT:
        return (
            <>
                <Navbar onOpenChat={() => handleOpenChat()} onNavigate={handleNavigate} activePage={ViewState.ABOUT} />
                <AboutPage />
            </>
        );
      case ViewState.MAJORS:
        return (
            <>
                <Navbar onOpenChat={() => handleOpenChat()} onNavigate={handleNavigate} activePage={ViewState.MAJORS} />
                <MajorsPage onOpenChat={handleOpenChat} />
            </>
        );
      case ViewState.ADMISSIONS:
        return (
            <>
                <Navbar onOpenChat={() => handleOpenChat()} onNavigate={handleNavigate} activePage={ViewState.ADMISSIONS} />
                <AdmissionPage onOpenChat={handleOpenChat} />
            </>
        );
      case ViewState.NEWS:
        return (
            <>
                <Navbar onOpenChat={() => handleOpenChat()} onNavigate={handleNavigate} activePage={ViewState.NEWS} />
                <NewsPage onNavigate={handleNavigate} />
            </>
        );
      case ViewState.NEWS_DETAIL:
        return (
            <NewsDetailPage 
                newsItem={selectedNewsItem} 
                onBack={() => setViewState(ViewState.NEWS)}
                onNavigate={handleNavigate}
                onOpenChat={() => handleOpenChat(`Tôi muốn hỏi về bài viết: ${selectedNewsItem?.title}`)}
            />
        );
      case ViewState.HOME:
      default:
        return <Home onNavigate={handleNavigate} onOpenChat={handleOpenChat} />;
    }
  };

  return (
    <div className="antialiased text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {renderPage()}

      {/* Persistent Floating Chat Button (Except in Full Chat, Admin, or dedicated Chatbot Page) */}
      {viewState !== ViewState.CHAT_FULL && viewState !== ViewState.ADMIN && viewState !== ViewState.CHATBOT && (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end pointer-events-none">
          {isChatOpen && (
            // Added fixed height here: h-[600px] to allow internal scrolling in flex-col layout
            <div className="pointer-events-auto mb-4 w-[90vw] sm:w-[350px] h-[550px] max-h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right flex flex-col relative z-[70] border border-slate-200/60">
                <div className="flex-1 min-h-0 relative bg-white flex flex-col h-full">
                    <ChatInterface 
                        isFullScreen={true} 
                        isWidget={true}
                        initialMessage={chatInitialMessage} 
                        pageContext={viewState === ViewState.HOME ? 'Trang chủ' : viewState === ViewState.MAJORS ? 'Ngành đào tạo' : 'Tư vấn'}
                    />
                </div>
            </div>
          )}
          
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`pointer-events-auto h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 border-[3px] border-white z-[60] group ${
              isChatOpen 
              ? 'bg-slate-800 text-white rotate-90 shadow-slate-900/20' 
              : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-600/40'
            }`}
          >
             {/* Glow Effect */}
             {!isChatOpen && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-30 animate-ping duration-1000"></span>
             )}
            {isChatOpen ? <X size={24} /> : <MessageCircle size={26} className="ml-0.5 mt-0.5" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
