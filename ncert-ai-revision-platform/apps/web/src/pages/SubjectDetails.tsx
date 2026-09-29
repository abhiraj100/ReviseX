import { ArrowLeft, CheckCircle2, LockKeyhole, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { subjects } from "../data/demo";

const chapters = ["Units and Measurements","Motion in a Straight Line","Motion in a Plane","Laws of Motion","Work, Energy and Power","System of Particles","Gravitation"];

export function SubjectDetails(){
 const { id } = useParams(); const subject = subjects.find(s=>s.id===id) ?? subjects[0];
 return <div className="space-y-6">
   <Link to="/subjects" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white"><ArrowLeft size={15}/> Back to subjects</Link>
   <section className="rounded-[30px] border border-white/10 bg-gradient-to-br from-violet-600/15 to-cyan-500/5 p-6 sm:p-8"><div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${subject.color} text-2xl`}>{subject.icon}</div><h1 className="mt-5 text-3xl font-black">{subject.name}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Follow your chapter progress, revise concepts, and practice questions based on approved learning content.</p></section>
   <div className="grid gap-3">{chapters.map((chapter,i)=> <div key={chapter} className="glass rounded-[24px] p-4 sm:p-5"><div className="flex items-center gap-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-xs font-black text-slate-400">{String(i+1).padStart(2,"0")}</div><div className="min-w-0 flex-1"><h3 className="truncate font-black">{chapter}</h3><p className="mt-1 text-xs text-slate-600">{i<3 ? "3 topics · " + (84-i*9) + "% complete" : i===3 ? "3 topics · 58% complete" : "5 topics · Not started"}</p></div>{i<3 ? <CheckCircle2 className="text-emerald-300" size={18}/> : i===3 ? <Link to="/practice" className="rounded-xl bg-white px-3 py-2 text-[11px] font-black text-slate-900">Practice</Link> : <LockKeyhole size={17} className="text-slate-700"/>}</div><div className="mt-4 h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{width:`${i<3 ? 84-i*9 : i===3 ? 58 : 0}%`}}/></div></div>)}</div>
 </div>
}
