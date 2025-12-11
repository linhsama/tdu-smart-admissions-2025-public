
import React from 'react';
import { Calendar, ArrowRight, FileText, Globe, Trophy, Users } from 'lucide-react';
import { NewsItem } from '../types';

export const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const getIcon = (cat: string) => {
      switch(cat) {
          case 'Tuyển sinh': return <FileText size={20} className="text-white"/>;
          case 'Hợp tác': return <Globe size={20} className="text-white"/>;
          case 'Hoạt động': return <Trophy size={20} className="text-white"/>;
          default: return <Users size={20} className="text-white"/>;
      }
  };

  const bgImage = item.image && item.image.trim() !== '' ? item.image : 'https://placehold.co/600x400/e2e8f0/64748b?text=TDU+News';

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-slate-200">
         <img 
            src={bgImage} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'; }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
         <div className="absolute top-4 left-4 z-10">
             <span className={`px-2.5 py-1 bg-${item.color || 'blue'}-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm border border-white/20`}>
                {item.category}
            </span>
         </div>
         <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-white/90 text-xs font-medium">
            <Calendar size={14}/> {item.date}
         </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-indigo-700 transition-colors">
            {item.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
            {item.summary}
        </p>
        <div className="pt-4 border-t border-slate-50 flex justify-between items-center mt-auto">
            <span className="text-xs font-bold text-indigo-600 uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Đọc tiếp <ArrowRight size={14}/>
            </span>
        </div>
      </div>
    </div>
  );
};
