import { ArrowRight, BookOpen, Search } from "lucide-react";
import { subjects } from "../data/demo";
import { Link } from "react-router-dom";

export function Subjects() {
 return <div className="space-y-7">
   <div><div className="text-xs font-bold text-violet-300">CLASS 11 · SCIENCE</div><h1 className="mt-2 text-3xl font-black">Your learning library</h1><p className="mt-2 text-sm text-slate-500">Explore chapters, concepts and revision progress.</p></div>
   <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 max-w-2xl"><Search size={18} className="text-slate-500"/><input placeholder="Search a subject or chapter..." className="w-full bg-transparent text-sm outline-none"/></div>
   <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
     {subjects.map(s => <Link to={`/subjects/${s.id}`} key={s.id} className="group glass rounded-[28px] p-6 hover:-translate-y-1 transition"><div className="flex items-center justify-between"><div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-2xl`}>{s.icon}</div><ArrowRight className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-white" size={20}/></div><h2 className="mt-7 text-xl font-black">{s.name}</h2><p className="mt-1 text-xs text-slate-500">{s.chapters} chapters · {s.mastered} mastered</p><div className="mt-5 h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{width:`${s.progress}%`}}/></div><div className="mt-3 flex justify-between text-xs"><span className="text-slate-500">Progress</span><span className="font-black">{s.progress}%</span></div></Link>)}
   </div>
   <div className="glass rounded-[28px] p-6 flex flex-col md:flex-row md:items-center gap-5"><div className="grid size-12 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300"><BookOpen size={22}/></div><div className="flex-1"><h3 className="font-black">Need a revision plan?</h3><p className="mt-1 text-xs leading-5 text-slate-500">AI can turn your exam date and current performance into a realistic daily plan.</p></div><Link to="/ai-tutor" className="rounded-2xl bg-white px-4 py-3 text-xs font-black text-slate-900">Build with AI</Link></div>
 </div>
}
