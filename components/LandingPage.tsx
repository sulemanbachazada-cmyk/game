
import React, { useState } from 'react';
import { Eye, ShieldCheck, Globe, Smartphone, ArrowRight, Mail } from 'lucide-react';

const COUNTRIES = [
  { name: 'Pakistan', code: 'PK', flag: '🇵🇰' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦' }
];

const LandingPage = ({ onLogin }: { onLogin: () => void }) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto custom-scrollbar">
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff004c]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00d4ff]/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="w-16 h-16 rb-gradient rounded-2xl flex items-center justify-center shadow-2xl neon-red">
                <Eye className="text-white" size={36} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter">
                RED BLUE <br/><span className="text-rb">EYELASHES</span>
              </h1>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] mb-6 tracking-tighter">
              THE WORLD'S <br/>
              MOST <span className="text-[#ff004c]">PRIVATE</span> <br/>
              ELITE CASINO.
            </h2>
            
            <p className="text-gray-500 text-lg font-medium mb-10 max-w-md mx-auto lg:mx-0">
              Instant settlements to EasyPaisa, JazzCash, and Global Crypto. Join 1,000+ verified high-stakes games.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                <ShieldCheck className="text-[#00d4ff]" size={20} />
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">AES-256 SECURE</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                <Globe className="text-[#ff004c]" size={20} />
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">GLOBAL ACCESS</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c0c] border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative">
            <h3 className="text-2xl font-black text-white mb-2">{isSignup ? 'Global Registration' : 'Partner Access'}</h3>
            <p className="text-gray-500 text-sm mb-8 font-medium">Enter the elite circle of Red Blue Eyelashes.</p>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              {isSignup && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2">Select Country</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00d4ff] transition-all cursor-pointer">
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code} className="bg-[#111]">{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2">Email Address</label>
                <input type="email" placeholder="name@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#ff004c] transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#ff004c] transition-all" />
              </div>

              <button type="submit" className="w-full rb-gradient text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-red-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                {isSignup ? 'CREATE ACCOUNT' : 'SECURE LOGIN'} <ArrowRight size={20} />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[10px] font-black uppercase text-gray-700 tracking-[0.2em]"><span className="bg-[#0c0c0c] px-4">OR CONTINUE WITH</span></div>
              </div>

              <button type="button" onClick={onLogin} className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors">
                <Mail size={18} /> GOOGLE ACCOUNT
              </button>

              <p className="text-center text-xs text-gray-500 font-medium mt-6">
                {isSignup ? 'Already have an account?' : "Don't have an account?"} 
                <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-[#00d4ff] ml-2 font-bold hover:underline">
                  {isSignup ? 'Sign In' : 'Sign Up Now'}
                </button>
              </p>
            </form>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40">
           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6 grayscale brightness-200" alt="PayPal" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" className="h-6 grayscale brightness-200" alt="Visa" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" className="h-8 grayscale brightness-200" alt="Mastercard" />
           <div className="text-white font-black text-sm">USDT TRC20</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
