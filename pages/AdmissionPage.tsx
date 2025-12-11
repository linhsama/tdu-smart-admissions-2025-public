

import React from 'react';
import { UNIVERSITY_DATA } from '../data/universityData';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import * as LucideIcons from 'lucide-react';
import { ViewState } from '../types';
import { Button } from '../components/ui/Button';
import { MessageCircle } from 'lucide-react';
import { ScoreCalculator } from '../components/ScoreCalculator';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

interface AdmissionPageProps {
    onOpenChat: (msg: string) => void;
}

export const AdmissionPage: React.FC<AdmissionPageProps> = ({ onOpenChat }) => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 animate-in fade-in duration-500 font-sans">
       
       <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-12 text-white">
           <div className="container mx-auto px-4 text-center">
               <h1 className="text-3xl md:text-5xl font-black mb-4">Thông Tin Tuyển Sinh 2025</h1>
               <p className="text-blue-200">Quy chế - Ngành học - Học phí & Học bổng chính thức</p>
           </div>
       </div>

       <div className="container mx-auto px-4 py-12">
           <div className="grid lg:grid-cols-12 gap-8">
               
               {/* Left Sidebar: Timeline & Methods */}
               <div className="lg:col-span-4 space-y-8">
                   {/* SCORE CALCULATOR WIDGET REPLACES OLD FORM */}
                   <ScoreCalculator onRequestConsult={onOpenChat} />

                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                       <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                           <div className="w-1.5 h-5 bg-amber-500 rounded-full"></div>
                           Phương Thức Xét Tuyển
                       </h3>
                       <div className="space-y-4">
                           {UNIVERSITY_DATA.admissionMethods.map((m, i) => (
                               <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100">
                                   <div className="mt-1 text-blue-600">
                                       <DynamicIcon name={m.icon} className="w-5 h-5"/>
                                   </div>
                                   <div>
                                       <h4 className="font-bold text-slate-800 text-sm">{m.name}</h4>
                                       <p className="text-xs text-slate-500 leading-relaxed mt-1">{m.desc}</p>
                                   </div>
                               </div>
                           ))}
                       </div>

                       <div className="mt-8 pt-6 border-t border-slate-100">
                           <h3 className="text-lg font-bold text-slate-900 mb-4">Mốc Thời Gian</h3>
                           <div className="space-y-5 relative pl-2">
                               <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                               {UNIVERSITY_DATA.timeline.map((t, i) => (
                                   <div key={i} className="flex gap-3 relative z-10">
                                       <div className="w-3 h-3 rounded-full bg-white border-2 border-blue-600 shrink-0 mt-1"></div>
                                       <div>
                                           <div className="text-xs font-bold text-blue-600 uppercase mb-0.5">{t.date}</div>
                                           <div className="font-bold text-slate-800 text-sm">{t.event}</div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </div>
               </div>

               {/* Main Content: Tables */}
               <div className="lg:col-span-8 space-y-8">
                   
                   {/* Majors & Tuition Table */}
                   <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                       <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center flex-wrap gap-4">
                           <div>
                               <h2 className="text-xl font-black text-slate-900">Danh Mục 25 Ngành & Học Phí HK1</h2>
                               <p className="text-sm text-slate-500">Áp dụng cho năm học 2025-2026</p>
                           </div>
                           <Button onClick={() => onOpenChat("Tôi muốn hỏi chi tiết về học phí các ngành")} size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                               <MessageCircle size={16} className="mr-2"/> Hỏi chi tiết
                           </Button>
                       </div>
                       <div className="overflow-x-auto">
                           <table className="w-full text-sm text-left">
                               <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                   <tr>
                                       <th className="px-6 py-4">STT</th>
                                       <th className="px-6 py-4">Tên ngành</th>
                                       <th className="px-6 py-4">Mã ngành</th>
                                       <th className="px-6 py-4 text-right">Học phí HK1 (VNĐ)</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100">
                                   {UNIVERSITY_DATA.majors.map((m) => (
                                       <tr key={m.code} className="hover:bg-slate-50 transition-colors">
                                           <td className="px-6 py-4 font-mono text-slate-400">{m.stt}</td>
                                           <td className="px-6 py-4 font-bold text-slate-800">{m.name}</td>
                                           <td className="px-6 py-4 font-mono text-slate-600 bg-slate-50 w-fit rounded">{m.code}</td>
                                           <td className="px-6 py-4 text-right font-bold text-blue-700">
                                               {new Intl.NumberFormat('vi-VN').format(m.tuitionHK1)}
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                   </div>

                   {/* Scholarship Table */}
                   <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                       <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                           <h2 className="text-xl font-black text-slate-900">Chính Sách Học Bổng 2025</h2>
                           <p className="text-sm text-slate-500">Dành cho tân sinh viên trúng tuyển và nhập học sớm</p>
                       </div>
                       <div className="p-6 grid gap-4">
                           {UNIVERSITY_DATA.scholarships.map((s, i) => (
                               <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all">
                                   <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl shrink-0">
                                       {s.value.includes('Triệu') ? s.value.split(' ')[0] : s.value.replace(/\./g, '').substring(0, 2)}
                                       <span className="text-[10px] font-normal ml-0.5">Tr</span>
                                   </div>
                                   <div className="flex-1">
                                       <h4 className="font-bold text-slate-900 text-lg">{s.name}</h4>
                                       <p className="text-slate-600 text-sm mt-1 font-medium">{s.condition}</p>
                                   </div>
                                   <div className="text-right">
                                       <span className="block text-2xl font-black text-amber-600">{s.value}</span>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>

                   <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                       <h3 className="font-bold text-blue-900 mb-2">Bạn cần tư vấn thêm?</h3>
                       <p className="text-blue-700 text-sm mb-4">Chat ngay với AI để được giải đáp thắc mắc về hồ sơ và thủ tục nhập học.</p>
                       <Button onClick={() => onOpenChat("Hướng dẫn nộp hồ sơ xét tuyển")} className="bg-blue-600 hover:bg-blue-700">
                           <MessageCircle size={18} className="mr-2"/> Chat với Tư vấn viên AI
                       </Button>
                   </div>

               </div>
           </div>
       </div>
       <Footer />
    </div>
  );
};
