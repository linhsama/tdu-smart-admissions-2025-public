import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, Shield, Bot } from 'lucide-react';
import { Button } from './ui/Button';
import { ViewState } from '../types';

interface NavbarProps {
  onOpenChat: () => void;
  onNavigate: (page: ViewState) => void;
  activePage: ViewState;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onNavigate, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', page: ViewState.HOME },
    { name: 'Giới thiệu', page: ViewState.ABOUT },
    { name: 'Ngành đào tạo', page: ViewState.MAJORS },
    { name: 'Tin tuyển sinh', page: ViewState.NEWS },
    { name: 'Trợ lý AI', page: ViewState.CHATBOT },
  ];

  // Determine navbar background: Transparent on Home (until scroll), Solid Dark Blue on others
  const isHome = activePage === ViewState.HOME;
  const navbarBgClass = isHome && !isScrolled 
    ? 'bg-transparent py-5' 
    : 'bg-blue-950/95 backdrop-blur-xl shadow-lg py-3 border-b border-white/5';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${navbarBgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate(ViewState.HOME)}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-950 font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
              T
            </div>
            <div className="flex flex-col text-white">
              <span className="font-black text-lg leading-none tracking-tight">ĐẠI HỌC TÂY ĐÔ</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 text-blue-200">Digital Campus</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1.5 border border-white/10 mr-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => onNavigate(link.page)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                      activePage === link.page 
                      ? 'bg-amber-500 text-blue-950 shadow-lg transform scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="h-8 w-px bg-white/10 mx-2"></div>

            <button 
              onClick={() => onNavigate(ViewState.ADMIN)}
              className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-1 ${
                activePage === ViewState.ADMIN
                ? 'bg-slate-700 text-white shadow-lg' 
                : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title="Admin Panel"
            >
              <Shield size={18} />
            </button>

            <a href="tel:0939028579" className="ml-2 flex items-center gap-2 font-bold text-white hover:text-amber-400 transition-colors bg-blue-900/50 px-4 py-2 rounded-full border border-blue-800/50 hover:border-amber-500/50">
                <Phone size={16} className="text-amber-400 animate-pulse"/>
                <span className="font-mono text-sm">0939 028 579</span>
            </a>
          </div>

          <button 
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-950 border-t border-white/10 shadow-2xl lg:hidden animate-in slide-in-from-top-5 h-screen">
          <div className="p-6 space-y-2">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => {
                  onNavigate(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left p-4 rounded-2xl font-bold text-lg transition-all ${
                  activePage === link.page
                  ? 'bg-amber-500 text-blue-950 shadow-lg'
                  : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="h-px bg-white/10 my-4"></div>
            <button 
                onClick={() => {
                  onNavigate(ViewState.ADMIN);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left p-4 rounded-2xl font-bold text-lg transition-all text-slate-400 hover:text-white hover:bg-white/10 flex items-center gap-3"
            >
                <Shield size={20} /> Quản trị hệ thống
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};