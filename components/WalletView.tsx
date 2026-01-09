
import React, { useState } from 'react';
import { CreditCard, Wallet, Smartphone, Banknote, ShieldCheck, Info, Zap, Globe, MapPin, Loader2, CheckCircle, Clock, Hash, ArrowDownRight, UserCheck, ShieldAlert, X, FileText } from 'lucide-react';

interface TransactionReceipt {
  id: string;
  amount: number;
  fee: number;
  net: number;
  method: string;
  timestamp: string;
  status: 'Authorized' | 'Dispatched' | 'Settled';
}

const WalletView: React.FC<{ balance: number, setBalance: (val: number | ((prev: number) => number)) => void }> = ({ balance, setBalance }) => {
  const [amount, setAmount] = useState('100');
  const [selectedMethod, setSelectedMethod] = useState('easypaisa');
  const [selectedCountry, setSelectedCountry] = useState('Pakistan');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<TransactionReceipt | null>(null);
  const [showKYC, setShowKYC] = useState(false);
  const [kycStatus, setKycStatus] = useState<'none' | 'pending' | 'verified'>('none');

  const METHODS = [
    { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone, color: 'bg-green-600', region: 'Pakistan Only', fee: 0.02 },
    { id: 'jazzcash', name: 'JazzCash', icon: Banknote, color: 'bg-red-600', region: 'Pakistan Only', fee: 0.02 },
    { id: 'crypto', name: 'USDT (TRC20)', icon: Wallet, color: 'bg-blue-600', region: 'Instant Global', fee: 0.01 },
    { id: 'card', name: 'Elite Card', icon: CreditCard, color: 'bg-[#ff004c]', region: 'Global VIP', fee: 0.035 },
  ];

  const COUNTRIES = ['Pakistan', 'United Arab Emirates', 'United Kingdom', 'Nigeria', 'Germany', 'USA', 'Qatar'];

  const handleWithdrawal = () => {
    if (kycStatus !== 'verified') {
      setShowKYC(true);
      return;
    }

    const val = parseFloat(amount);
    if (isNaN(val) || val > balance || val <= 0) return;
    
    setIsProcessing(true);
    setLastReceipt(null);

    setTimeout(() => {
      const methodObj = METHODS.find(m => m.id === selectedMethod)!;
      const fee = val * methodObj.fee;
      const receipt: TransactionReceipt = {
        id: `RBE-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
        amount: val,
        fee: fee,
        net: val - fee,
        method: methodObj.name,
        timestamp: new Date().toLocaleString(),
        status: 'Settled'
      };

      setBalance(prev => prev - val);
      setIsProcessing(false);
      setLastReceipt(receipt);
    }, 2500);
  };

  const submitKYC = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setKycStatus('verified');
      setIsProcessing(false);
      setShowKYC(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in zoom-in duration-700 pb-12">
      <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-2">Red Blue <span className="text-[#00d4ff]">Cashier</span></h1>
          <p className="text-gray-500 font-medium italic">Verified global liquidity and local settlement gateway.</p>
      </div>

      {kycStatus !== 'verified' && (
        <div className="mb-10 bg-[#ff004c]/5 border border-[#ff004c]/20 p-8 rounded-[3rem] flex items-center justify-between animate-pulse">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#ff004c]/20 rounded-2xl flex items-center justify-center text-[#ff004c]">
                 <ShieldAlert size={32} />
              </div>
              <div>
                 <h3 className="text-xl font-black text-white">Identity Verification Required</h3>
                 <p className="text-sm text-gray-500 font-medium">To comply with global anti-money laundering (AML) laws, verify your ID for EasyPaisa settlements.</p>
              </div>
           </div>
           <button onClick={() => setShowKYC(true)} className="bg-white text-black px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#ff004c] hover:text-white transition-all shadow-xl shadow-red-500/10">
              VERIFY NOW
           </button>
        </div>
      )}

      {lastReceipt && (
        <div className="mb-10 bg-[#0c0c0c] border border-green-500/30 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><CheckCircle size={140} className="text-green-500" /></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20"><CheckCircle className="text-white" size={40} /></div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-white mb-1">Settlement Dispatched</h3>
              <p className="text-green-500 text-[10px] font-black uppercase tracking-widest mb-6">Confirmed Payout to {lastReceipt.method}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Net Payout</p>
                  <p className="text-sm font-black text-white">${lastReceipt.net.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Channel Fee</p>
                  <p className="text-sm font-black text-red-500">-${lastReceipt.fee.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Ref ID</p>
                  <p className="text-xs font-mono text-gray-300">{lastReceipt.id}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Status</p>
                  <p className="text-[9px] font-black text-green-500">REAL-TIME</p>
                </div>
              </div>
            </div>
            <button onClick={() => setLastReceipt(null)} className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full self-start">Dismiss</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Settlement Destination</label>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <MapPin size={12} className="text-[#ff004c]" />
                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="bg-transparent border-none outline-none text-[10px] font-bold text-gray-300 cursor-pointer">
                        {COUNTRIES.map(c => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-5 p-5 rounded-[1.8rem] border-2 transition-all duration-300 group ${
                    selectedMethod === method.id ? 'border-[#ff004c] bg-[#ff004c]/5 shadow-xl shadow-red-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${method.color}`}>
                    <method.icon size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm text-white tracking-tight">{method.name}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{method.region}</p>
                  </div>
                </button>
              ))}
            </div>

            <label className="block text-[10px] text-gray-500 mb-4 font-black uppercase tracking-[0.2em]">Withdraw Amount (USD)</label>
            <div className="relative mb-10 group">
              <span className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl font-black text-gray-700 group-focus-within:text-[#ff004c] transition-colors">$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-[2rem] py-8 pl-16 pr-8 text-5xl font-black focus:border-[#00d4ff] outline-none transition-all placeholder:text-gray-800" />
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-10 space-y-3">
               <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500">
                  <span>Channel Surcharge ({METHODS.find(m => m.id === selectedMethod)?.fee! * 100}%)</span>
                  <span className="text-red-500">-${(parseFloat(amount) * (METHODS.find(m => m.id === selectedMethod)?.fee || 0)).toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center text-xs font-black uppercase text-white border-t border-white/5 pt-3">
                  <span>Actual Settlement Total</span>
                  <span className="text-green-500">${(parseFloat(amount) - (parseFloat(amount) * (METHODS.find(m => m.id === selectedMethod)?.fee || 0))).toFixed(2)}</span>
               </div>
            </div>

            <button onClick={handleWithdrawal} disabled={isProcessing || parseFloat(amount) > balance || parseFloat(amount) <= 0} className={`w-full py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-4 group ${isProcessing ? 'bg-gray-800 cursor-not-allowed' : (parseFloat(amount) > balance ? 'bg-red-950/20 text-red-900 border border-red-900/20 cursor-not-allowed' : 'rb-gradient text-white hover:scale-[1.02]')}`}>
              {isProcessing ? <div className="flex items-center gap-3"><Loader2 className="animate-spin" size={28} /><span className="animate-pulse">AUTHORIZING...</span></div> : <><ShieldCheck size={28} /> {parseFloat(amount) > balance ? 'INSUFFICIENT ASSETS' : 'INITIATE SETTLEMENT'}</>}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full rb-gradient"></div>
            <h3 className="text-lg font-black mb-8 flex items-center gap-2"><Wallet size={18} className="text-[#00d4ff]" /> Partner Liquidity</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm"><span className="text-gray-500 font-bold uppercase text-[10px]">Settled Balance</span><span className="font-black text-white text-lg">${balance.toLocaleString()}</span></div>
              <div className="flex justify-between items-center text-sm"><span className="text-gray-500 font-bold uppercase text-[10px]">KYC Status</span><span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${kycStatus === 'verified' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{kycStatus}</span></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 p-8 rounded-[3rem] shadow-xl relative group">
            <h4 className="font-black text-[#00d4ff] flex items-center gap-3 mb-4 uppercase text-[11px] tracking-widest"><ShieldCheck size={18} className="text-[#ff004c]" /> Local Compliance</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Pakistan settlements to <span className="text-white font-black">+923432113545</span> are processed via Secure Mobile Channel (SMC). Max limit $5,000 per 24h for personal accounts.</p>
          </div>
        </div>
      </div>

      {showKYC && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0c0c0c] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-12 relative shadow-2xl">
             <button onClick={() => setShowKYC(false)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full text-gray-500"><X size={24} /></button>
             <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-[#00d4ff]/20 rounded-2xl flex items-center justify-center border border-[#00d4ff]/30 shadow-xl shadow-[#00d4ff]/10"><UserCheck className="text-[#00d4ff]" size={28} /></div>
                <div><h2 className="text-2xl font-black text-white tracking-tighter">Business KYC</h2><p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Identity Verification Flow</p></div>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2">National ID / Passport Number</label>
                   <input type="text" placeholder="12345-6789012-3" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#ff004c] transition-all" />
                </div>
                <div className="p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] text-center cursor-pointer hover:border-[#00d4ff]/50 transition-all">
                   <Smartphone className="mx-auto text-gray-600 mb-3" size={32} />
                   <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Upload ID Photo (Front & Back)</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-black rounded-2xl border border-white/5">
                   <FileText className="text-gray-500 mt-1" size={16} />
                   <p className="text-[10px] text-gray-600 leading-relaxed italic">By submitting, you agree to the Red Blue Global Partner Settlement Policy for Pakistan-based accounts (+923432113545).</p>
                </div>
                <button onClick={submitKYC} disabled={isProcessing} className="w-full rb-gradient text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-red-500/20 flex items-center justify-center gap-3">
                   {isProcessing ? <Loader2 className="animate-spin" /> : 'SUBMIT VERIFICATION'}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletView;
