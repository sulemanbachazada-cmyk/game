
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Wallet, Smartphone, Banknote, ShieldCheck, Info, Zap, 
  Globe, MapPin, Loader2, CheckCircle, Clock, Hash, ArrowDownRight, 
  UserCheck, ShieldAlert, X, FileText, Plus, Trash2, Building2, 
  ChevronRight, Lock, History, AlertCircle, ArrowUpRight, Copy, Search
} from 'lucide-react';
import { Transaction, PayoutMethod } from '../types';

const INITIAL_METHODS: PayoutMethod[] = [
  { id: '1', type: 'easypaisa', label: 'Primary EasyPaisa', identifier: '+92 343 •••••••', isVerified: true, priority: 'Instant' }
];

const INITIAL_HISTORY: Transaction[] = [
  { id: 'RBE-AX9021', amount: 4500, type: 'deposit', method: 'USDT (TRC20)', status: 'settled', date: '2023-10-24 14:20' },
  { id: 'RBE-WX1123', amount: 1200, type: 'withdrawal', method: 'EasyPaisa', status: 'settled', date: '2023-10-23 09:15', accountLabel: 'Primary EasyPaisa' },
  { id: 'RBE-DX3342', amount: 8000, type: 'deposit', method: 'Direct Bank', status: 'settled', date: '2023-10-22 18:45' }
];

const WalletView: React.FC<{ balance: number, setBalance: (val: number | ((prev: number) => number)) => void }> = ({ balance, setBalance }) => {
  const [viewMode, setViewMode] = useState<'deposit' | 'withdraw'>('withdraw');
  const [amount, setAmount] = useState('100');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<Transaction[]>(INITIAL_HISTORY);
  const [payoutAccounts, setPayoutAccounts] = useState<PayoutMethod[]>(INITIAL_METHODS);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(INITIAL_METHODS[0].id);
  const [showAddAccount, setShowAddAccount] = useState(false);
  
  // Form State for Adding Method
  const [newAccountType, setNewAccountType] = useState<PayoutMethod['type']>('easypaisa');
  const [newAccountLabel, setNewAccountLabel] = useState('');
  const [newAccountVal, setNewAccountVal] = useState('');
  const [newAccountBankName, setNewAccountBankName] = useState('');

  const METHODS_CONFIG = {
    easypaisa: { name: 'EasyPaisa', icon: Smartphone, color: 'bg-green-600', fee: 0.02 },
    jazzcash: { name: 'JazzCash', icon: Banknote, color: 'bg-red-600', fee: 0.02 },
    crypto: { name: 'USDT (TRC20)', icon: Wallet, color: 'bg-blue-600', fee: 0.01 },
    bank: { name: 'Direct Bank', icon: Building2, color: 'bg-purple-600', fee: 0.015 },
  };

  const handleAction = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    if (viewMode === 'withdraw' && val > balance) return;

    setIsProcessing(true);
    setTimeout(() => {
      const selectedAcc = payoutAccounts.find(a => a.id === selectedAccountId);
      const fee = viewMode === 'withdraw' ? (val * (METHODS_CONFIG[selectedAcc?.type || 'easypaisa'].fee)) : 0;
      
      const newTx: Transaction = {
        id: `RBE-${Math.random().toString(36).toUpperCase().substring(2, 8)}`,
        amount: val,
        type: viewMode,
        method: viewMode === 'deposit' ? 'Direct Node' : (METHODS_CONFIG[selectedAcc?.type || 'easypaisa'].name),
        status: 'settled',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        accountLabel: viewMode === 'withdraw' ? selectedAcc?.label : undefined
      };

      if (viewMode === 'withdraw') {
        setBalance(prev => Math.floor(prev - val));
      } else {
        setBalance(prev => Math.floor(prev + val));
      }

      setHistory([newTx, ...history]);
      setIsProcessing(false);
      setAmount('100');
    }, 2000);
  };

  const handleRegisterAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(7);
    const newAcc: PayoutMethod = {
      id,
      type: newAccountType,
      label: newAccountLabel,
      identifier: newAccountType === 'bank' ? `${newAccountBankName} | ${newAccountVal}` : newAccountVal,
      isVerified: false,
      priority: 'Standard'
    };
    setPayoutAccounts([...payoutAccounts, newAcc]);
    setSelectedAccountId(id);
    setShowAddAccount(false);
    setNewAccountLabel('');
    setNewAccountVal('');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white">RBE <span className="text-[#ff004c]">Cashier</span></h1>
          <p className="text-gray-500 font-medium mt-1 italic">Licensed High-Stakes Financial Interface</p>
        </div>
        <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10">
          <button 
            onClick={() => setViewMode('deposit')}
            className={`px-8 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'deposit' ? 'bg-[#ff004c] text-white shadow-xl shadow-red-500/20' : 'text-gray-500 hover:text-white'}`}
          >
            Deposit
          </button>
          <button 
            onClick={() => setViewMode('withdraw')}
            className={`px-8 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'withdraw' ? 'bg-[#ff004c] text-white shadow-xl shadow-red-500/20' : 'text-gray-500 hover:text-white'}`}
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
             <div className="flex justify-between items-center mb-10">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                   {viewMode === 'deposit' ? 'Inbound Liquidity' : 'Outbound Settlement'}
                </label>
                {viewMode === 'withdraw' && (
                  <button onClick={() => setShowAddAccount(true)} className="flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors">
                     <Plus size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Register New Destination</span>
                  </button>
                )}
             </div>

             {viewMode === 'withdraw' && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {payoutAccounts.map(acc => (
                    <button 
                      key={acc.id}
                      onClick={() => setSelectedAccountId(acc.id)}
                      className={`p-6 rounded-[2.5rem] border-2 text-left transition-all relative group ${selectedAccountId === acc.id ? 'border-[#ff004c] bg-[#ff004c]/5' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                    >
                       <div className="flex items-start justify-between mb-8">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${METHODS_CONFIG[acc.type].color} shadow-lg shadow-black/40`}>
                             {React.createElement(METHODS_CONFIG[acc.type].icon, { size: 24, className: 'text-white' })}
                          </div>
                          {acc.isVerified ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <Clock size={16} className="text-yellow-500" />
                          )}
                       </div>
                       <h4 className="text-white font-black text-lg truncate">{acc.label}</h4>
                       <p className="text-[10px] font-mono text-gray-500 font-bold tracking-tight">{acc.identifier}</p>
                       {selectedAccountId === acc.id && (
                         <div className="absolute top-6 right-12 w-2 h-2 bg-[#ff004c] rounded-full animate-ping"></div>
                       )}
                    </button>
                  ))}
               </div>
             )}

             <div className="space-y-8">
                <div className="relative group">
                   <span className="absolute left-10 top-1/2 -translate-y-1/2 text-5xl font-black text-gray-800 group-focus-within:text-[#00d4ff] transition-colors">$</span>
                   <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/60 border-2 border-white/5 rounded-[3rem] py-12 pl-24 pr-12 text-6xl font-black outline-none focus:border-[#ff004c] transition-all placeholder:text-gray-900"
                   />
                </div>

                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center text-[#00d4ff]">
                         <Info size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Network Protocol</p>
                         <p className="text-xs font-bold text-white italic">
                            {viewMode === 'deposit' ? 'Direct Node Assignment' : 'Secure Payout Tunnel (STP)'}
                         </p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Fee Rate</p>
                      <p className="text-sm font-black text-red-500">
                         {viewMode === 'deposit' ? '0.00%' : `${(METHODS_CONFIG[payoutAccounts.find(a => a.id === selectedAccountId)?.type || 'easypaisa'].fee * 100).toFixed(1)}%`}
                      </p>
                   </div>
                </div>

                <button 
                  onClick={handleAction}
                  disabled={isProcessing || (viewMode === 'withdraw' && parseFloat(amount) > balance) || parseFloat(amount) <= 0}
                  className={`w-full py-8 rounded-[3rem] font-black text-2xl shadow-2xl flex items-center justify-center gap-5 transition-all active:scale-95 ${isProcessing ? 'bg-gray-800 text-gray-600' : 'rb-gradient text-white hover:scale-[1.01]'}`}
                >
                   {isProcessing ? (
                     <><Loader2 className="animate-spin" size={32} /> Routing Assets...</>
                   ) : (
                     <>{viewMode === 'deposit' ? <ArrowDownRight size={32} /> : <ArrowUpRight size={32} />} {viewMode === 'deposit' ? 'Inject Liquidity' : 'Execute Settlement'}</>
                   )}
                </button>
             </div>
          </div>

          {/* History Ledger */}
          <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[4rem] shadow-2xl">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-white flex items-center gap-3"><History className="text-[#00d4ff]" /> Transaction Ledger</h3>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                   <Search size={14} className="text-gray-500" />
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Global Audit Log</span>
                </div>
             </div>
             
             <div className="space-y-4">
                {history.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-white/10 transition-all group">
                     <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-[#ff004c]/10 text-[#ff004c]'}`}>
                           {tx.type === 'deposit' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                           <div className="flex items-center gap-3">
                              <p className="text-sm font-black text-white">{tx.method}</p>
                              <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em]">{tx.id}</span>
                           </div>
                           <p className="text-[10px] text-gray-500 font-medium">{tx.date} • {tx.accountLabel || 'System Direct'}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className={`text-lg font-black ${tx.type === 'deposit' ? 'text-green-500' : 'text-white'}`}>
                           {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </p>
                        <span className="text-[8px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full text-gray-600">Settled</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <Wallet size={120} className="text-[#00d4ff]" />
             </div>
             <h3 className="text-xl font-black text-white mb-10 flex items-center gap-3"><Wallet size={20} className="text-[#00d4ff]" /> Balance Dashboard</h3>
             <div className="space-y-8 relative z-10">
                <div>
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Total Liquid Assets</p>
                   <p className="text-5xl font-black text-white tracking-tighter">${balance.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[8px] text-gray-600 font-black uppercase mb-1">Node Status</p>
                      <p className="text-xs font-black text-green-500">ENCRYPTED</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[8px] text-gray-600 font-black uppercase mb-1">Compliance</p>
                      <p className="text-xs font-black text-[#00d4ff]">PASSED</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 p-10 rounded-[3.5rem] text-center space-y-6">
             <div className="w-16 h-16 bg-[#ff004c]/10 rounded-2xl flex items-center justify-center mx-auto border border-[#ff004c]/20">
                <ShieldCheck className="text-[#ff004c]" size={32} />
             </div>
             <h4 className="text-xl font-black text-white">Security Protocol</h4>
             <p className="text-xs text-gray-500 font-medium leading-relaxed">
                All settlements are audited by Red Blue Global. 
                Large withdrawals exceeding $10k require manual validation (Node: PK-V4).
             </p>
             <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em]">AES-256 GCM Protection</p>
             </div>
          </div>
        </div>
      </div>

      {/* Add Destination Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-[#080808] border border-white/10 w-full max-w-xl rounded-[4rem] p-12 relative shadow-2xl">
              <button onClick={() => setShowAddAccount(false)} className="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-full text-gray-600 transition-colors"><X size={24} /></button>
              
              <div className="flex items-center gap-6 mb-12">
                 <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-3xl flex items-center justify-center border border-[#00d4ff]/30">
                    <Plus className="text-[#00d4ff]" size={32} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">Add Destination</h2>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Configure Global Payout Channel</p>
                 </div>
              </div>

              <form onSubmit={handleRegisterAccount} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Channel Selection</label>
                  <div className="grid grid-cols-2 gap-4">
                     {(['easypaisa', 'jazzcash', 'crypto', 'bank'] as const).map(type => (
                        <button 
                           key={type}
                           type="button"
                           onClick={() => setNewAccountType(type)}
                           className={`p-5 rounded-[1.8rem] border-2 flex items-center gap-4 transition-all ${newAccountType === type ? 'border-[#ff004c] bg-[#ff004c]/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                        >
                           {React.createElement(METHODS_CONFIG[type].icon, { size: 18, className: newAccountType === type ? 'text-[#ff004c]' : 'text-gray-500' })}
                           <span className={`text-xs font-black uppercase tracking-tight ${newAccountType === type ? 'text-white' : 'text-gray-600'}`}>{METHODS_CONFIG[type].name}</span>
                        </button>
                     ))}
                  </div>
                </div>

                {newAccountType === 'bank' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Bank Name / Branch</label>
                    <input 
                      required
                      type="text" 
                      value={newAccountBankName}
                      onChange={(e) => setNewAccountBankName(e.target.value)}
                      placeholder="e.g. Standard Chartered / HBL" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#00d4ff] transition-all" 
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Account Label (Nickname)</label>
                  <input 
                    required
                    type="text" 
                    value={newAccountLabel}
                    onChange={(e) => setNewAccountLabel(e.target.value)}
                    placeholder="e.g. Savings Wallet" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#00d4ff] transition-all" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">
                     {newAccountType === 'easypaisa' || newAccountType === 'jazzcash' ? 'Registered Phone Number' : newAccountType === 'crypto' ? 'TRC20 Wallet Address' : 'Account Number / IBAN'}
                  </label>
                  <input 
                    required
                    type="text" 
                    value={newAccountVal}
                    onChange={(e) => setNewAccountVal(e.target.value)}
                    placeholder={newAccountType === 'bank' ? 'PK00REVE0000000...' : newAccountType === 'crypto' ? 'T...' : '+92 3XX XXXXXXX'} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#00d4ff] transition-all font-mono" 
                  />
                </div>

                <button type="submit" className="w-full rb-gradient text-white py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-red-500/20 hover:scale-[1.02] transition-transform">
                   REGISTER DESTINATION
                </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default WalletView;
