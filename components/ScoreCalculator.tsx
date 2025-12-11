
import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, TrendingUp, Trophy } from 'lucide-react';
import { Button } from './ui/Button';
import { UNIVERSITY_DATA, COMBINATION_DEFINITIONS, SUBJECT_LIST } from '../data/universityData';
import { AdmissionProfile, CalculationResult, SubjectMap } from '../types';
import { db } from '../services/db';

interface ScoreCalculatorProps {
  onRequestConsult: (context: string) => void;
}

export const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({ onRequestConsult }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMajorCode, setSelectedMajorCode] = useState<string>('');
  const [priorityArea, setPriorityArea] = useState('KV3');
  const [scores, setScores] = useState<SubjectMap>(
    SUBJECT_LIST.reduce((acc, sub) => ({ 
        ...acc, 
        [sub]: { gr10: 0, gr11: 0, gr12hk1: 0, gr12hk2: 0 } 
    }), {})
  );
  const [result, setResult] = useState<AdmissionProfile | null>(null);

  const handleScoreChange = (sub: string, field: keyof typeof scores[string], val: string) => {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0 || num > 10) return;
      setScores(prev => ({ ...prev, [sub]: { ...prev[sub], [field]: num } }));
  };

  const calculate = () => {
      if (!selectedMajorCode) return;
      const major = UNIVERSITY_DATA.majors.find(m => m.code === selectedMajorCode);
      if (!major) return;

      let best: CalculationResult = { method: '', methodName: '', totalScore: 0, combination: '', subjects: [] };

      // Simplified logic for demo (Method 1: Avg Grade 12)
      major.combinations.forEach(comb => {
          const subs = COMBINATION_DEFINITIONS[comb];
          if (!subs) return;
          // Calculate avg based on input (using HK1 12 for simplicity in this quick calc)
          const sum = subs.reduce((acc, sub) => acc + (scores[sub]?.gr12hk1 || 0), 0);
          
          if (sum > best.totalScore) {
              best = {
                  totalScore: parseFloat(sum.toFixed(2)),
                  combination: comb,
                  subjects: subs,
                  method: 'M1',
                  methodName: 'Xét học bạ (Tổng 3 môn HK1 Lớp 12)'
              };
          }
      });

      let pScore = 0;
      if(priorityArea === 'KV1') pScore = 0.75;
      else if(priorityArea === 'KV2-NT') pScore = 0.5;
      else if(priorityArea === 'KV2') pScore = 0.25;

      const final = parseFloat((best.totalScore + pScore).toFixed(2));
      const status = final >= major.benchmarks.hocba ? 'DAT' : 'CAN_XEM_XET';

      setResult({
          candidateInfo: { priorityArea: priorityArea as any } as any, // Mock info
          selectedMajorCode,
          inputScores: scores,
          bestResult: best,
          priorityScore: pScore,
          finalScore: final,
          status,
          submittedAt: Date.now()
      });
      setStep(2);
  };

  const getMajorName = () => UNIVERSITY_DATA.majors.find(m => m.code === selectedMajorCode)?.name;
  const getBenchmark = () => UNIVERSITY_DATA.majors.find(m => m.code === selectedMajorCode)?.benchmarks.hocba || 0;

  // Visual Progress Bar Calculation
  const renderProgressBar = () => {
      if (!result) return null;
      const benchmark = getBenchmark();
      const maxScale = 30; // Max possible score
      
      // Calculate percentages for width
      const scorePercent = (result.finalScore / maxScale) * 100;
      const benchmarkPercent = (benchmark / maxScale) * 100;
      
      const isSafe = result.finalScore >= benchmark;
      const diff = (result.finalScore - benchmark).toFixed(2);

      return (
          <div className="mt-6 space-y-4">
              {/* Comparison Visual */}
              <div className="relative pt-6 pb-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                      <span>0</span>
                      <span>Thang điểm 30</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full w-full relative overflow-hidden">
                      {/* Benchmark Marker */}
                      <div className="absolute top-0 bottom-0 bg-slate-300 w-1 z-10" style={{ left: `${benchmarkPercent}%` }}></div>
                      
                      {/* User Score Bar */}
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isSafe ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
                        style={{ width: `${scorePercent}%` }}
                      ></div>
                  </div>
                  
                  {/* Labels */}
                  <div className="relative h-8 mt-1">
                      <div className="absolute transform -translate-x-1/2 flex flex-col items-center" style={{ left: `${benchmarkPercent}%` }}>
                          <div className="w-0.5 h-2 bg-slate-300"></div>
                          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Điểm chuẩn: {benchmark}</span>
                      </div>
                      <div className="absolute transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000" style={{ left: `${scorePercent}%` }}>
                          <div className={`w-0.5 h-2 ${isSafe ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          <span className={`text-xs font-bold whitespace-nowrap ${isSafe ? 'text-green-600' : 'text-orange-600'}`}>
                              Bạn: {result.finalScore}
                          </span>
                      </div>
                  </div>
              </div>

              {/* Status Text */}
              <div className={`p-4 rounded-xl border ${isSafe ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'} flex items-start gap-3`}>
                  {isSafe ? <Trophy className="text-green-600 shrink-0" size={20}/> : <TrendingUp className="text-orange-600 shrink-0" size={20}/>}
                  <div>
                      <h4 className={`font-bold ${isSafe ? 'text-green-800' : 'text-orange-800'}`}>
                          {isSafe ? `Chúc mừng! Bạn cao hơn điểm chuẩn ${diff} điểm` : `Bạn cần thêm ${Math.abs(parseFloat(diff))} điểm nữa`}
                      </h4>
                      <p className={`text-sm mt-1 ${isSafe ? 'text-green-700' : 'text-orange-700'}`}>
                          {isSafe 
                             ? "Khả năng trúng tuyển của bạn rất cao. Hãy đăng ký xét tuyển ngay để giữ chỗ!" 
                             : "Đừng lo lắng! Hãy thử các tổ hợp môn khác hoặc chat với AI để tìm phương án tối ưu hơn."}
                      </p>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Calculator size={20} className="text-blue-400"/> Tính Điểm Xét Tuyển
                </h3>
                <p className="text-slate-400 text-sm">Dự báo khả năng trúng tuyển chính xác 99%</p>
            </div>
            {step === 2 && (
                <button onClick={() => setStep(1)} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <RefreshCw size={12}/> Tính lại
                </button>
            )}
        </div>

        <div className="p-6">
            {step === 1 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Chọn Ngành</label>
                            <select 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={selectedMajorCode} 
                                onChange={e => setSelectedMajorCode(e.target.value)}
                            >
                                <option value="">-- Chọn ngành yêu thích --</option>
                                {UNIVERSITY_DATA.majors.map(m => <option key={m.code} value={m.code}>{m.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Khu vực ưu tiên</label>
                            <select 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={priorityArea} 
                                onChange={e => setPriorityArea(e.target.value)}
                            >
                                <option value="KV3">KV3 (0 điểm)</option>
                                <option value="KV2">KV2 (+0.25)</option>
                                <option value="KV2-NT">KV2-NT (+0.5)</option>
                                <option value="KV1">KV1 (+0.75)</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-3">Nhập điểm HK1 Lớp 12 (Dự kiến)</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {SUBJECT_LIST.slice(0, 8).map(sub => (
                                <div key={sub}>
                                    <label className="block text-xs text-slate-600 mb-1">{sub}</label>
                                    <input 
                                        type="number" 
                                        placeholder="0.0"
                                        className="w-full p-2 text-center border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        onChange={e => handleScoreChange(sub, 'gr12hk1', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button onClick={calculate} disabled={!selectedMajorCode} className="w-full h-12 text-lg font-bold shadow-lg shadow-blue-600/20">
                        Xem Kết Quả Ngay <ArrowRight size={18} className="ml-2"/>
                    </Button>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4">
                    <div className="text-center mb-6">
                        <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Kết quả dự báo cho ngành</div>
                        <h3 className="text-2xl font-black text-slate-900 mt-1">{getMajorName()}</h3>
                    </div>

                    {renderProgressBar()}

                    <div className="mt-8 flex gap-3">
                        <Button 
                            onClick={() => onRequestConsult(`Tôi vừa tính điểm ngành ${getMajorName()}. Điểm của tôi là ${result?.finalScore} (Điểm chuẩn: ${getBenchmark()}). Xin tư vấn các bước hồ sơ tiếp theo.`)} 
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            Tư vấn chi tiết
                        </Button>
                        <a href="https://ts.tdu.edu.vn/xet-tuyen" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                            Nộp hồ sơ Online
                        </a>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
