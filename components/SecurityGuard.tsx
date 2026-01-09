
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Activity, Globe, Eye, Zap, AlertTriangle, ShieldAlert, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

const SecurityGuard: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [threatLevel, setThreatLevel] = useState(0);

  useEffect(() => {
    const events = [
      "Filtering Global Traffic...",
      "DDoS Mitigation Active (Node: PK-1)",
      "SQLi Injection Shield Verified",
      "Brute Force Attempt Blocked [IP: 192.168.x.x]",
      "Session AES-256 Rotation Complete",
      "EasyPaisa Bridge Tunnel Encrypted",
      "Cross-Site Scripting (XSS) Filter Engaged",
      "API Integrity Check: 100% Valid"
    ];

    const interval = setInterval(() => {
      setLogs(prev => [events[Math.floor(Math.random() * events.length)], ...prev.slice(0, 5)]);
      setThreatLevel(Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
        <ShieldAlert size={140} className="text-[#ff004c]" />
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ff004c]/20 rounded-2xl flex items-center justify-center border border-[#ff004c]/30">
            <Lock className="text-[#ff004c]" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">RBE Cyber-Shield</h3>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Anti-Hacking Protocol: V4.0</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 px-4 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">System Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="bg-black/60 border border-white/5 p-4 rounded-2xl">
           <p className="text-[8px] text-gray-600 font-black uppercase mb-1">Traffic Quality</p>
           <p className="text-lg font-black text-white">99.98% Clean</p>
        </div>
        <div className="bg-black/60 border border-white/5 p-4 rounded-2xl">
           <p className="text-[8px] text-gray-600 font-black uppercase mb-1">Threat Level</p>
           <p className={`text-lg font-black ${threatLevel > 3 ? 'text-red-500' : 'text-[#00d4ff]'}`}>
             {threatLevel === 0 ? 'Minimal' : threatLevel < 3 ? 'Low' : 'Mitigated'}
           </p>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
          <Terminal size={14} /> Live Security Log
        </div>
        {logs.map((log, i) => (
          <div key={i} className={`flex items-center gap-3 text-[9px] font-mono transition-all duration-500 ${i === 0 ? 'text-[#00d4ff]' : 'text-gray-700'}`}>
            <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
            <span className="flex-1">{log}</span>
            {i === 0 && <CheckCircle2 size={10} className="text-green-500" />}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
         <div className="flex items-center gap-3 mb-2">
           <Cpu size={14} className="text-[#ff004c]" />
           <p className="text-[10px] font-black text-white uppercase tracking-widest">Hardware Isolation</p>
         </div>
         <p className="text-[9px] text-gray-600 leading-relaxed italic">
           All partner settlement keys are stored in HSM (Hardware Security Modules). 
           Unauthorized hacking attempts trigger an immediate global circuit-break.
         </p>
      </div>
    </div>
  );
};

export default SecurityGuard;
