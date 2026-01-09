
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Star, Users, Flame, ChevronRight, Eye, Sparkles, Globe, ShieldCheck } from 'lucide-react';

const CATEGORIES = ['Featured', '1000+ Slots', 'VIP Live', 'Instant Play', 'RBE Exclusives', 'International'];

const GAMES = [
  { id: 'slots', title: 'RBE Ruby Reels', provider: 'Red Blue Elite', rating: 4.9, players: 1240, category: 'Slots', image: 'https://picsum.photos/seed/rb-slot/600/400' },
  { id: 'roulette', title: 'Electric Blue Live', provider: 'Evolution RBE', rating: 4.8, players: 850, category: 'Live Casino', image: 'https://picsum.photos/seed/rb-roulette/600/400' },
  { id: 'blackjack', title: 'Crimson VIP Table', provider: 'Red Blue Elite', rating: 5.0, players: 430, category: 'Table Games', image: 'https://picsum.photos/seed/rb-blackjack/600/400' },
  { id: 'poker', title: 'Eye Master Holdem', provider: 'Red Blue Elite', rating: 4.7, players: 2100, category: 'Table Games', image: 'https://picsum.photos/seed/rb-poker/600/400' },
  { id: 'dice', title: 'Neon Storm Dice', provider: 'BGaming', rating: 4.5, players: 112, category: 'Instant', image: 'https://picsum.photos/seed/rb-dice/600/400' },
  { id: 'aviator', title: 'Red Blue Aviator', provider: 'Spribe', rating: 4.9, players: 3400, category: 'Instant', image: 'https://picsum.photos/seed/rb-aviator/600/400' },
];

const GameCard = ({ game }: { game: typeof GAMES[0] }) => (
  <Link 
    to={game.id === 'slots' ? '/play/slots' : '#'} 
    className="group relative bg-[#0c0c0c] rounded-3xl overflow-hidden border border-white/5 hover:border-[#ff004c]/40 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
  >
    <div className="aspect-[5/4] relative overflow-hidden">
      <img 
        src={game.image} 
        alt={game.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-[#ff004c] text-white text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-500/30">
          <Flame size={10} fill="white" /> VERIFIED
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-[9px] text-[#00d4ff] font-black uppercase tracking-widest mb-1">{game.provider}</p>
        <h4 className="text-white text-lg font-black group-hover:text-[#ff004c] transition-colors tracking-tight">{game.title}</h4>
      </div>
    </div>
    <div className="p-4 flex items-center justify-between bg-black/50 border-t border-white/5">
      <div className="flex items-center gap-2">
        <Star size={12} className="text-[#00d4ff] fill-[#00d4ff]" />
        <span className="text-xs font-black text-gray-300">{game.rating}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Users size={12} />
        <span className="text-[10px] font-bold">{game.players} online</span>
      </div>
    </div>
  </Link>
);

const GameLobby: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Dynamic Branding Hero */}
      <div className="relative h-[400px] md:h-[500px] rounded-[3.5rem] overflow-hidden mb-16 shadow-2xl group border border-white/5">
        <img 
          src="https://picsum.photos/seed/rb-hero/1600/800" 
          className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-[2000ms]"
          alt="Red Blue Eyelashes Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent flex items-center px-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                <Sparkles size={16} className="text-[#ff004c]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d4ff]">The Global Standard</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter text-white">
              BEYOND THE <br />
              <span className="text-rb">EYELASHES</span>
            </h1>
            <p className="text-gray-400 mb-10 text-lg font-medium leading-relaxed max-w-md">
                Join the world's most confidential high-stakes platform. Real assets, instant settlements, global accessibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rb-gradient text-white px-10 py-5 rounded-[1.5rem] font-black hover:scale-105 transition-transform shadow-2xl shadow-red-500/20 text-lg">
                ENTER THE ARENA
              </button>
              <button className="bg-white/5 backdrop-blur-xl border border-white/10 px-10 py-5 rounded-[1.5rem] font-black hover:bg-white/10 transition-all text-white/80">
                PARTNER LOGIN
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-6 bg-black/60 backdrop-blur-md p-4 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
                <Globe className="text-[#00d4ff]" />
                <div>
                    <p className="text-[8px] text-gray-500 font-black uppercase">Active Regions</p>
                    <p className="text-xs font-bold">184 Countries</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#ff004c]" />
                <div>
                    <p className="text-[8px] text-gray-500 font-black uppercase">Payout Security</p>
                    <p className="text-xs font-bold">AES-256 Valid</p>
                </div>
            </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-3xl font-black flex items-center gap-4">
            <Trophy className="text-[#ff004c]" size={28} /> 
            Elite Selection
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button key={cat} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff004c] hover:border-[#ff004c] hover:text-white transition-all whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {GAMES.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
          {/* Volume Replication */}
          {GAMES.map(game => (
            <GameCard key={`${game.id}-vol`} game={game} />
          ))}
        </div>
      </div>

      {/* Referral Banner */}
      <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 rounded-[4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
        <div className="absolute inset-0 rb-gradient opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"></div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-4xl font-black mb-4 tracking-tight">Become a <span className="text-[#ff004c]">Red Blue</span> Associate</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Invite players from anywhere in the world and claim your <span className="text-white font-black underline decoration-[#00d4ff] decoration-4">25% fixed revenue share</span>. 
            Automated payouts to your provided EasyPaisa account (+92 343 211 3545).
          </p>
        </div>
        <Link to="/dashboard" className="relative z-10 bg-white text-black px-12 py-6 rounded-[2rem] font-black flex items-center gap-3 hover:bg-[#ff004c] hover:text-white transition-all shadow-2xl whitespace-nowrap text-lg">
          ACCESS PARTNER HUB <ChevronRight size={24} />
        </Link>
      </div>
    </div>
  );
};

export default GameLobby;
