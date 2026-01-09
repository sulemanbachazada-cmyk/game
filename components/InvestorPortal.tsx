
import React from 'react';
import { Shield, BarChart3, Users, Zap, CheckCircle2, Eye, TrendingUp, Lock } from 'lucide-react';

const InvestorPortal: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 bg-[#ff004c]/10 text-[#ff004c] text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-[#ff004c]/20 mb-8">
            Institutional Relations
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mt-6 mb-8 text-white">
          SCALING THE <br/>
          <span className="text-rb italic">REVENUE</span> MODEL
        </h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Aggressive global expansion. Proven 25% partner settlement architecture. High-frequency gaming at a massive scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {[
          { icon: Lock, title: 'Confidential Shield', desc: 'Enterprise-grade encryption protecting all partner commission flows and user account settlements.' },
          { icon: TrendingUp, title: 'High Yield', desc: 'Consistently outperforming legacy platforms in emerging markets by 3.5x conversion.' },
          { icon: Eye, title: 'Visionary Reach', desc: 'Integrated with EasyPaisa, JazzCash, and Global Banking to capture untapped liquidity.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[3rem] hover:border-[#ff004c]/40 transition-all group shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mb-16 -mr-16"></div>
            <div className="w-16 h-16 rb-gradient rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/20">
              <item.icon className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 text-white tracking-tight">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-[4rem] p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-10 tracking-tight text-white leading-[0.9]">EQUITY & <br/><span className="text-[#ff004c]">STRATEGY</span></h2>
            <div className="space-y-8">
              {[
                'Localized payment gateway franchise rights.',
                'Cross-border liquidity pooling participation.',
                'Exclusive VIP partner agreement frameworks.',
                'Direct API access for local sub-networks.'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="mt-1 bg-[#00d4ff]/20 rounded-full p-1.5 group-hover:scale-125 transition-transform">
                    <CheckCircle2 className="text-[#00d4ff]" size={18} />
                  </div>
                  <p className="text-gray-300 font-bold text-lg tracking-tight">{text}</p>
                </div>
              ))}
            </div>
            <button className="mt-16 bg-white text-black px-12 py-6 rounded-[2rem] font-black hover:bg-[#ff004c] hover:text-white transition-all text-xl shadow-2xl">
              REQUEST PROSPECTUS
            </button>
          </div>
          <div className="bg-black/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl">
            <h4 className="text-2xl font-black mb-8 text-white">Confidential Inquiry</h4>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest ml-2">Full Identity</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#ff004c] text-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest ml-2">Secure Email</label>
                <input type="email" placeholder="investor@firm.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#ff004c] text-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest ml-2">Objective</label>
                <textarea placeholder="Tell us about your investment scale..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#ff004c] text-white transition-all resize-none"></textarea>
              </div>
              <button className="w-full rb-gradient text-white py-5 rounded-2xl font-black shadow-2xl shadow-red-500/20 text-lg hover:scale-[1.02] transition-transform">
                INITIATE CONTACT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorPortal;
