
import React from 'react';
import { ArrowLeft, Calendar, User, Eye, Share2, Paperclip, Download, ExternalLink, Clock } from 'lucide-react';
import { NewsItem, ViewState } from '../types';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

interface NewsDetailPageProps {
    newsItem: NewsItem | null;
    onBack: () => void;
    onNavigate: (page: ViewState) => void;
    onOpenChat: () => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsItem, onBack, onNavigate, onOpenChat }) => {
    if (!newsItem) return null;

    const bgImage = newsItem.image && newsItem.image.trim() !== '' ? newsItem.image : 'https://placehold.co/1200x600/e2e8f0/64748b?text=TDU+News';

    return (
        <div className="min-h-screen bg-white font-sans animate-in fade-in duration-300">
            <Navbar onOpenChat={onOpenChat} onNavigate={onNavigate} activePage={ViewState.NEWS} />
            
            {/* Hero Banner */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden pt-20">
                <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt={newsItem.title}/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                
                <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <button onClick={onBack} className="absolute top-28 left-4 md:left-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-md font-medium text-sm">
                        <ArrowLeft size={18}/> Quay lại tin tức
                    </button>

                    <div className="max-w-4xl animate-in slide-in-from-bottom-4 duration-500 delay-100">
                        <div className="flex gap-3 mb-4">
                            <span className={`px-3 py-1 bg-${newsItem.color}-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm`}>
                                {newsItem.category}
                            </span>
                            {newsItem.isFeatured && (
                                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1">
                                    Nổi bật
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 text-shadow-sm">
                            {newsItem.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-white/80 text-sm font-medium">
                            <span className="flex items-center gap-2"><Calendar size={16}/> {newsItem.date}</span>
                            <span className="flex items-center gap-2"><User size={16}/> {newsItem.author || 'Ban biên tập'}</span>
                            <span className="flex items-center gap-2"><Eye size={16}/> {newsItem.views} lượt xem</span>
                            <span className="flex items-center gap-2"><Clock size={16}/> 5 phút đọc</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        {/* Summary */}
                        <div className="text-lg md:text-xl font-medium text-slate-600 mb-8 italic border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-xl">
                            {newsItem.summary}
                        </div>

                        {/* Main Content */}
                        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-2xl prose-img:shadow-md"
                             dangerouslySetInnerHTML={{ __html: newsItem.content }} 
                        />

                        {/* Attachments */}
                        {newsItem.attachments && newsItem.attachments.length > 0 && (
                            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg"><Paperclip size={20}/> Tài liệu đính kèm</h4>
                                <div className="grid gap-3">
                                    {newsItem.attachments.map((file, idx) => (
                                        <a key={idx} href={file.url} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-sm uppercase border border-red-100">{file.type}</div>
                                                <div>
                                                    <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{file.name}</div>
                                                    <div className="text-slate-400 text-xs mt-0.5">{file.size}</div>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                <Download size={20}/>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Action Bar */}
                        <div className="mt-12 flex justify-between items-center py-6 border-t border-slate-200">
                            <div className="flex gap-2">
                                <span className="text-sm font-bold text-slate-500 mr-2 uppercase tracking-wide pt-1">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {newsItem.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium hover:bg-slate-200 cursor-pointer transition-colors">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
                                <Share2 size={18}/> <span className="hidden sm:inline">Chia sẻ bài viết</span>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Related Links */}
                        {newsItem.relatedLinks && newsItem.relatedLinks.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
                                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100"><ExternalLink size={20} className="text-blue-600"/> Liên kết liên quan</h4>
                                <ul className="space-y-4">
                                    {newsItem.relatedLinks.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.url} className="group flex items-start gap-3">
                                                <div className="mt-1.5 w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                                                <span className="text-slate-600 hover:text-blue-700 font-medium text-sm leading-relaxed transition-colors">
                                                    {link.text}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Widget */}
                        <div className="bg-gradient-to-br from-blue-900 to-indigo-800 p-8 rounded-2xl text-white text-center shadow-lg">
                            <h3 className="font-bold text-xl mb-3">Bạn cần tư vấn thêm?</h3>
                            <p className="text-blue-100 text-sm mb-6 opacity-90">Chat ngay với Trợ lý AI để được giải đáp mọi thắc mắc về bài viết này.</p>
                            <button onClick={onOpenChat} className="w-full py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md">
                                Chat Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
