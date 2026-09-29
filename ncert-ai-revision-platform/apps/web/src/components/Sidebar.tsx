import { NavLink } from "react-router-dom";
import { BookOpen, BrainCircuit, ChartNoAxesCombined, ClipboardCheck, House, LibraryBig, MessageCircle, Settings, Sparkles, Trophy, X } from "lucide-react";

const items = [
  ["/", House, "Dashboard"],
  ["/subjects", LibraryBig, "My Subjects"],
  ["/practice", BrainCircuit, "Practice"],
  ["/tests", ClipboardCheck, "Mock Tests"],
  ["/ai-tutor", MessageCircle, "AI Tutor"],
  ["/flashcards", BookOpen, "Flashcards"],
  ["/analytics", ChartNoAxesCombined, "Analytics"]
] as const;

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <aside className={`fixed lg:sticky top-0 z-50 h-screen w-72 shrink-0 border-r border-white/10 bg-[#091321]/95 backdrop-blur-xl transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between px-2 pb-8">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-cyan-500 to-emerald-400 shadow-lg shadow-violet-500/20"><Sparkles size={20}/></div>
          <div><div className="font-black tracking-tight">NCERT AI</div><div className="text-xs text-slate-500">Smart Revision</div></div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400"><X size={20}/></button>
      </div>
      <nav className="space-y-1">
        {items.map(([to, Icon, label]) => <NavLink key={to} to={to} onClick={onClose} className={({isActive}) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white/10 text-white shadow-inner" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={18}/>{label}</NavLink>)}
      </nav>
      <div className="mt-auto rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-500/10 p-4 border border-white/10">
        <Trophy className="mb-3 text-amber-300" size={22}/>
        <div className="font-bold">8 day streak 🔥</div>
        <p className="mt-1 text-xs leading-5 text-slate-400">Keep your revision momentum going.</p>
      </div>
      <NavLink to="/settings" className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5"><Settings size={18}/> Settings</NavLink>
    </div>
  </aside>;
}
