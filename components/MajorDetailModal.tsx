
import React, { useState } from 'react';
import { X, BookOpen, Briefcase, GraduationCap, DollarSign, CheckCircle2, MessageCircle } from 'lucide-react';
import { Major } from '../types';

interface MajorDetailModalProps {
  major: Major | null;
  onClose: () => void;
  onChat: () => void;
}

type Tab = 'overview' | 'career' | 'curriculum' | 'tuition';

export const MajorDetailModal: React.FC<MajorDetailModalProps> = ({ major, onClose, onChat }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!major) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
          
          <div className={`h-40 bg-gradient-to-r ${major.color} relative p-8 flex items-end shrink-0`}>
             <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors backdrop-blur-md">
                 <X size={20} />
             </button>
             <div className="text-white w-full">
                 <div className="flex items-center gap-3 text-white/90 text-sm font-bold mb-2 uppercase tracking-wider">
                     <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">{major.code}</span>
                     <span>Khoa {major.group}</span>
                 </div>
                 <h2 className="text-3xl lg:text-4xl font-black tracking-tight">{major.name}</h2>
             </div>
          </div>

          <div className="flex border-b border-slate-100 px-8 shrink-0 overflow-x-auto no-scrollbar">
              {[
                  { id: 'overview', label: 'Tổng quan', icon: GraduationCap },
                  { id: 'curriculum', label: 'Chương trình học', icon: BookOpen },
                  { id: 'career', label: 'Cơ hội việc làm', icon: Briefcase },
                  { id: 'tuition', label: 'Học phí & Học bổng', icon: DollarSign },
              ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-2 px-6 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? `border-blue-600 text-blue-700` 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                      <tab.icon size={18} /> {tab.label}
                  </button>
              ))}
          </div>

          <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-50/50">
              
              {activeTab === 'overview' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-4">Giới thiệu ngành học</h3>
                          <p className="text-slate-600 text-lg leading-relaxed">{major.details.overview}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tổ hợp xét tuyển</h4>
                              <div className="flex flex-wrap gap-2">
                                  {major.combinations.map(c => (
                                      <span key={c} className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-100">{c}</span>
                                  ))}
                              </div>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Điểm chuẩn 2024</h4>
                              <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-black text-slate-900">{major.benchmarks.hocba}</span>
                                  <span className="text-slate-500 font-medium">điểm (Học bạ)</span>
                              </div>
                              {major.benchmarks.notes && <p className="text-xs text-amber-600 mt-2 font-medium bg-amber-50 px-2 py-1 rounded inline-block">{major.benchmarks.notes}</p>}
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'curriculum' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Điểm nổi bật chương trình</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                          {major.details.curriculumHighlights.map((sub, i) => (
                              <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                  <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                                      <BookOpen size={20}/>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900">{sub}</h4>
                                      <p className="text-sm text-slate-500 mt-1">Môn học chuyên ngành cốt lõi, cập nhật theo xu hướng thực tế.</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {activeTab === 'career' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Vị trí việc làm sau khi tốt nghiệp</h3>
                      <div className="space-y-3">
                          {major.details.careerPaths.map((job, i) => (
                              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                      <CheckCircle2 size={20}/>
                                  </div>
                                  <span className="font-medium text-slate-800">{job}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {activeTab === 'tuition' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-lg">
                           <div className="flex justify-between items-center mb-4">
                               <span className="text-slate-300 font-medium">Học phí HK1 (2025-2026)</span>
                               <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{major.creditsHK1} tín chỉ</span>
                           </div>
                           <p className="text-4xl font-black text-amber-400">
                               {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(major.tuitionHK1)}
                           </p>
                           <p className="text-sm text-slate-400 mt-2">*Mức học phí tạm tính, có thể thay đổi theo số lượng tín chỉ đăng ký thực tế.</p>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-bold text-slate-900 mb-4">Cơ hội học bổng</h4>
                          <ul className="space-y-3">
                              <li className="flex gap-3 text-sm text-slate-600">
                                  <span className="text-green-600 font-bold">✔</span> Học bổng tài năng: Giảm 100% học phí nếu là thủ khoa.
                              </li>
                              <li className="flex gap-3 text-sm text-slate-600">
                                  <span className="text-green-600 font-bold">✔</span> Học bổng khuyến học: Tặng 2.5 - 10 triệu đồng dựa trên điểm đầu vào.
                              </li>
                          </ul>
                      </div>
                  </div>
              )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-white flex gap-4 shrink-0">
              <button onClick={onClose} className="px-6 py-3.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  Đóng
              </button>
              <button onClick={onChat} className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                  <MessageCircle size={18}/> Tư vấn chi tiết với AI
              </button>
          </div>
      </div>
    </div>
  );
};
