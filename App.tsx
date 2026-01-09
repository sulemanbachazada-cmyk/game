
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, Gamepad2, Wallet, LayoutDashboard, Settings, LogOut, TrendingUp, Users, Bell, Search, Menu, X, ChevronRight, User, Eye, ShieldAlert, Globe, Smartphone, MessageCircle, Server, Zap, ShieldCheck
} from 'lucide-react';
import GameLobby from './components/GameLobby';
import Dashboard from './components/Dashboard';
import WalletView from './components/WalletView';
import InvestorPortal from './components/InvestorPortal';
import AgencyPortal from './components/AgencyPortal';
import SlotMachine from './components/games/SlotMachine';
import LandingPage from './components/LandingPage';

const Navbar = ({ toggleSidebar, balance }: { toggleSidebar: () => void, balance: number }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-white/10 rounded-lg"><Menu size={24} /></button>
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rb-gradient rounded-xl flex items-center justify-center shadow-lg neon-red"><Eye className="text-white" size={24} /></div>
        <span className="text-xl font-black tracking-tighter hidden sm:block">RED<span className="text-[#ff004c]">BLUE</span> EYELASHES</span>
      </Link>
    </div>

    <div className="hidden lg:flex items-center gap-3 bg-black border border-white/5 px-4 py-2 rounded-full shadow-inner">
       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
       <span className="text-[9px] font-black text-white tracking-[0.2em] uppercase">Mainnet: Online</span>
       <div className="w-[1px] h-3 bg-white/10 mx-2"></div>
       <span className="text-[9px] font-black text-[#00d4ff] tracking-[0.2em] uppercase">Secure Node: PK-83</span>
    </div>

    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end mr-2">
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Global Balance</span>
        <span className="text-white font-black">${balance.toLocaleString()}</span>
      </div>
      <Link to="/wallet" className="rb-gradient text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg">Deposit</Link>
      <button className="p-2 hover:bg-white/10 rounded-full relative group">
        <Bell size={20} className="text-gray-400 group-hover:text-white" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff004c] rounded-full animate-pulse"></span>
      </button>
    </div>
  </nav>
);

const Sidebar = ({ isOpen, close, onLogout, balance }: any) => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: 'Lobby', path: '/' },
    { icon: LayoutDashboard, label: 'Partner Hub', path: '/dashboard' },
    { icon: Server, label: 'Agency Portal', path: '/agency' },
    { icon: Wallet, label: 'Cashier', path: '/wallet' },
    { icon: Users, label: 'Investors', path: '/investors' },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={close}></div>}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-[#080808] border-r border-white/5 z-50 transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col pt-24 pb-8 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={close} className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-white/5 text-white border border-white/10' : 'text-gray-500 hover:text-white'}`}>
              <item.icon size={20} className={location.pathname === item.path ? 'text-[#ff004c]' : ''} />
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
          <div className="mt-auto">
            <div className="bg-[#111] p-5 rounded-3xl border border-white/5 relative overflow-hidden group mb-4">
              <p className="text-[9px] text-gray-500 font-black uppercase mb-1">25% Profit Share</p>
              <h4 className="text-xl font-black text-white">${(balance * 0.25).toLocaleString()}</h4>
              <p className="text-[8px] text-[#00d4ff] font-black uppercase mt-2">Verified Partner</p>
            </div>
            <button onClick={onLogout} className="flex items-center gap-3 px-5 py-4 w-full text-red-500 hover:bg-red-500/10 rounded-2xl font-bold text-sm"><LogOut size={18} /><span>Terminate Session</span></button>
          </div>
        </div>
      </aside>
    </>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(42950.00);

  useEffect(() => { if (localStorage.getItem('rbe_auth') === 'true') setIsLoggedIn(true); }, []);
  const handleLogin = () => { localStorage.setItem('rbe_auth', 'true'); setIsLoggedIn(true); };
  const handleLogout = () => { localStorage.removeItem('rbe_auth'); setIsLoggedIn(false); };

  if (!isLoggedIn) return <LandingPage onLogin={handleLogin} />;

  return (
    <Router>
      <div className="min-h-screen bg-[#050505]">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} balance={balance} />
        <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} onLogout={handleLogout} balance={balance} />
        
        <a href="https://wa.me/923430000000" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10"><MessageCircle className="text-white" size={32} /></a>

        <main className="lg:pl-64 pt-20 p-4 lg:p-8 min-h-screen">
          <Routes>
            <Route path="/" element={<GameLobby />} />
            <Route path="/dashboard" element={<Dashboard balance={balance} />} />
            <Route path="/wallet" element={<WalletView balance={balance} setBalance={setBalance} />} />
            <Route path="/investors" element={<InvestorPortal />} />
            <Route path="/agency" element={<AgencyPortal />} />
            <Route path="/play/slots" element={<SlotMachine balance={balance} setBalance={setBalance} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
