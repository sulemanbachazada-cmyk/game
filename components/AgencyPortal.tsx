
import React, { useState } from 'react';
import { ShieldCheck, Server, Key, BarChart, Globe, Zap, CheckCircle, ExternalLink, Download, FileJson, MapPin, Activity, ListChecks, Briefcase, ChevronRight, Lock } from 'lucide-react';

const AgencyPortal: React.FC = () => {
  const [apiKey, setApiKey] = useState('rb_live_51P2...9k2X');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setApiKey(`rb_live_${Math.random().toString(36).substring(2, 15)}`);
      setIsRegenerating(false);
    }, 1500);
  };

  const JURISDICTIONS = [
    { country: 'Pakistan', status: 'Approved', channel: 'EasyPaisa/Direct', tax: '15% WHT' },
    { country: 'UAE', status: 'Pending', channel: 'Crypto/B2B', tax: '0% Corporate' },
    { country: 'United Kingdom', status: 'Licensed', channel: 'Swift/SDA', tax: '20% GGD' },
    { country: 'Nigeria', status: 'Approved', channel: 'Flutterwave/Bank', tax: '7.5% VAT' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <Server className="text-[#00d4ff]" size={36} /> Agency Integration Hub
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic">B2B Management for Licensed Global Agencies</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-500/10 border border-green-500/30 px-6 py-3 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="text-green-500" size={20} />
            <span className="text-xs font-black text-green-500 uppercase tracking-widest">Compliance Active</span>
          </div>
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
             <ListChecks size={16} /> Audit Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
               <Briefcase size={140} className="text-[#ff004c]" />
            </div>
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
              <Key className="text-[#ff004c]" size={22} /> API Credentials
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2">Production API Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-black/60 border border-white/10 p-5 rounded-2xl font-mono text-sm text-[#00d4ff] flex items-center justify-between">
                    {apiKey}
                    <button onClick={handleRegenerate} className={`text-gray-500 hover:text-white transition-all ${isRegenerating ? 'animate-spin' : ''}`}>
                      <Zap size={18} />
                    </button>
                  </div>
                  <button className="bg-white/5 border border-white/10 px-6 rounded-2xl text-xs font-black uppercase hover:bg-white/10 transition-all">Copy</button>
                </div>
              </div>
              <div className="p-6 bg-[#ff004c]/5 border border-[#ff004c]/20 rounded-2xl">
                 {/* Added Lock to lucide-react imports to resolve conflict with global Lock type */}
                 <p className="text-[10px] font-black text-[#ff004c] uppercase tracking-widest mb-2 flex items-center gap-2"><Lock size={12}/> Security Protocol</p>
                 <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    All agency endpoints are protected via <span className="text-white">mTLS and AES-256 GCM</span>. 
                    Jackpot triggers are validated via distributed consensus to prevent local node manipulation.
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
              <Globe className="text-[#00d4ff]" size={22} /> Global Jurisdictions
            </h3>
            <div className="space-y-4">
               {JURISDICTIONS.map((j) => (
                 <div key={j.country} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-4">
                       <MapPin className="text-gray-600 group-hover:text-[#00d4ff] transition-colors" size={20} />
                       <div>
                          <p className="text-xs font-black text-white">{j.country}</p>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{j.channel}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${j.status === 'Approved' ? 'bg-green-500/20 text-green-500' : j.status === 'Licensed' ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                          {j.status}
                       </span>
                       <p className="text-[9px] text-gray-700 font-black uppercase mt-1.5">{j.tax}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
               ADD NEW JURISDICTION <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
               <Globe size={120} className="text-[#00d4ff]" />
            </div>
            <h3 className="text-lg font-black mb-6 flex items-center gap-3"><CheckCircle className="text-[#00d4ff]" size={20} /> Network Health</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Sub-Agencies</span>
                  <span className="text-sm font-black text-white">42 Active</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Settlement Success</span>
                  <span className="text-sm font-black text-green-500">99.8%</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Avg Response Time</span>
                  <span className="text-sm font-black text-[#00d4ff]">14ms</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[99.8%] shadow-lg shadow-green-500/50"></div>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[10px] text-gray-600 leading-tight font-medium">B2B Compliance monitoring is enforced via Red Blue Global Blockchain Audit Node.</p>
            </div>
          </div>

          <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[3rem]">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Real-Time Telemetry</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-black/60 rounded-2xl border border-white/5">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/40"></div>
                <div>
                  <p className="text-xs font-black text-white">Mainnet Online</p>
                  <p className="text-[9px] text-gray-500">Node: RB-G104-LDN</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-black/60 rounded-2xl border border-white/5">
                <Activity className="text-[#ff004c]" size={20} />
                <div>
                  <p className="text-xs font-black text-white">Transaction Flow</p>
                  <p className="text-[9px] text-gray-500">1.2k req/sec</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center text-center">
             <Download className="text-[#00d4ff] mb-4" size={32} />
             <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">Agency SDK v4.1</h4>
             <p className="text-[10px] text-gray-500 font-medium mb-6">Integrate our high-stakes slot engine into your native application in minutes.</p>
             <button className="w-full bg-[#00d4ff] text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                DOWNLOAD CORE MODULES
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyPortal;
