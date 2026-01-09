
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Play, RotateCcw, Coins, Trophy, ShieldCheck, History, Zap, Lock, Sparkles, AlertCircle, Eye, Filter, XCircle, Volume2, VolumeX, Info, X, ChevronRight, Crown, Settings2, Sliders, ExternalLink, Hash, CheckCircle2, TrendingUp, Diamond, BellRing, Activity, HelpCircle, BookOpen, Layers } from 'lucide-react';

interface SymbolConfig {
  char: string;
  weight: number;
  threeMatch: number;
  twoMatch: number;
  label: string;
}

interface GameNotification {
  id: string;
  type: 'win' | 'jackpot' | 'bonus';
  message: string;
  amount?: number;
}

const SYMBOL_CONFIG: SymbolConfig[] = [
  { char: '👑', weight: 1, threeMatch: 0, twoMatch: 100, label: 'MEGA JACKPOT' }, 
  { char: '🃏', weight: 4, threeMatch: 0, twoMatch: 0, label: 'WILD' }, 
  { char: '🎰', weight: 3, threeMatch: 1000, twoMatch: 50, label: 'EYE POT' },
  { char: '7️⃣', weight: 8, threeMatch: 100, twoMatch: 10, label: 'LUCKY SEVEN' },
  { char: '💎', weight: 12, threeMatch: 50, twoMatch: 5, label: 'DIAMOND' },
  { char: '✨', weight: 15, threeMatch: 0, twoMatch: 0, label: 'SCATTER' },
  { char: '🔔', weight: 25, threeMatch: 20, twoMatch: 2, label: 'BELL' },
  { char: '🍋', weight: 45, threeMatch: 10, twoMatch: 1.5, label: 'LEMON' },
  { char: '🍒', weight: 65, threeMatch: 5, twoMatch: 1.1, label: 'CHERRY' },
];

const MIN_BET = 10;
const MAX_BET = 10000;
const STEP_OPTIONS = [10, 50, 100, 500, 1000];

const WEIGHTED_POOL: string[] = SYMBOL_CONFIG.flatMap(s => Array(s.weight).fill(s.char));

const getRarityInfo = (weight: number) => {
  if (weight <= 2) return { label: 'ULTRA', color: 'text-yellow-400 bg-yellow-400/10' };
  if (weight <= 5) return { label: 'LEGEND', color: 'text-purple-400 bg-purple-400/10' };
  if (weight <= 10) return { label: 'RARE', color: 'text-blue-400 bg-blue-400/10' };
  if (weight <= 20) return { label: 'ELITE', color: 'text-green-400 bg-green-400/10' };
  return { label: 'COMMON', color: 'text-gray-500 bg-white/5' };
};

const useGameSounds = (isMuted: boolean) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const initCtx = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };
  const playSound = useCallback((freq: number, type: OscillatorType, duration: number, volume: number = 0.1, ramp: boolean = true) => {
    if (isMuted || !audioCtx.current) return;
    const ctx = audioCtx.current;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    if (ramp) gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [isMuted]);

  return useMemo(() => ({
    initCtx,
    playTick: () => playSound(150, 'square', 0.05, 0.02),
    playStop: () => playSound(100, 'sine', 0.1, 0.05),
    playSpin: () => playSound(220, 'triangle', 0.2, 0.03),
    playWin: (isBigWin: boolean) => {
      const notes = isBigWin ? [523, 659, 783, 1046, 1318, 1567] : [523, 659, 783, 1046];
      notes.forEach((f, i) => setTimeout(() => playSound(f, 'sine', 0.5, 0.1), i * 150));
    },
    playJackpot: () => {
      [523, 659, 783, 1046, 1318, 1567, 2093].forEach((f, i) => {
        setTimeout(() => playSound(f, 'sawtooth', 0.8, 0.15), i * 100);
        setTimeout(() => playSound(f * 1.5, 'square', 0.8, 0.05), i * 100 + 50);
      });
    },
    playLoss: () => playSound(80, 'sawtooth', 0.3, 0.04),
    playFreeSpin: () => [880, 1100, 1320, 1760].forEach((f, i) => setTimeout(() => playSound(f, 'triangle', 0.6, 0.05), i * 80))
  }), [playSound]);
};

const Reel = ({ targetSymbol, isSpinning, delay, onComplete, isTurbo }: any) => {
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const SYMBOL_HEIGHT = 256; 
  const STRIP_SIZE = 50; 
  
  const strip = useMemo(() => {
    const s = [];
    for (let i = 0; i < STRIP_SIZE - 1; i++) s.push(WEIGHTED_POOL[Math.floor(Math.random() * WEIGHTED_POOL.length)]);
    s.push(targetSymbol);
    return s;
  }, [targetSymbol, isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setOffset((STRIP_SIZE - 1) * SYMBOL_HEIGHT);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setOffset(0);
      setIsTransitioning(false);
    }
  }, [isSpinning, delay, targetSymbol]);

  const duration = isTurbo ? 600 : 2500;
  return (
    <div className="relative z-10 flex-1 h-64 bg-gradient-to-b from-[#050505] to-[#111] border-2 border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
      <div 
        className="absolute top-0 left-0 w-full flex flex-col items-center"
        style={{ transform: `translateY(-${offset}px)`, transition: isTransitioning ? `transform ${duration}ms cubic-bezier(0.1, 0, 0, 1.1)` : 'none' }}
        onTransitionEnd={() => {
          if (isTransitioning) {
            onComplete();
          }
        }}
      >
        {strip.map((symbol, i) => (
          <div key={i} className="h-64 w-full flex items-center justify-center text-8xl" style={{ height: `${SYMBOL_HEIGHT}px` }}>
            <span className="drop-shadow-2xl">{symbol}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none rounded-[3rem]"></div>
    </div>
  );
};

const NotificationToast = ({ notification, onDismiss }: { notification: GameNotification, onDismiss: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 4000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const styles = {
    win: 'bg-green-500/10 border-green-500/40 text-green-400 shadow-green-500/20',
    jackpot: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-yellow-500/30 rb-gradient-overlay border-yellow-400/80',
    bonus: 'bg-blue-500/10 border-blue-500/40 text-[#00d4ff] shadow-blue-500/20',
  };

  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] border-2 backdrop-blur-xl animate-in slide-in-from-right-12 duration-500 mb-3 shadow-2xl ${styles[notification.type]}`}>
      <div className={`p-3 rounded-2xl bg-white/5`}>
        {notification.type === 'jackpot' ? <Crown size={24} className="animate-bounce" /> : notification.type === 'bonus' ? <Sparkles size={24} /> : <Trophy size={24} />}
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none mb-1">{notification.type} ALERT</p>
        <h4 className="text-sm font-black tracking-tight">{notification.message}</h4>
        {notification.amount && <p className="text-lg font-black mt-1">${notification.amount.toLocaleString()}</p>}
      </div>
      <button onClick={() => onDismiss(notification.id)} className="p-2 hover:bg-white/10 rounded-full opacity-40 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};

const SlotMachine: React.FC<{ balance: number, setBalance: (val: any) => void }> = ({ balance, setBalance }) => {
  const [isMuted, setIsMuted] = useState(false);
  const { initCtx, playStop, playSpin, playWin, playLoss, playFreeSpin, playTick, playJackpot } = useGameSounds(isMuted);

  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [bet, setBet] = useState(100);
  const [activeStep, setActiveStep] = useState(100);
  const [history, setHistory] = useState<any[]>([]);
  const [isTurbo, setIsTurbo] = useState(false);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(0);
  const [totalBonusWin, setTotalBonusWin] = useState(0);
  const [notifications, setNotifications] = useState<GameNotification[]>([]);
  const [showRules, setShowRules] = useState(false);
  
  const [progressiveJackpot, setProgressiveJackpot] = useState(245890.12);
  
  const isFreeSpinMode = freeSpinsLeft > 0;
  const finalResultRef = useRef<string[]>(['🎰', '🎰', '🎰']);

  const addNotification = (type: GameNotification['type'], message: string, amount?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [{ id, type, message, amount }, ...prev].slice(0, 3));
  };

  const handleReelStop = useCallback(() => {
    playStop();
  }, [playStop]);

  const spin = () => {
    if ((balance < bet && !isFreeSpinMode) || spinning) return;
    initCtx(); 
    playSpin();
    
    setProgressiveJackpot(prev => prev + (bet * 0.01));

    if (!isFreeSpinMode) {
      setBalance((prev: number) => prev - bet);
      setTotalBonusWin(0); 
    } else {
      setFreeSpinsLeft(prev => prev - 1);
    }

    setSpinning(true);
    setLastWin(0);
    setCurrentMultiplier(isFreeSpinMode ? 5.0 : 1.0);
    
    finalResultRef.current = [
      WEIGHTED_POOL[Math.floor(Math.random() * WEIGHTED_POOL.length)],
      WEIGHTED_POOL[Math.floor(Math.random() * WEIGHTED_POOL.length)],
      WEIGHTED_POOL[Math.floor(Math.random() * WEIGHTED_POOL.length)]
    ];
  };

  useEffect(() => {
    if (spinning) {
      const timer = setTimeout(() => {
        setSpinning(false);
        const final = finalResultRef.current;
        const symbolsWithoutWild = final.filter(s => s !== '🃏');
        const wildCount = final.filter(s => s === '🃏').length;

        let mult = 0;
        let isMegaJackpot = false;

        const crownCount = final.filter(s => s === '👑').length;
        if (crownCount + wildCount === 3) {
          isMegaJackpot = true;
        } else {
          const potentialWinSymbols = Array.from(new Set(symbolsWithoutWild.filter(s => s !== '✨')));
          let bestThreeMatch = 0;
          let bestTwoMatch = 0;

          potentialWinSymbols.forEach(sym => {
            const symCount = final.filter(s => s === sym).length;
            const config = SYMBOL_CONFIG.find(s => s.char === sym)!;
            if (symCount + wildCount === 3) bestThreeMatch = Math.max(bestThreeMatch, config.threeMatch);
            else if (symCount + wildCount === 2) bestTwoMatch = Math.max(bestTwoMatch, config.twoMatch);
          });

          if (wildCount === 3) bestThreeMatch = 500;
          mult = bestThreeMatch > 0 ? bestThreeMatch : bestTwoMatch;
        }

        const scatterCount = final.filter(s => s === '✨').length;
        if (scatterCount >= 3) {
          setFreeSpinsLeft(prev => prev + 10);
          playFreeSpin();
          addNotification('bonus', isFreeSpinMode ? 'BONUS RE-TRIGGERED! +10 SPINS' : 'BONUS ROUND UNLOCKED: 10 FREE SPINS');
        }

        if (isMegaJackpot) {
          const jackpotWin = Math.floor(progressiveJackpot);
          setLastWin(jackpotWin);
          setBalance((p: number) => Math.floor(p + jackpotWin));
          addNotification('jackpot', 'GLOBAL PROGRESSIVE JACKPOT HIT!', jackpotWin);
          playJackpot();
          setProgressiveJackpot(50000);
          setHistory(prev => [{ id: Math.random(), result: final, win: jackpotWin, timestamp: new Date().toLocaleTimeString(), type: 'JACKPOT' }, ...prev.slice(0, 19)]);
          return;
        }

        const totalMult = isFreeSpinMode ? Math.max(5.0, mult * 5) : Math.max(1.0, mult);
        setCurrentMultiplier(totalMult);
        
        if (mult > 0) {
          const win = Math.floor(bet * (isFreeSpinMode ? mult * 5 : mult));
          setLastWin(win);
          setBalance((p: number) => Math.floor(p + win));
          if (isFreeSpinMode) setTotalBonusWin(prev => prev + win);
          playWin(win > bet * 5);
          if (mult >= 1000) addNotification('win', 'MEGA SYMBOL WIN!', win);
          else if (win >= bet * 10) addNotification('win', 'CONSOLIDATED BIG WIN', win);
        } else {
          playLoss();
        }
        setHistory(prev => [{ id: Math.random(), result: final, win: Math.floor(bet * mult * (isFreeSpinMode ? 5 : 1)), timestamp: new Date().toLocaleTimeString() }, ...prev.slice(0, 19)]);
      }, isTurbo ? 1000 : 3000);
      return () => clearTimeout(timer);
    }
  }, [spinning, bet, isFreeSpinMode, isTurbo, playFreeSpin, playLoss, playWin, setBalance, progressiveJackpot, playJackpot]);

  const isEligibleToSpin = !spinning && (balance >= bet || isFreeSpinMode);

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-7xl mx-auto py-12 animate-in fade-in duration-700">
      
      {showRules && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0c0c0c] border border-white/10 w-full max-w-2xl rounded-[3.5rem] p-10 relative overflow-y-auto max-h-[90vh] custom-scrollbar shadow-2xl">
            <button onClick={() => setShowRules(false)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full text-gray-500 transition-colors"><X size={24} /></button>
            <div className="flex items-center gap-6 mb-10">
               <div className="w-16 h-16 bg-[#ff004c]/20 rounded-2xl flex items-center justify-center border border-[#ff004c]/30">
                  <BookOpen className="text-[#ff004c]" size={32} />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter">Ruby Reels Intelligence</h2>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Game Rules & Paytable v1.4</p>
               </div>
            </div>
            <div className="space-y-10">
              <section>
                <h4 className="text-[10px] font-black text-[#00d4ff] uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-2">Special Symbols</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex gap-4">
                    <span className="text-4xl">🃏</span>
                    <div>
                      <p className="text-xs font-black text-white uppercase mb-1">WILD SYMBOL</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed italic">Substitutes for all symbols except Scatter (✨) to complete winning lines.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex gap-4">
                    <span className="text-4xl">✨</span>
                    <div>
                      <p className="text-xs font-black text-white uppercase mb-1">SCATTER</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed italic">Hit 3 or more anywhere to trigger <span className="text-[#00d4ff]">10 Free Spins</span> with a <span className="text-green-500">5x Global Multiplier</span>.</p>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h4 className="text-[10px] font-black text-[#00d4ff] uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-2">Yield Architecture</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {SYMBOL_CONFIG.filter(s => s.threeMatch > 0 || s.twoMatch > 0).map(s => (
                    <div key={s.char} className="bg-black/40 border border-white/5 p-4 rounded-3xl text-center hover:border-[#ff004c]/30 transition-all">
                       <span className="text-3xl block mb-2">{s.char}</span>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">{s.label}</p>
                       <p className="text-xs font-black text-white">3x: {s.threeMatch}x</p>
                       <p className="text-[9px] font-bold text-gray-500">2x: {s.twoMatch}x</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                <h4 className="text-sm font-black text-white mb-3">General Gameplay</h4>
                <ul className="space-y-3">
                  {[
                    'Winning lines pay left-to-right on the single center payline.',
                    'The Global Progressive Jackpot is won by hitting 3 Kings (👑) or combinations with Wilds.',
                    'Free Spins (Bonus Round) can be re-triggered during play.',
                    'Maximum bet is $10,000 for high-stakes institutional partners.',
                    'All payout settlements are instant via the Red Blue Cashier tunnel.'
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 text-[10px] text-gray-400 font-medium">
                       <CheckCircle2 size={12} className="text-[#00d4ff] shrink-0 mt-0.5" />
                       {text}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <button onClick={() => setShowRules(false)} className="w-full mt-10 rb-gradient text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
               RETURN TO ARENA
            </button>
          </div>
        </div>
      )}

      <div className="fixed top-24 right-8 z-[100] w-full max-w-sm flex flex-col items-end pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="pointer-events-auto">
            <NotificationToast notification={n} onDismiss={(id) => setNotifications(prev => prev.filter(item => item.id !== id))} />
          </div>
        ))}
      </div>

      <div className="hidden lg:block bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-white font-black flex items-center gap-3 tracking-tight text-sm">
            <Eye size={22} className="text-[#ff004c]" /> PAYTABLE
          </h3>
          <div className="flex gap-2">
            <button onClick={() => { initCtx(); setShowRules(true); }} className="p-2 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-all"><HelpCircle size={18} /></button>
            <button onClick={() => { initCtx(); setIsMuted(!isMuted); }} className={`p-2 rounded-xl transition-all ${isMuted ? 'text-gray-600 bg-white/5' : 'text-[#00d4ff] bg-[#00d4ff]/10'}`}>{isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
          </div>
        </div>
        <div className="space-y-6">
          {SYMBOL_CONFIG.map(s => {
            const rarity = getRarityInfo(s.weight);
            return (
              <div key={s.char} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300">{s.char}</span>
                    {s.weight <= 5 && <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>}
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest block">{s.label}</span>
                    <span className={`text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest mt-1 inline-block ${rarity.color}`}>{rarity.label}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">{s.threeMatch > 0 ? `${s.threeMatch.toLocaleString()}x` : (s.char === '👑' ? 'JACKPOT' : (s.char === '🃏' ? 'WILD' : 'SCATTER'))}</p>
                  <p className="text-[8px] text-gray-700 font-bold uppercase">{s.twoMatch > 0 ? `${s.twoMatch}x` : '-'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-black/60 border border-white/5 rounded-[3rem] p-8 relative overflow-hidden group shadow-2xl text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 animate-subtle-pulse pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
             <div className="flex items-center gap-3 mb-2">
                <Crown size={20} className="text-yellow-400 animate-bounce" />
                <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.4em]">Global Progressive Jackpot</p>
                <Crown size={20} className="text-yellow-400 animate-bounce" />
             </div>
             <h2 className="text-6xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_25px_rgba(255,215,0,0.3)]">${progressiveJackpot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          </div>
        </div>

        <div className={`transition-all duration-700 bg-[#0c0c0c] border-t-8 rounded-[4rem] p-10 shadow-2xl relative overflow-hidden ${isFreeSpinMode ? 'border-[#00d4ff] ring-4 ring-[#00d4ff]/20' : 'border-[#ff004c]'}`}>
          {isFreeSpinMode && (
            <div className="absolute top-0 left-0 right-0 bg-[#00d4ff] py-2 flex justify-center items-center gap-4 z-20 shadow-lg">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.3em]">Bonus Round Active</span>
              <div className="h-4 w-[1px] bg-black/20"></div>
              <span className="text-sm font-black text-black">TOTAL BONUS WIN: ${totalBonusWin.toLocaleString()}</span>
            </div>
          )}

          <div className={`flex justify-between items-center mb-8 relative z-10 ${isFreeSpinMode ? 'mt-8' : ''}`}>
            <div><p className="text-[10px] text-gray-600 uppercase font-black mb-1">Global Balance</p><h3 className="text-4xl font-black text-white">${balance.toLocaleString()}</h3></div>
            <div className="relative group perspective-1000 text-center">
              <div className={`relative px-10 py-4 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center justify-center min-w-[140px] overflow-hidden ${(lastWin > 0 || isFreeSpinMode) ? (isFreeSpinMode ? 'bg-blue-600/10 border-blue-400/50 shadow-[0_0_40px_rgba(0,212,255,0.3)]' : 'bg-red-600/10 border-red-400/50 shadow-[0_0_40px_rgba(255,0,76,0.3)]') : 'bg-black/40 border-white/5 opacity-60'}`}>
                <div className="flex items-center gap-3 relative z-10"><Activity size={18} className={`${isFreeSpinMode ? 'text-blue-400 animate-pulse' : 'text-red-400'}`} /><p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.25em]">Yield Multiplier</p></div>
                <div className="relative mt-1"><span className={`text-4xl font-black tracking-tighter tabular-nums transition-all duration-300 ${(lastWin > 0 || isFreeSpinMode) ? 'text-white' : 'text-gray-700'} ${isFreeSpinMode ? 'text-blue-200 drop-shadow-[0_0_12px_rgba(0,212,255,1)]' : ''}`}>{currentMultiplier.toFixed(1)}x</span></div>
                {isFreeSpinMode && <div className="mt-1 px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30"><p className="text-[7px] font-black text-blue-400 uppercase tracking-widest">5X BONUS APPLIED</p></div>}
              </div>
            </div>
            <div className="text-right"><p className="text-[10px] text-gray-600 uppercase font-black mb-1">Last Payout</p><h3 className={`text-4xl font-black ${lastWin > 0 ? 'text-green-400' : 'text-gray-800'}`}>${lastWin.toLocaleString()}</h3></div>
          </div>

          <div className="flex gap-4 mb-12 relative z-10 h-64">
            {[0, 1, 2].map(i => <Reel key={i} targetSymbol={finalResultRef.current[i]} isSpinning={spinning} delay={i * 300} onComplete={handleReelStop} isTurbo={isTurbo} />)}
          </div>

          {/* Enhanced Bet Configuration UI */}
          <div className="space-y-6 relative z-10 mb-8">
            <div className="flex items-center justify-between px-4">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] flex items-center gap-2">
                <Sliders size={12} className="text-[#ff004c]" /> Bet Configuration
              </label>
              <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                 {STEP_OPTIONS.map(opt => (
                   <button 
                     key={opt}
                     onClick={() => { playTick(); setActiveStep(opt); }}
                     className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${activeStep === opt ? 'bg-[#ff004c] text-white' : 'text-gray-500 hover:text-white'}`}
                   >
                     ${opt}
                   </button>
                 ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className={`flex-[2] bg-black/60 p-5 rounded-[2rem] border transition-all duration-300 flex items-center justify-between ${bet >= MAX_BET ? 'border-red-500/50' : 'border-white/5'}`}>
                <button 
                  onClick={() => { playTick(); setBet(Math.max(MIN_BET, bet - activeStep)); }} 
                  disabled={spinning || isFreeSpinMode || bet <= MIN_BET} 
                  className="w-12 h-12 bg-white/5 rounded-2xl font-black text-xl text-white hover:bg-white/10 active:scale-90 disabled:opacity-20 transition-all"
                >
                  -
                </button>
                <div className="text-center">
                  <p className={`text-[8px] font-black uppercase tracking-widest transition-all ${bet >= MAX_BET ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
                    {bet >= MAX_BET ? 'CAPACITY LIMIT' : 'ACTIVE STAKE'}
                  </p>
                  <p className={`text-3xl font-black transition-all ${bet >= MAX_BET ? 'text-[#ff004c]' : 'text-white'}`}>
                    ${bet.toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => { playTick(); setBet(Math.min(MAX_BET, bet + activeStep)); }} 
                  disabled={spinning || isFreeSpinMode || bet >= MAX_BET} 
                  className={`w-12 h-12 rounded-2xl font-black text-xl text-white transition-all ${bet >= MAX_BET ? 'bg-red-500/20 text-red-500 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 active:scale-90 disabled:opacity-20'}`}
                >
                  +
                </button>
              </div>
              
              <div className="flex flex-col gap-2 min-w-[100px]">
                <button 
                  onClick={() => { playTick(); setBet(MAX_BET); }} 
                  disabled={spinning || isFreeSpinMode || bet === MAX_BET} 
                  className={`flex-1 px-6 rounded-2xl font-black text-[11px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${bet === MAX_BET ? 'border-[#ff004c] text-[#ff004c] bg-[#ff004c]/10' : 'border-white/5 text-gray-400 hover:text-white hover:border-white/20'}`}
                >
                  MAX
                </button>
                <button 
                  onClick={() => { playTick(); setBet(MIN_BET); }} 
                  disabled={spinning || isFreeSpinMode || bet === MIN_BET} 
                  className={`flex-1 px-6 rounded-2xl font-black text-[11px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${bet === MIN_BET ? 'border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/10' : 'border-white/5 text-gray-400 hover:text-white hover:border-white/20'}`}
                >
                  MIN
                </button>
              </div>

              <button 
                onClick={() => { playTick(); setIsTurbo(!isTurbo); }} 
                className={`px-8 rounded-[2rem] font-black text-[10px] uppercase tracking-widest border transition-all flex items-center gap-3 ${isTurbo ? 'border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/10 ring-2 ring-[#00d4ff]/20' : 'border-white/5 text-gray-600 hover:border-white/20'}`}
              >
                <Zap size={16} fill={isTurbo ? 'currentColor' : 'none'} /> Turbo
              </button>
            </div>
          </div>

          <button 
            onClick={spin} 
            disabled={!isEligibleToSpin && !spinning} 
            className={`w-full py-8 rounded-[2.5rem] font-black text-4xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-5 relative group 
              ${spinning ? 'bg-[#111] text-gray-700 cursor-not-allowed translate-y-1' : ''} 
              ${isEligibleToSpin ? 'animate-subtle-pulse hover:scale-[1.03] active:scale-95 active:translate-y-2 shadow-red-500/30' : 'opacity-50 cursor-not-allowed'}
              ${isFreeSpinMode && !spinning ? 'bg-gradient-to-r from-[#00d4ff] to-blue-800 text-white shadow-[#00d4ff]/40' : 'rb-gradient text-white'}
            `}
          >
            {spinning ? <RotateCcw className="animate-spin" size={48} /> : isFreeSpinMode ? <div className="flex items-center gap-4"><Sparkles className="animate-pulse" size={40} /><span>{freeSpinsLeft} FREE SPINS</span></div> : 'SPIN ELITE'}
          </button>
        </div>
      </div>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 flex flex-col">
        <h3 className="text-white font-black flex items-center gap-3 tracking-tight mb-6"><History size={22} className="text-[#00d4ff]" /> LIVE FEED</h3>
        <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar flex-1">
          {history.length === 0 && <p className="text-[10px] text-gray-700 font-black uppercase text-center mt-20">Awaiting Action...</p>}
          {history.map((item, i) => (
            <div key={i} className={`bg-black/60 border p-4 rounded-3xl flex justify-between items-center animate-in slide-in-from-top-2 duration-300 ${item.win > 0 ? 'border-green-500/20' : 'border-white/5'}`}>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1.5">{item.result.map((r: any, j: any) => <span key={j} className="text-lg">{r}</span>)}</div>
                {item.type === 'JACKPOT' && <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest">JACKPOT HIT!</span>}
              </div>
              <div className="text-right">
                <p className={`text-xs font-black ${item.win > 0 ? (item.type === 'JACKPOT' ? 'text-yellow-500' : 'text-green-400') : 'text-gray-600'}`}>{item.win > 0 ? `+$${item.win.toLocaleString()}` : `-`+(bet).toLocaleString()}</p>
                <p className="text-[8px] text-gray-800 font-bold uppercase">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
