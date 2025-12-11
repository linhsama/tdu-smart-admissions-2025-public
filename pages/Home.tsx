
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Calendar, Check, Gift, Quote, Filter, Star, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { UNIVERSITY_DATA, QUOTES } from '../data/universityData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ViewState, NewsItem, Major } from '../types';
import { db } from '../services/db';
import { NewsCard } from '../components/NewsCard';
import { MajorDetailModal } from '../components/MajorDetailModal';
import * as LucideIcons from 'lucide-react';

// Dynamic Icon Helper
const DynamicIcon = ({ name, className, size }: { name: string, className?: string, size?: number | string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} size={size} />;
};

interface HomeProps {
  onNavigate: (page: ViewState, data?: any) => void;
  onOpenChat: (msg: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenChat }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  useEffect(() => {
      setNews(db.getNews().slice(0, 3)); 
  }, []);

  // Split majors into two arrays for double marquee rows
  const midPoint = Math.ceil(UNIVERSITY_DATA.majors.length / 2);
  const majorsRow1 = UNIVERSITY_DATA.majors.slice(0, midPoint);
  const majorsRow2 = UNIVERSITY_DATA.majors.slice(midPoint);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      <Navbar onOpenChat={() => onOpenChat("Tư vấn tuyển sinh")} onNavigate={onNavigate} activePage={ViewState.HOME} />

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
         {/* Background Patterns */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/30 to-transparent -z-10 blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-900/30 to-transparent -z-10 blur-3xl"></div>
         
         <div className="container mx-auto px-4 relative z-10">
             <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 
                 {/* Badge */}
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 shadow-sm backdrop-blur-md hover:bg-white/20 transition-all cursor-default">
                     <span className="relative flex h-2.5 w-2.5">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                     </span>
                     <span className="text-blue-100 text-xs font-bold uppercase tracking-wider">Tuyển sinh Đại học 2025</span>
                 </div>
                 
                 {/* Headline */}
                 <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.2] tracking-tight text-shadow-sm uppercase">
                     Học Tập - <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Trải Nghiệm</span><br/>
                     Khởi Nghiệp - Thành Công
                 </h1>
                 
                 <p className="text-lg md:text-xl font-bold text-slate-400 mt-4 uppercase tracking-widest leading-relaxed">
                    "Đoàn kết - Hợp tác - Đổi mới - Trí tuệ - Sáng tạo"
                 </p>
                 
                 {/* CTAs */}
                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <Button onClick={() => onOpenChat("Tôi muốn được tư vấn chọn ngành")} className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-50 text-white font-bold text-lg shadow-xl shadow-blue-900/50 transition-all hover:-translate-y-1 border border-blue-500">
                         <Sparkles className="mr-2 w-5 h-5"/> Chat AI Tư Vấn
                     </Button>
                     <Button onClick={() => {
                         document.getElementById('admission-info')?.scrollIntoView({ behavior: 'smooth' });
                     }} className="h-14 px-8 rounded-full bg-transparent border border-slate-700 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/30 font-bold text-lg shadow-sm transition-all">
                         Xem Đề Án 2025
                     </Button>
                 </div>

                 {/* Highlights Cards (Floating) */}
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-12">
                     {UNIVERSITY_DATA.highlights.map((hl, i) => (
                         <div key={i} className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-800 shadow-lg hover:shadow-xl hover:border-slate-700 hover:bg-slate-800 transition-all group">
                             <div className={`w-10 h-10 mx-auto rounded-full bg-slate-800 text-${hl.color}-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                 <DynamicIcon name={hl.icon} size={20}/>
                             </div>
                             <div className="text-xl md:text-2xl font-black text-white">{hl.stat}</div>
                             <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wide group-hover:text-slate-400">{hl.title}</div>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
      </section>

      {/* --- 2. TIN TỨC MỚI NHẤT (MOVED UP) --- */}
      <section className="py-24 bg-white relative z-20">
          <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-10">
                  <div>
                      <h2 className="text-3xl font-black text-slate-900 mb-2">Tin Tức & Sự Kiện</h2>
                      <p className="text-slate-500 text-sm">Cập nhật những hoạt động nổi bật nhất từ TDU</p>
                  </div>
                  <Button onClick={() => onNavigate(ViewState.NEWS)} variant="ghost" className="text-sm text-blue-600 font-bold hover:bg-blue-50">
                      Xem tất cả <ArrowRight size={14} className="ml-1"/>
                  </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                  {news.map(item => (
                      <div key={item.id} onClick={() => onNavigate(ViewState.NEWS_DETAIL, item)} className="cursor-pointer h-full">
                          <NewsCard item={item} />
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- 3. THÔNG TIN TUYỂN SINH 2025 --- */}
      <section id="admission-info" className="py-24 bg-slate-50 relative border-t border-slate-200">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Thông Tin Tuyển Sinh 2025</h2>
                  <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-4"></div>
                  <p className="text-slate-600 text-lg">Cập nhật phương thức xét tuyển, lộ trình và chính sách học bổng mới nhất.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                  
                  {/* Cột 1: Phương Thức Xét Tuyển */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Check size={20}/></div>
                          4 Phương Thức Xét Tuyển
                      </h3>
                      <div className="space-y-4">
                          {UNIVERSITY_DATA.admissionMethods.map((m, idx) => (
                              <div key={idx} className="flex gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 items-start">
                                  <div className="mt-1 text-blue-600 shrink-0">
                                      <DynamicIcon name={m.icon} className="w-5 h-5"/>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{m.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Cột 2: Lộ Trình Tuyển Sinh */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                      <h3 className="text-xl font-bold text-slate-900 mb-6 px-2 flex items-center gap-3">
                          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg"><Calendar size={20}/></div>
                          Lộ Trình Tuyển Sinh
                      </h3>
                      <div className="space-y-0 relative pl-4 border-l-2 border-slate-200 ml-4">
                          {UNIVERSITY_DATA.timeline.map((item, i) => (
                              <div key={i} className="relative pl-8 pb-8 last:pb-0 group">
                                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-slate-300 rounded-full group-hover:border-blue-600 group-hover:scale-125 transition-all"></div>
                                  <div className="flex flex-col gap-1 mb-1">
                                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200 w-fit">{item.date}</span>
                                      <h4 className="font-bold text-slate-900 text-sm">{item.event}</h4>
                                  </div>
                                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Cột 3: Học Bổng 2026 */}
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg"><Gift size={20}/></div>
                          Học Bổng 2026
                      </h3>
                      
                      <div className="space-y-4 relative z-10">
                          {UNIVERSITY_DATA.scholarships.slice(0, 3).map((s, i) => (
                              <div key={i} className="flex gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 items-center group hover:bg-white hover:shadow-md transition-all">
                                  <div className={`w-10 h-10 rounded-lg bg-${s.color}-50 flex items-center justify-center shrink-0 border border-${s.color}-100 group-hover:scale-110 transition-transform`}>
                                      <DynamicIcon name={s.icon} className={`w-5 h-5 text-${s.color}-600`}/>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <div className={`text-sm font-black text-${s.color}-600`}>{s.value}</div>
                                      <div className="text-[10px] font-medium text-slate-500 truncate" title={s.condition}>{s.condition}</div>
                                  </div>
                              </div>
                          ))}
                          
                          <div className="mt-4 pt-4 border-t border-slate-100">
                              <p className="text-xs text-slate-500 mb-3 text-center">Và nhiều chính sách hỗ trợ khác...</p>
                              <Button onClick={() => onOpenChat("Tư vấn chi tiết điều kiện nhận học bổng 2026")} size="sm" className="w-full bg-slate-900 text-white hover:bg-blue-700 border-0 shadow-sm text-xs py-2 h-9">
                                  Check điều kiện ngay
                              </Button>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- 4. NGÀNH ĐÀO TẠO (HORIZONTAL SCROLLING MARQUEE) --- */}
      <section className="py-24 bg-white overflow-hidden relative">
          <div className="container mx-auto px-4 mb-10">
              <div className="text-center">
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Đa Dạng Ngành Đào Tạo</h2>
                  <p className="text-slate-500 text-sm">25 ngành học thực tiễn - Đào tạo nhân lực chất lượng cao</p>
              </div>
          </div>

          <div className="space-y-8 mask-gradient-x relative">
              {/* Row 1: Scrolling Left */}
              <div className="flex w-full overflow-hidden group">
                  <div className="flex gap-6 animate-scroll group-hover:[animation-play-state:paused] w-max px-3">
                      {[...majorsRow1, ...majorsRow1].map((major, i) => (
                          <div key={`${major.code}-${i}`} 
                               onClick={() => setSelectedMajor(major)}
                               className="w-72 bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 shrink-0 flex flex-col h-40 justify-between">
                               <div className="flex justify-between items-start">
                                   <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${major.color} flex items-center justify-center text-white shadow-sm`}>
                                       <DynamicIcon name={major.icon} size={20} />
                                   </div>
                                   <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">{major.code}</span>
                               </div>
                               <div>
                                   <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{major.name}</h3>
                                   <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{major.details.overview}</p>
                               </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Row 2: Scrolling Right (Reverse) */}
              <div className="flex w-full overflow-hidden group">
                  <div className="flex gap-6 animate-scroll-reverse group-hover:[animation-play-state:paused] w-max px-3">
                      {[...majorsRow2, ...majorsRow2].map((major, i) => (
                          <div key={`${major.code}-${i}`} 
                               onClick={() => setSelectedMajor(major)}
                               className="w-72 bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 shrink-0 flex flex-col h-40 justify-between">
                               <div className="flex justify-between items-start">
                                   <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${major.color} flex items-center justify-center text-white shadow-sm`}>
                                       <DynamicIcon name={major.icon} size={20} />
                                   </div>
                                   <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">{major.code}</span>
                               </div>
                               <div>
                                   <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{major.name}</h3>
                                   <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{major.details.overview}</p>
                               </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          
          <div className="text-center mt-10">
              <Button onClick={() => onNavigate(ViewState.MAJORS)} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 shadow-lg shadow-slate-300/50">
                  Xem tất cả 25 ngành <ArrowRight size={16} className="ml-2"/>
              </Button>
          </div>
      </section>

      {/* --- 5. GÓC NHÌN & CẢM NHẬN (MOVED DOWN) --- */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-black mb-2">Góc Nhìn & Cảm Nhận</h2>
                  <p className="text-blue-200">Lắng nghe chia sẻ từ sinh viên Đại học Tây Đô</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {UNIVERSITY_DATA.testimonials.map((t, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all">
                          <Quote className="text-amber-400 mb-4 opacity-50" size={24}/>
                          <p className="text-sm font-medium leading-relaxed mb-6 min-h-[60px] text-blue-50">"{t.quote}"</p>
                          <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center font-bold text-xs`}>
                                  {t.name.charAt(0)}
                              </div>
                              <div>
                                  <div className="font-bold text-sm">{t.name}</div>
                                  <div className="text-[10px] text-blue-300 uppercase tracking-wide">{t.role}</div>
                              </div>
                          </div>
                      </div>
                  ))}
                  {QUOTES.map((q, i) => (
                       <div key={`q-${i}`} className="bg-blue-800/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl flex flex-col justify-center text-center">
                           <p className="text-lg font-serif italic text-blue-200 mb-2">"{q.text}"</p>
                           <div className="text-xs font-bold text-white uppercase tracking-widest opacity-60">- {q.author} -</div>
                       </div>
                  ))}
              </div>
          </div>
      </section>

      {selectedMajor && (
          <MajorDetailModal 
              major={selectedMajor} 
              onClose={() => setSelectedMajor(null)}
              onChat={() => {
                  onOpenChat(`Tư vấn chi tiết ngành ${selectedMajor.name}`);
                  setSelectedMajor(null);
              }}
          />
      )}
      
      <Footer />
    </div>
  );
};
