


import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, Calendar, User, Eye, ArrowRight } from 'lucide-react';
import { db } from '../services/db';
import { NewsCard } from '../components/NewsCard';
import { Footer } from '../components/Footer';
import { NewsItem, ViewState } from '../types';

interface NewsPageProps {
    onNavigate: (page: ViewState, data?: any) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadedNews = db.getNews();
    setNews(loadedNews);
    setFilteredNews(loadedNews);
  }, []);

  useEffect(() => {
    const filtered = news.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [searchQuery, news]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenNews = (item: NewsItem) => {
      // Simulate view count increment & Navigate
      onNavigate(ViewState.NEWS_DETAIL, item);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 animate-in fade-in duration-500 font-sans">
        <div className="bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-black text-slate-900 mb-4">Tin Tức & Sự Kiện</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Cập nhật những thông tin mới nhất về tuyển sinh, hoạt động sinh viên và các chương trình hợp tác quốc tế của Đại học Tây Đô.</p>
                
                <div className="mt-8 max-w-xl mx-auto relative">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm tin tức..." 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20}/>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            {filteredNews.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {currentItems.map((item) => (
                        <div key={item.id} onClick={() => handleOpenNews(item)} className="cursor-pointer">
                            <NewsCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 opacity-60">
                    <Filter className="w-16 h-16 mx-auto text-slate-300 mb-4"/>
                    <h3 className="text-xl font-bold text-slate-700">Không tìm thấy bài viết nào</h3>
                    <p className="text-slate-500">Vui lòng thử từ khóa khác.</p>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-16">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border border-slate-200 hover:bg-white hover:border-indigo-500 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronLeft size={20}/>
                    </button>
                    
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                                    currentPage === page 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border border-slate-200 hover:bg-white hover:border-indigo-500 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronRight size={20}/>
                    </button>
                </div>
            )}
        </div>

        <Footer />
    </div>
  );
};
