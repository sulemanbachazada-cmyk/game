
import React, { useState, useEffect } from 'react';
import { 
  Eye, ShieldCheck, Globe, Smartphone, ArrowRight, Mail, 
  User, Lock, CheckCircle2, ShieldAlert, Loader2, Info, 
  ChevronRight, Phone, Fingerprint, Chrome, Github, Apple,
  KeyRound, ShieldQuestion, ArrowLeft, Send
} from 'lucide-react';

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

type FlowStep = 'GATEWAY' | 'DOSSIER' | 'VERIFICATION' | 'HANDSHAKE';

const LandingPage = ({ onLogin }: { onLogin: () => void }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('GATEWAY');
  const [isSignup, setIsSignup] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: 'PK',
    phone: '',
    terms: false
  });

  const isDossierValid = formData.name && formData.email && formData.password && formData.phone && formData.terms;

  const handleGoogleLogin = () => {
    // Simulate Google Login and then force Dossier for missing info
    setCurrentStep('DOSSIER');
    setFormData(prev => ({ ...prev, email: 'user@gmail.com' }));
  };

  const handleDossierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDossierValid) {
      setCurrentStep('VERIFICATION');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length === 6) {
      setCurrentStep('HANDSHAKE');
      setTimeout(() => {
        onLogin();
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const updateOtp = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto custom-scrollbar font-sans">
      {/* HANDSHAKE OVERLAY (Step 4) */}
      {currentStep === 'HANDSHAKE' && (
        <div className="fixed inset-0 z-[210] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="relative">
            <div className="w-32 h-32 border-2 border-[#ff004c]/20 rounded-full flex items-center justify-center animate-spin duration-[4s]">
              <div className="w-20 h-20 border-2 border-[#00d4ff]/40 rounded-full animate-ping"></div>
            </div>
            <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" size={48} />
          </div>
          <h2 className="text-3xl font-black text-white mt-12 tracking-tighter uppercase italic">IDENTITY ANCHORED</h2>
          <div className="mt-6 flex flex-col items-center gap-4 text-center max-w-sm">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Binding Dossier to Node: PK-83-MAINNET</p>
            <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ff004c] via-[#00d4ff] to-[#ff004c] animate-progress w-full"></div>
            </div>
            <p className="text-xs font-bold text-green-500 animate-pulse">ESTABLISHING SECURE SETTLEMENT BRIDGE...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#ff004c]/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d4ff]/5 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-12">
          
          {/* Branding Side */}
          <div className="text-center lg:text-left space-y-10">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-20 h-20 rb-gradient rounded-3xl flex items-center justify-center shadow-2xl neon-red ring-4 ring-white/5">
                <Eye className="text-white" size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter leading-none">
                  RED BLUE <br/><span className="text-rb">EYELASHES</span>
                </h1>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] mt-2">Elite Global Nexus</p>
              </div>
            </div>
            
            <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                  THE <span className="text-rb">ARENA</span> <br/>
                  OF PURE <br/>
                  <span className="text-white/20">PRIVACY.</span>
                </h2>
                <p className="text-gray-500 text-xl font-medium max-w-md mx-auto lg:mx-0 leading-relaxed italic">
                  Complete your verified dossier for high-stakes node assignment. Real assets. Real settlements. Globally.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: ShieldCheck, label: 'Verified', color: 'text-green-500' },
                { icon: Globe, label: 'Global', color: 'text-blue-500' },
                { icon: Smartphone, label: 'Instant', color: 'text-[#ff004c]' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start gap-2 bg-white/5 border border-white/5 p-4 rounded-3xl backdrop-blur-md hover:border-white/20 transition-all">
                  <item.icon className={item.color} size={24} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-[#0c0c0c] border border-white/10 p-8 md:p-12 rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-white/5">
            <div className="absolute top-0 left-0 w-full h-1 rb-gradient"></div>
            
            {/* STEP 1: GATEWAY */}
            {currentStep === 'GATEWAY' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                        <h3 className="text-4xl font-black text-white tracking-tighter">Gateway Access</h3>
                        <p className="text-gray-500 text-sm mt-2 font-medium">Select your preferred entry method to Red Blue.</p>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-black py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-white/5"
                        >
                            <Chrome size={24} /> ENTER WITH GOOGLE
                        </button>
                        <button 
                            onClick={() => setCurrentStep('DOSSIER')}
                            className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-4 hover:bg-white/10 transition-all"
                        >
                            <Mail size={24} /> EMAIL CREDENTIALS
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-white/5 border border-white/10 text-white/60 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                                <Apple size={16} /> APPLE ID
                            </button>
                            <button className="bg-white/5 border border-white/10 text-white/60 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                                <Github size={16} /> GITHUB
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-[2rem] text-center">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Notice of Compliance</p>
                        <p className="text-xs text-gray-500 font-medium italic">"All access requires mandatory profile completion for AML/KYC settlements via EasyPaisa and Global Banking Nodes."</p>
                    </div>
                </div>
            )}

            {/* STEP 2: DOSSIER */}
            {currentStep === 'DOSSIER' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <button onClick={() => setCurrentStep('GATEWAY')} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                            <ArrowLeft size={20} className="text-gray-400" />
                        </button>
                        <div className="text-right">
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Security Dossier</h3>
                            <p className="text-[9px] font-black text-[#ff004c] uppercase tracking-widest">Profiling in progress...</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleDossierSubmit}>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-4">Full Identity (Legal Name)</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff004c] transition-colors" size={18} />
                                <input 
                                    required name="name" type="text" value={formData.name} onChange={handleInputChange}
                                    placeholder="e.g. Muhammad Ali" 
                                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white outline-none focus:border-[#ff004c] transition-all" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-4">Origin</label>
                                <div className="relative">
                                    <select 
                                        name="country" value={formData.country} onChange={handleInputChange}
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00d4ff] transition-all appearance-none cursor-pointer"
                                    >
                                        {COUNTRIES.map(c => <option key={c.code} value={c.code} className="bg-[#111]">{c.flag} {c.code}</option>)}
                                    </select>
                                    <Globe className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={16} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-4">Payout Mobile</label>
                                <div className="relative group">
                                    <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00d4ff] transition-colors" size={18} />
                                    <input 
                                        required name="phone" type="tel" value={formData.phone} onChange={handleInputChange}
                                        placeholder="+92..." 
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white outline-none focus:border-[#00d4ff] transition-all font-mono" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-4">Secure Network Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff004c] transition-colors" size={18} />
                                <input 
                                    required name="email" type="email" value={formData.email} onChange={handleInputChange}
                                    placeholder="node-access@redblue.com" 
                                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white outline-none focus:border-[#ff004c] transition-all" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-4">Encryption Passkey</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00d4ff] transition-colors" size={18} />
                                <input 
                                    required name="password" type="password" value={formData.password} onChange={handleInputChange}
                                    placeholder="••••••••" 
                                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white outline-none focus:border-[#00d4ff] transition-all" 
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-4 cursor-pointer group p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                            <input 
                                required type="checkbox" name="terms" checked={formData.terms} onChange={handleInputChange}
                                className="mt-1 w-5 h-5 rounded-lg border-white/10 bg-black text-[#ff004c] focus:ring-0" 
                            />
                            <span className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                I verify that all identity data is legally accurate for cross-border settlements. I accept the Red Blue Security Protocols for high-stakes node participation.
                            </span>
                        </label>

                        <button 
                            type="submit" 
                            disabled={!isDossierValid}
                            className={`w-full py-8 rounded-3xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-4 relative group overflow-hidden
                                ${isDossierValid ? 'rb-gradient text-white hover:scale-[1.01] shadow-red-500/30' : 'bg-white/5 text-gray-700 border border-white/5 cursor-not-allowed'}`}
                        >
                            {isDossierValid ? 'CONFIRM DOSSIER' : 'DETAILS REQUIRED'} 
                            <ArrowRight size={24} className={isDossierValid ? 'animate-bounce-x' : ''} />
                        </button>
                    </form>
                </div>
            )}

            {/* STEP 3: VERIFICATION */}
            {currentStep === 'VERIFICATION' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                    <div className="flex items-center justify-between mb-12">
                        <button onClick={() => setCurrentStep('DOSSIER')} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                            <ArrowLeft size={20} className="text-gray-400" />
                        </button>
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Verification</h3>
                        <div className="w-10"></div>
                    </div>

                    <div className="w-20 h-20 bg-[#00d4ff]/10 rounded-[2rem] border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/10">
                        <ShieldQuestion className="text-[#00d4ff]" size={40} />
                    </div>

                    <h4 className="text-xl font-black text-white mb-2">VALIDATE IDENTITY</h4>
                    <p className="text-xs text-gray-500 font-medium mb-10">A secure 6-digit handshake code has been dispatched to <span className="text-white font-mono">{formData.phone}</span>.</p>

                    <div className="flex justify-center gap-3 mb-10">
                        {otp.map((digit, i) => (
                            <input 
                                key={i} id={`otp-${i}`} type="text" maxLength={1} value={digit}
                                onChange={(e) => updateOtp(i, e.target.value)}
                                className="w-12 h-16 bg-black border-2 border-white/10 rounded-2xl text-center text-2xl font-black text-[#ff004c] outline-none focus:border-[#ff004c] transition-all"
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleVerifyOtp}
                            disabled={otp.join('').length < 6}
                            className={`w-full py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-4 transition-all
                                ${otp.join('').length === 6 ? 'rb-gradient text-white shadow-2xl shadow-red-500/20' : 'bg-white/5 text-gray-700 cursor-not-allowed'}`}
                        >
                            <KeyRound size={20} /> INITIALIZE SESSION
                        </button>
                        <button className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
                            <Send size={12} /> Resend Handshake Code (59s)
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-10 flex items-center gap-4 justify-center text-gray-600 pt-8 border-t border-white/5">
                <div className="flex -space-x-3">
                   {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0c0c0c] bg-gray-800 flex items-center justify-center"><User size={10} /></div>)}
                </div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em]">1.2k Agents Online</p>
                <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[8px] font-black uppercase tracking-[0.2em] text-green-500">Live Secure</span>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6 brightness-200" alt="PayPal" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" className="h-6 brightness-200" alt="Visa" />
           <div className="text-white font-black text-sm tracking-widest">JAZZCASH</div>
           <div className="text-white font-black text-sm tracking-widest">EASYPAISA</div>
           <div className="text-white font-black text-sm tracking-widest">USDT TRC20</div>
           <div className="text-white font-black text-sm tracking-widest">STRIPE</div>
        </div>
      </div>

      <style>{`
        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-progress { animation: progress 2.5s infinite linear; }
        @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        .animate-bounce-x { animation: bounce-x 1s infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;
