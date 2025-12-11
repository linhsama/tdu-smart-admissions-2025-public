import React from 'react';
import { UNIVERSITY_DATA } from '../data/universityData';
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-900 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-950 font-black text-2xl border-4 border-blue-900 shadow-glow">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl leading-none tracking-tight">ĐẠI HỌC TÂY ĐÔ</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Tay Do University</span>
              </div>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-md text-sm">
              {UNIVERSITY_DATA.general.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-blue-600 transition-all text-blue-200 hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-red-600 transition-all text-blue-200 hover:text-white">
                <Youtube size={18} />
              </a>
              <a href={`mailto:${UNIVERSITY_DATA.general.email}`} className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-emerald-600 transition-all text-blue-200 hover:text-white">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs border-b border-blue-900 pb-2 inline-block">Liên hệ</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{UNIVERSITY_DATA.general.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 shrink-0" />
                <span className="font-mono text-lg text-white font-bold tracking-wide">{UNIVERSITY_DATA.general.hotline}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <span>{UNIVERSITY_DATA.general.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs border-b border-blue-900 pb-2 inline-block">Liên kết nhanh</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Cổng thông tin sinh viên</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Tra cứu văn bằng</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Thư viện số</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Đảm bảo chất lượng</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Tuyển dụng</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; 2025 Tay Do University. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};