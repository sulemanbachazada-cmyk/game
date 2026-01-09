
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DollarSign, ArrowUpRight, Globe, TrendingUp, Wallet, Phone, ShieldCheck, 
  Lock, Download, FileText, ExternalLink, X, Link as LinkIcon, Share2, 
  Smartphone, Apple, LayoutGrid, QrCode, Copy, Check, MessageSquare, MessageCircle, Crown, Zap, RefreshCw, Share, Clock, Rocket, ShieldAlert, CheckCircle2, Fingerprint,
  Users, Coffee
} from 'lucide-react';
import SecurityGuard from './SecurityGuard';

const DATA = [
  { name: 'Mon', revenue: 40000, share: 10000 },
  { name: 'Tue', revenue: 30000, share: 7500 },
  { name: 'Wed', revenue: 90000, share: 22500 },
  { name: 'Thu', revenue: 27800, share: 6950 },
  { name: 'Fri', revenue: 110000, share: 27500 },
  { name: 'Sat', revenue: 180000, share: 45000 },
  { name: 'Sun', revenue: 150000, share: 37500 },
];

const StatCard = ({ label, value, icon: Icon, colorClass, trend }: any) => (
  <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-[#ff004c]/30 transition-all">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-4 rounded-2xl ${colorClass}`}><Icon className="text-white" size={24} /></div>
      {trend && <span className="flex items-center text-[10px] font-black text-green-400 bg-green-400/10 px-2 py-1 rounded-full"><ArrowUpRight size={12} /> {trend}</span>}
    </div>
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest relative z-10">{label}</p>
    <h3 className="text-3xl font-black mt-1 text-white relative z-10">{value}</h3>
  </div>
);

const Dashboard: React.FC<{ balance: number }> = ({ balance }) => {
  const [showLaunchCheck, setShowLaunchCheck] = useState(false);
  const [isLunchMode, setIsLunchMode] = useState(false);
  const [referralId, setReferralId] = useState("RB-00923432113545");
  const referralLink = `https://rbe-casino.com/join/${referralId}`;

  useEffect(() => { 
    const launchStatus = localStorage.getItem('rbe_launched');
    if (!launchStatus) {
      const timer = setTimeout(() => setShowLaunchCheck(true), 1200); 
      return () => clearTimeout(timer); 
    }
  }, []);

  const handleLaunch = () => {
    localStorage.setItem('rbe_launched', 'true');
    setShowLaunchCheck(false);
  };

  const handleInviteInvestors = () => {
    const message = `👑 Join RED BLUE EYELASHES - Elite Casino Partner.\n\n💰 Payouts to EasyPaisa\n🚀 Profit: 25% FIXED\nJoin here: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700 space-y-10 pb-16">
      {/* Lunch Mode Overlay */}
      {isLunchMode && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-[#0c0c0c] border border-white/10 p-12 rounded-[4rem] text-center max-w-md shadow-[0_0_50px_rgba(255,0,76,0.2)]">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Coffee className="text-yellow-500" size={40} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">System on Lunch Hold</h2>
            <p className="text-gray-500 text-sm font-medium mb-10">All games are temporarily paused for routine synchronization. Partner Hub remains operational for withdrawals.</p>
            <button 
              onClick={() => setIsLunchMode(false)}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#ff004c] hover:text-white transition-all shadow-2xl"
            >
              RESUME GLOBAL OPERATIONS
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3"><span className="text-[#ff004c]">Partner</span> Dashboard</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Elite Business Interface | ID: +923432113545</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLunchMode(true)}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <Coffee className="text-yellow-500 group-hover:rotate-12 transition-transform" size={20} />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lunch Break</span>
          </button>
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl shadow-green-500/5">
             <Fingerprint className="text-green-500" size={24} />
             <div>
                <p className="text-[9px] text-gray-500 font-black uppercase">Identity Verified</p>
                <p className="text-xs font-black text-green-500 uppercase tracking-tighter">Platinum Elite</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Global Network Volume" value="$1,422,904" icon={Globe} colorClass="bg-blue-600 shadow-lg" trend="+14.2%" />
        <StatCard label="Active Investors" value="402" icon={Users} colorClass="bg-purple-600" trend="Active" />
        <StatCard label="Total Assets Managed" value={`$${balance.toLocaleString()}`} icon={Crown} colorClass="bg-[#ff004c]" />
        <StatCard label="Partner 25% Profit" value={`$${(balance * 0.25).toLocaleString()}`} icon={Zap} colorClass="bg-green-600 shadow-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[3rem] shadow-2xl relative">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-white">Yield Performance Analytics</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Live Feed</span>
              </div>
            </div>
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorShare" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff004c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ff004c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                  <XAxis dataKey="name" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#00d4ff" fill="url(#colorGlobal)" strokeWidth={2} strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="share" stroke="#ff004c" fill="url(#colorShare)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <SecurityGuard />
        </div>
        <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[3rem] text-center flex flex-col items-center">
          <div className="relative group mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff004c] to-[#00d4ff] rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-black p-6 rounded-[2.5rem] border border-white/10">
              <QrCode size={140} className="text-white" />
            </div>
          </div>
          <h4 className="text-lg font-black text-white mb-2 tracking-tight">Partner ID: 00923432113545</h4>
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-10 tracking-[0.3em]">Direct EasyPaisa Tunnel Encrypted</p>
          
          <div className="w-full space-y-4 mb-8">
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-gray-600 uppercase">Share Ratio</span>
                <span className="text-sm font-black text-white">25.0% FIXED</span>
             </div>
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] font-black text-gray-600 uppercase">Settlement Speed</span>
                <span className="text-sm font-black text-green-500">INSTANT</span>
             </div>
          </div>

          <button onClick={handleInviteInvestors} className="w-full bg-[#25D366] text-white py-6 rounded-[1.8rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-green-500/20">
             <MessageCircle size={22} /> INVITE INVESTORS
          </button>
        </div>
      </div>

      {showLaunchCheck && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-500">
           <div className="bg-[#080808] border border-white/10 w-full max-w-xl rounded-[4rem] p-16 text-center relative overflow-hidden shadow-[0_0_100px_rgba(255,0,76,0.1)]">
              <div className="absolute top-0 left-0 w-full h-2 rb-gradient"></div>
              <div className="w-24 h-24 bg-green-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20"><Rocket className="text-green-500" size={48} /></div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">GLOBAL MAINNET LIVE</h2>
              <p className="text-gray-500 font-medium mb-12">System architecture has been scrubbed. All bugs removed. EasyPaisa liquidity tunnel is at 100% capacity. Ready for global high-stakes activity.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-12">
                 {['AES-256 Active', 'EasyPaisa OK', '25% Locked', 'Nodes: Online'].map((check, i) => (
                   <div key={i} className="flex items-center gap-3 justify-center text-[10px] font-black text-white uppercase tracking-widest bg-white/5 py-4 rounded-2xl border border-white/10 group hover:border-[#00d4ff]/40 transition-all">
                      <CheckCircle2 className="text-green-500" size={16} /> {check}
                   </div>
                 ))}
              </div>

              <div className="p-6 bg-[#ff004c]/5 border border-[#ff004c]/20 rounded-3xl mb-12">
                <p className="text-xs font-black text-[#ff004c] uppercase tracking-widest mb-2">Platform Command</p>
                <p className="text-sm font-bold text-white italic">"SYSTEM READY. RED BLUE EYELASHES IS DEPLOYED. GLOBAL SETTLEMENTS ARE ACTIVE. HAVE A GREAT LUNCH!"</p>
              </div>

              <button 
                onClick={handleLaunch} 
                className="w-full rb-gradient text-white py-7 rounded-[2rem] font-black text-2xl shadow-2xl shadow-red-500/40 uppercase tracking-widest hover:scale-[1.03] transition-transform active:scale-95"
              >
                LAUNCH ACTIVITY
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
