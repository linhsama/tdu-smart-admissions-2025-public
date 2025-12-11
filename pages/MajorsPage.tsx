
import React, { useState, useMemo } from 'react';
import { UNIVERSITY_DATA } from '../data/universityData';
import { ArrowRight, Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Major } from '../types';
import { MajorDetailModal } from '../components/MajorDetailModal';
import { Footer } from '../components/Footer';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

// --- VISUALIZATION COMPONENT ---
const ScoreVisualizer = ({ major }: { major: Major }) => {
    // Scales: THPT/HocBa (30), DGNL (1200), VSAT (300 est)
    const normalize = (val: number, max: number) => Math.min((val / max) * 100, 100);

    return (
        <div className="space-y-2 mt-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mức điểm chuẩn tham khảo</h4>
            <div className="space-y-2">
                {/* Học bạ */}
                <div className="flex items-center gap-2 text-xs">
                    <span className="w-12 text-slate-500 font-medium text-[10px]">Học bạ</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                            style={{ width: `${normalize(major.benchmarks.hocba, 30)}%` }} 
                            className="h-full bg-blue-500 rounded-full"
                        ></div>
                    </div>
                    <span className="w-8 text-right font-bold text-slate-700">{major.benchmarks.hocba}</span>
                </div>
                
                {/* THPT */}
                <div className="flex items-center gap-2 text-xs">
                    <span className="w-12 text-slate-500 font-medium text-[10px]">THPT</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                            style={{ width: `${normalize(major.benchmarks.thpt, 30)}%` }} 
                            className="h-full bg-emerald-500 rounded-full"
                        ></div>
                    </div>
                    <span className="w-8 text-right font-bold text-slate-700">{major.benchmarks.thpt}</span>
                </div>

                {/* DGNL (Optional display if present) */}
                {major.benchmarks.dgnl && (
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-12 text-slate-500 font-medium text-[10px]">ĐGNL</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div 
                                style={{ width: `${normalize(major.benchmarks.dgnl, 1200)}%` }} 
                                className="h-full bg-amber-500 rounded-full"
                            ></div>
                        </div>
                        <span className="w-8 text-right font-bold text-slate-700">{major.benchmarks.dgnl}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

interface MajorsPageProps {
    onOpenChat: (msg: string) => void;
}

export const MajorsPage: React.FC<MajorsPageProps> = ({ onOpenChat }) => {
  // State
  const [selectedGroup, setSelectedGroup] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  
  // Advanced Filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComb, setSelectedComb] = useState('all');
  const [maxScoreFilter, setMaxScoreFilter] = useState<number>(30);

  // Derived Data
  const groups = ['Tất cả', ...Array.from(new Set(UNIVERSITY_DATA.majors.map(m => m.group))).sort()];
  
  // Get all unique combinations
  const allCombinations = useMemo(() => {
      const combs = new Set<string>();
      UNIVERSITY_DATA.majors.forEach(m => m.combinations.forEach(c => combs.add(c)));
      return Array.from(combs).sort();
  }, []);

  // Filter Logic
  const filteredMajors = useMemo(() => {
      return UNIVERSITY_DATA.majors.filter(m => {
          // 1. Group Filter
          const matchGroup = selectedGroup === 'Tất cả' || m.group === selectedGroup;
          
          // 2. Search Text
          const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.code.includes(searchQuery);
          
          // 3. Combination Filter
          const matchComb = selectedComb === 'all' || m.combinations.includes(selectedComb);
          
          // 4. Score Filter (Check if major's HocBa benchmark is within user's max score)
          const matchScore = m.benchmarks.hocba <= maxScoreFilter;

          return matchGroup && matchSearch && matchComb && matchScore;
      });
  }, [selectedGroup, searchQuery, selectedComb, maxScoreFilter]);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 animate-in fade-in duration-500 font-sans">
        
        {/* Header Hero */}
        <div className="bg-indigo-950 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/20 to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-3">Hệ Thống Đào Tạo</h1>
                <p className="text-indigo-200 max-w-2xl text-lg">Khám phá 25 ngành học xu hướng với chương trình đào tạo ứng dụng thực tiễn.</p>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-sm transition-all">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col gap-4">
                    {/* Top Row: Groups + Search + Toggle Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        
                        {/* Group Tabs */}
                        <div className="flex overflow-x-auto gap-2 pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar mask-gradient-right">
                            {groups.map(g => (
                                <button key={g} onClick={() => setSelectedGroup(g)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedGroup === g ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-600 hover:text-indigo-600'}`}>
                                    {g}
                                </button>
                            ))}
                        </div>

                        {/* Search & Filter Toggle */}
                        <div className="flex gap-2 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-64">
                                <Search className="absolute left-3 top-2.5 text-slate-400" size={16}/>
                                <input 
                                    type="text" 
                                    placeholder="Tìm tên ngành hoặc mã..." 
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2 rounded-lg border flex items-center gap-2 font-bold text-sm transition-colors ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                <SlidersHorizontal size={18}/>
                                <span className="hidden sm:inline">Bộ lọc</span>
                            </button>
                        </div>
                    </div>

                    {/* Collapsible Advanced Filters */}
                    {showFilters && (
                        <div className="pt-4 pb-2 border-t border-slate-100 grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2">
                             {/* Combination Filter */}
                             <div>
                                 <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Tổ hợp xét tuyển</label>
                                 <select 
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-indigo-500"
                                    value={selectedComb}
                                    onChange={e => setSelectedComb(e.target.value)}
                                 >
                                     <option value="all">Tất cả tổ hợp</option>
                                     {allCombinations.map(c => <option key={c} value={c}>{c}</option>)}
                                 </select>
                             </div>

                             {/* Max Score Filter */}
                             <div>
                                 <div className="flex justify-between mb-2">
                                     <label className="text-xs font-bold text-slate-500 uppercase block">Điểm học bạ tối đa</label>
                                     <span className="text-xs font-bold text-indigo-600">{maxScoreFilter} điểm</span>
                                 </div>
                                 <input 
                                    type="range" 
                                    min="15" max="30" step="0.5"
                                    value={maxScoreFilter}
                                    onChange={e => setMaxScoreFilter(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                 />
                                 <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                     <span>15đ</span>
                                     <span>30đ</span>
                                 </div>
                             </div>

                             {/* Active Filters Summary */}
                             <div className="flex items-end justify-between">
                                 <div className="text-xs text-slate-500">
                                     Tìm thấy <span className="font-bold text-indigo-600">{filteredMajors.length}</span> ngành phù hợp
                                 </div>
                                 {(selectedComb !== 'all' || maxScoreFilter < 30) && (
                                     <button 
                                        onClick={() => { setSelectedComb('all'); setMaxScoreFilter(30); }}
                                        className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
                                     >
                                         <X size={12}/> Xóa bộ lọc
                                     </button>
                                 )}
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Major Grid */}
        <div className="container mx-auto px-4 py-12 min-h-[50vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMajors.map(major => (
                    <div key={major.code} onClick={() => setSelectedMajor(major)}
                    className="group cursor-pointer bg-white rounded-2xl border border-slate-100 p-5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/10 hover:-translate-y-1 flex flex-col h-full">
                        
                        {/* Decor Background */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${major.color} opacity-5 rounded-bl-[4rem] transition-transform group-hover:scale-125`}></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${major.color} flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform duration-300`}>
                                    <DynamicIcon name={major.icon} className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 uppercase tracking-wider">{major.group}</span>
                            </div>
                            
                            {/* Title & Code */}
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-700 leading-tight transition-colors">{major.name}</h3>
                            <div className="text-xs font-mono text-slate-400 mb-3">{major.code}</div>
                            
                            {/* Overview (Truncated) */}
                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-auto">
                                {major.details.overview}
                            </p>

                            {/* Benchmark Visualizer */}
                            <ScoreVisualizer major={major} />

                            {/* Action Footer */}
                            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-indigo-600 font-bold text-xs uppercase tracking-wide">
                                <span>Xem chi tiết</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredMajors.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Filter size={32}/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Không tìm thấy ngành phù hợp</h3>
                    <p className="text-slate-500 mt-2">Vui lòng điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
                    <button 
                        onClick={() => { setSelectedGroup('Tất cả'); setSearchQuery(''); setSelectedComb('all'); setMaxScoreFilter(30); }}
                        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                    >
                        Đặt lại bộ lọc
                    </button>
                </div>
            )}
        </div>

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
