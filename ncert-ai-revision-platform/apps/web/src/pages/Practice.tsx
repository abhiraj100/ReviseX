import { BrainCircuit, ChevronRight, Filter, Flame, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const sets = [
 {title:"Laws of Motion",subject:"Physics",q:10,diff:"Medium",accent:"from-violet-500 to-indigo-500"},
 {title:"Structure of Atom",subject:"Chemistry",q:15,diff:"Mixed",accent:"from-cyan-500 to-blue-500"},
 {title:"Limits & Derivatives",subject:"Mathematics",q:12,diff:"Hard",accent:"from-amber-500 to-orange-500"},
 {title:"Cell: The Unit of Life",subject:"Biology",q:10,diff:"Easy",accent:"from-emerald-500 to-teal-500"}
];

export function Practice(){
 return <div className="space-y-7">
   <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-xs font-bold text-violet-300">PRACTICE ARENA</div><h1 className="mt-2 text-3xl font-black">Turn mistakes into mastery.</h1><p className="mt-2 text-sm text-slate-500">Short, focused practice sessions built around your current level.</p></div><button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black"><Filter size={15}/> Filters</button></div>
   <div className="rounded-[30px] border border-violet-400/15 bg-gradient-to-r from-violet-500/10 to-cyan-500/5 p-5 sm:p-6"><div className="flex flex-col gap-5 md:flex-row md:items-center"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-violet-400/10 text-violet-300"><Sparkles/></div><div className="flex-1"><div className="font-black">AI Focus Session</div><p className="mt-1 text-xs leading-5 text-slate-500">Based on your recent attempts, start with Friction and Newton's Laws.</p></div><Link to="/quiz" className="rounded-2xl bg-white px-4 py-3 text-xs font-black text-slate-900">Start 10 questions</Link></div></div>
   <div className="grid gap-4 md:grid-cols-2">{sets.map(s=><Link to="/quiz" key={s.title} className="group glass rounded-[26px] p-5 transition hover:-translate-y-1"><div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${s.accent}`}/><div className="mt-5 flex items-start justify-between"><div><div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">{s.subject}</div><h2 className="mt-1 text-lg font-black">{s.title}</h2></div><ChevronRight size={18} className="text-slate-600 group-hover:text-white"/></div><div className="mt-5 flex items-center gap-4 text-xs text-slate-500"><span>{s.q} questions</span><span>•</span><span>{s.diff}</span><span className="ml-auto inline-flex items-center gap-1 text-orange-300"><Flame size={14}/> +50 XP</span></div></Link>)}</div>
   <div className="glass rounded-[28px] p-6"><div className="flex items-center gap-3"><BrainCircuit className="text-cyan-300"/><div><h2 className="font-black">How adaptive practice works</h2><p className="mt-1 text-xs text-slate-500">Questions become more or less challenging based on your answers.</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-3">{["Start at your level","AI reads your mistakes","Next questions adapt"].map((x,i)=><div key={x} className="rounded-2xl bg-white/[.03] p-4"><div className="text-xs font-black text-violet-300">0{i+1}</div><div className="mt-2 text-sm font-bold">{x}</div></div>)}</div></div>
 </div>
}
