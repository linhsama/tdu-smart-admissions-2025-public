


import React from 'react';
import { UNIVERSITY_DATA } from '../data/universityData';
import { Lightbulb, Compass, Quote } from 'lucide-react';
import { Footer } from '../components/Footer';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-20 animate-in fade-in duration-500 font-sans">
      
      {/* Header - Dark Theme */}
      <div className="bg-slate-950 py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/30 to-transparent blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-200 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md">
              Giới thiệu chung
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Đại Học Tây Đô</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
             19 năm hình thành và phát triển - Khẳng định vị thế trường đại học tư thục hàng đầu khu vực Đồng bằng sông Cửu Long.
          </p>
        </div>
      </div>

      {/* COMPACT STATS BAR */}
      <div className="bg-blue-900 border-b border-blue-800 text-white py-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-blue-800/50 text-center">
                  {UNIVERSITY_DATA.highlights.map((hl, i) => (
                      <div key={i} className="pt-4 md:pt-0 first:pt-0">
                          <div className="text-3xl lg:text-4xl font-black text-amber-400 mb-1">{hl.stat}</div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-blue-200">{hl.title}</div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        
        {/* Intro & Philosophy */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
             <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight flex items-center gap-3">
                 <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                 Triết Lý Giáo Dục
             </h2>
             <blockquote className="text-2xl font-serif italic text-blue-800 mb-8 pl-4 border-l-4 border-blue-200">
                 "Trí tuệ - Năng động - Hội nhập - Phát triển"
             </blockquote>
             <p className="text-slate-600 text-lg mb-8 leading-relaxed">
               Đại học Tây Đô không chỉ trang bị kiến thức chuyên môn mà còn chú trọng rèn luyện kỹ năng mềm, thái độ làm việc chuyên nghiệp, giúp sinh viên tự tin hội nhập quốc tế.
             </p>
             <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm"><Lightbulb size={24}/></div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg">Đổi mới sáng tạo</h4>
                        <p className="text-slate-500 text-sm mt-1">Phương pháp giảng dạy lấy người học làm trung tâm, khuyến khích tư duy phản biện.</p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm"><Compass size={24}/></div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg">Định hướng ứng dụng</h4>
                        <p className="text-slate-500 text-sm mt-1">Hơn 30% thời lượng là thực hành, thực tập trực tiếp tại doanh nghiệp đối tác.</p>
                    </div>
                </div>
             </div>
          </div>
          
          <div className="relative group">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
             <img 
                src="https://placehold.co/600x800/f8fafc/cbd5e1?text=TDU+Campus+Life" 
                alt="Sinh viên Tây Đô" 
                className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[3/4] border-8 border-white"
             />
          </div>
        </div>

        {/* Campus Gallery */}
        <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Khuôn Viên Đại Học Số</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl h-full">
                    <img src="https://placehold.co/800x600/e2e8f0/94a3b8?text=Modern+Library" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-white font-bold text-xl">Thư viện điện tử hiện đại</span>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl h-full">
                    <img src="https://placehold.co/400x300/e2e8f0/94a3b8?text=Lab+System" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-white font-bold">Hệ thống phòng Lab</span>
                    </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl h-full">
                    <img src="https://placehold.co/400x300/e2e8f0/94a3b8?text=Green+Campus" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-white font-bold">Khuôn viên xanh mát</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};
