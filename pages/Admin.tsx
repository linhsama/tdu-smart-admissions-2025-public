

import React, { useState, useEffect } from 'react';
import { Settings, Save, Key, Shield, FileText, BarChart2, Download, Filter, Calendar, UploadCloud, Trash2, Clock, CheckCircle2, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { db } from '../services/db';
import { LLMConfig, User, RAGDocument } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const Admin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [llmConfig, setLlmConfig] = useState<LLMConfig | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [ragDocs, setRagDocs] = useState<RAGDocument[]>([]);
  
  // Export State
  const [exportFilter, setExportFilter] = useState({ method: 'all', date: 'all' });

  useEffect(() => {
      const user = db.getCurrentUser();
      if (user && user.role === 'admin') {
          setCurrentUser(user);
          setLlmConfig(db.getLLMConfig());
          setStats(db.getAdvancedStats());
          setRagDocs(db.getRAGDocuments());
      }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const user = db.loginAdmin(loginForm.username, loginForm.password);
          setCurrentUser(user);
          setLlmConfig(db.getLLMConfig());
          setStats(db.getAdvancedStats());
          setRagDocs(db.getRAGDocuments());
      } catch (err: any) { alert(err.message); }
  };

  const handleSaveConfig = () => {
      if (llmConfig) {
          db.saveLLMConfig(llmConfig);
          alert("Đã lưu cấu hình thành công!");
      }
  };

  const handleExport = () => {
      alert(`Đang xuất dữ liệu Lead với bộ lọc: ${exportFilter.method} - ${exportFilter.date}`);
      // In a real app, this would generate a CSV
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Mock uploading process
      const newDoc: RAGDocument = {
          id: `doc_${Date.now()}`,
          title: file.name,
          content: "Nội dung trích xuất từ PDF (Mock Data)...",
          type: 'PDF',
          status: 'Indexed',
          updatedAt: Date.now(),
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      };

      db.addRAGDocument(newDoc);
      setRagDocs(db.getRAGDocuments());
      alert(`Đã tải lên và index file: ${file.name}`);
  };

  const handleDeleteDoc = (id: string) => {
      if(confirm('Bạn có chắc muốn xóa tài liệu này? Chatbot sẽ không còn trả lời dựa trên nội dung này.')) {
          db.deleteRAGDocument(id);
          setRagDocs(db.getRAGDocuments());
      }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (!currentUser) {
      return (
          <div className="h-screen flex items-center justify-center bg-slate-900">
              <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl w-96 space-y-4 shadow-2xl">
                  <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h2>
                  <input className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Username (admin)" value={loginForm.username} onChange={e=>setLoginForm({...loginForm, username: e.target.value})}/>
                  <input type="password" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Password (admin123)" value={loginForm.password} onChange={e=>setLoginForm({...loginForm, password: e.target.value})}/>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">Đăng nhập</Button>
              </form>
          </div>
      );
  }

  return (
      <div className="min-h-screen bg-slate-50 font-sans pb-12">
          <header className="bg-white shadow p-4 sticky top-0 z-30 flex justify-between items-center">
              <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Shield className="text-blue-600"/> TDU Admin Panel</h1>
              <Button variant="ghost" onClick={() => { db.logout(); setCurrentUser(null); }} className="text-slate-600 hover:text-red-600">Logout</Button>
          </header>
          
          <main className="container mx-auto p-4 lg:p-8 space-y-8">
              
              {/* DASHBOARD STATS */}
              {stats && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tổng người dùng</div>
                            <div className="text-3xl font-black text-slate-800 mt-2">{stats.overview.totalUsers}</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Cuộc hội thoại</div>
                            <div className="text-3xl font-black text-blue-600 mt-2">{stats.overview.totalConversations}</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tin nhắn hôm nay</div>
                            <div className="text-3xl font-black text-emerald-600 mt-2">{stats.overview.messagesToday}</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Lead tiềm năng</div>
                            <div className="text-3xl font-black text-amber-500 mt-2">{stats.overview.totalLeads}</div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Top Majors Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="bg-blue-100 p-2 rounded-lg text-blue-600"><BarChart2 size={18}/></span>
                                Top 5 ngành được hỏi nhiều nhất
                            </h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.charts.topMajors} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                        <XAxis type="number" hide/>
                                        <YAxis dataKey="name" type="category" width={140} tick={{fontSize: 11, fontWeight: 600}}/>
                                        <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                                        <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={24} name="Lượt quan tâm"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Conversion Rate Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><TrendingUp size={18}/></span>
                                Tỷ lệ chuyển đổi theo phương thức
                            </h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.charts.conversionRates}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                        <XAxis dataKey="name" tick={{fontSize: 12}}/>
                                        <YAxis />
                                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                                        <Legend wrapperStyle={{paddingTop: '20px'}}/>
                                        <Bar dataKey="applied" fill="#94a3b8" name="Đăng ký tư vấn" radius={[4, 4, 0, 0]} barSize={30}/>
                                        <Bar dataKey="enrolled" fill="#10b981" name="Nộp hồ sơ" radius={[4, 4, 0, 0]} barSize={30}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                  </>
              )}

              {/* DOCUMENT MANAGEMENT SECTION */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><FileText className="text-blue-600"/> Quản lý Hồ sơ Tuyển sinh (PDF)</h2>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                      {/* Upload Box */}
                      <div className="lg:col-span-1">
                          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors group">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <div className="bg-white p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                      <UploadCloud className="w-8 h-8 text-blue-500" />
                                  </div>
                                  <p className="mb-2 text-sm text-slate-700 font-bold">Nhấn để tải lên</p>
                                  <p className="text-xs text-slate-500">PDF, DOCX (Max 10MB)</p>
                              </div>
                              <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
                          </label>
                          <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                              <p className="font-bold mb-1 flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500"/> Hệ thống RAG Active</p>
                              <p>Tài liệu tải lên sẽ được tự động trích xuất nội dung (OCR), vector hóa và cập nhật vào cơ sở tri thức của Chatbot.</p>
                          </div>
                      </div>

                      {/* File List */}
                      <div className="lg:col-span-2">
                          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-full flex flex-col">
                              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                                  <span className="font-bold text-xs text-slate-500 uppercase">Tài liệu hiện có</span>
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">{ragDocs.length} files</span>
                              </div>
                              <div className="divide-y divide-slate-100 overflow-y-auto custom-scrollbar flex-1 max-h-[300px]">
                                  {ragDocs.map(doc => (
                                      <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs shadow-sm border border-red-100">PDF</div>
                                              <div>
                                                  <div className="font-bold text-sm text-slate-800 line-clamp-1" title={doc.title}>{doc.title}</div>
                                                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                                                      <span className="flex items-center gap-1"><Clock size={10}/> {new Date(doc.updatedAt).toLocaleDateString()}</span>
                                                      <span>•</span>
                                                      <span>{doc.size || 'N/A'}</span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                                                  <CheckCircle2 size={10}/> {doc.status}
                                              </div>
                                              <button 
                                                onClick={() => handleDeleteDoc(doc.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Xóa tài liệu"
                                              >
                                                  <Trash2 size={16}/>
                                              </button>
                                          </div>
                                      </div>
                                  ))}
                                  {ragDocs.length === 0 && (
                                      <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
                                          <FileText size={32} className="mb-2 opacity-50"/>
                                          Chưa có tài liệu nào được tải lên.
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* LEAD EXPORT SECTION */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <h2 className="text-xl font-bold flex items-center gap-2"><Download className="text-blue-600"/> Quản lý & Xuất dữ liệu Lead</h2>
                      <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 shadow-sm shadow-green-200">
                          <FileText size={18} className="mr-2"/> Xuất Excel (.xlsx)
                      </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Phương thức xét tuyển</label>
                          <div className="relative">
                              <Filter className="absolute left-3 top-2.5 text-slate-400" size={16}/>
                              <select 
                                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm font-medium text-slate-700"
                                  value={exportFilter.method}
                                  onChange={e => setExportFilter({...exportFilter, method: e.target.value})}
                              >
                                  <option value="all">Tất cả phương thức</option>
                                  <option value="hocba">Xét học bạ THPT</option>
                                  <option value="thpt">Điểm thi THPT 2025</option>
                                  <option value="dgnl">Đánh giá năng lực</option>
                                  <option value="vsat">Kỳ thi V-SAT</option>
                              </select>
                          </div>
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Khoảng thời gian</label>
                          <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 text-slate-400" size={16}/>
                              <select 
                                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm font-medium text-slate-700"
                                  value={exportFilter.date}
                                  onChange={e => setExportFilter({...exportFilter, date: e.target.value})}
                              >
                                  <option value="all">Toàn bộ thời gian</option>
                                  <option value="today">Hôm nay</option>
                                  <option value="week">Tuần này</option>
                                  <option value="month">Tháng này</option>
                                  <option value="quarter">Quý này</option>
                              </select>
                          </div>
                      </div>
                  </div>
              </div>

              {/* AI CONFIG SECTION */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="text-amber-600"/> Cấu hình Chatbot AI</h2>
                  
                  {llmConfig && (
                      <div className="space-y-6">
                          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                              <label className="block text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                                  <Key size={18}/> Gemini API Key
                              </label>
                              <div className="flex gap-2">
                                  <input 
                                      type="password" 
                                      className="flex-1 p-3 border border-amber-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                                      value={llmConfig.apiKey}
                                      onChange={e => setLlmConfig({...llmConfig, apiKey: e.target.value})}
                                      placeholder="AIza..."
                                  />
                              </div>
                              <p className="text-xs text-amber-700 mt-2 font-medium">Key này sẽ được ưu tiên sử dụng cho toàn bộ hệ thống thay cho Key mặc định.</p>
                          </div>

                          <div>
                              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><FileText size={18}/> System Prompt (Chỉ dẫn hệ thống)</label>
                              <textarea 
                                  className="w-full h-64 p-4 border border-slate-200 rounded-xl font-mono text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                  value={llmConfig.systemPrompt}
                                  onChange={e => setLlmConfig({...llmConfig, systemPrompt: e.target.value})}
                              />
                              <p className="text-xs text-slate-500 mt-2">Định nghĩa vai trò (Persona), giọng điệu (Tone) và các quy tắc nghiệp vụ cho AI.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                              <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Model Name</label>
                                  <select 
                                      className="w-full p-3 border border-slate-200 rounded-lg bg-white"
                                      value={llmConfig.modelName}
                                      onChange={e => setLlmConfig({...llmConfig, modelName: e.target.value})}
                                  >
                                      <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended)</option>
                                      <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                      <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-sm font-bold text-slate-700 mb-2">Creativity (Temperature): {llmConfig.temperature}</label>
                                  <input 
                                      type="range" min="0" max="1" step="0.1"
                                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                      value={llmConfig.temperature}
                                      onChange={e => setLlmConfig({...llmConfig, temperature: parseFloat(e.target.value)})}
                                  />
                                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                      <span>Chính xác (0.0)</span>
                                      <span>Sáng tạo (1.0)</span>
                                  </div>
                              </div>
                          </div>

                          <div className="flex justify-end pt-6 border-t border-slate-100">
                              <Button onClick={handleSaveConfig} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl shadow-lg shadow-blue-200">
                                  <Save size={18} className="mr-2"/> Lưu Cấu Hình
                              </Button>
                          </div>
                      </div>
                  )}
              </div>
          </main>
      </div>
  );
};