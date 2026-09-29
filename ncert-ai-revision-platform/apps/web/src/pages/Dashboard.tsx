import { ArrowRight, BrainCircuit, CheckCircle2, Flame, Play, Sparkles, Target, Timer, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { subjects, weakTopics, recentTests } from "../data/demo";
import { ProgressRing } from "../components/ProgressRing";
import { Link } from "react-router-dom";

const chart = [{d:"Mon",v:62},{d:"Tue",v:68},{d:"Wed",v:66},{d:"Thu",v:74},{d:"Fri",v:71},{d:"Sat",v:82},{d:"Sun",v:86}];

export function Dashboard() {
  return <div className="space-y-7">
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-600/20 via-[#101c31] to-cyan-500/10 p-6 sm:p-8">
      <div className="absolute -right-20 -top-24 size-72 rounded-full bg-violet-500/10 blur-3xl"/>
      <div className="relative max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-200"><Sparkles size={13}/> AI-powered revision</div>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Good evening, Demo Student <span>👋</span></h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Your next best step is ready. Strengthen your weak topics, test yourself, and turn revision into confidence.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/practice" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-900 hover:bg-slate-100"><Play size={16} fill="currentColor"/> Start practice</Link>
          <Link to="/ai-tutor" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold hover:bg-white/10"><BrainCircuit size={16}/> Ask AI Tutor</Link>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {[
        { value: "8 days", label: "Study streak", Icon: Flame, color: "text-orange-300" },
        { value: "1,240", label: "XP earned", Icon: Target, color: "text-violet-300" },
        { value: "78%", label: "Avg. accuracy", Icon: TrendingUp, color: "text-emerald-300" },
        { value: "423", label: "Questions solved", Icon: CheckCircle2, color: "text-cyan-300" }
      ].map(({value,label,Icon,color}) => <div key={label} className="glass rounded-3xl p-4 sm:p-5"><div className={`mb-4 grid size-9 place-items-center rounded-xl bg-white/5 ${color}`}><Icon size={18}/></div><div className="text-xl font-black sm:text-2xl">{value}</div><div className="mt-1 text-xs text-slate-500">{label}</div></div>)}
    </section>

    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <section className="glass rounded-[28px] p-5 sm:p-6">
        <div className="flex items-start justify-between"><div><h2 className="text-lg font-black">Learning momentum</h2><p className="mt-1 text-xs text-slate-500">Your accuracy over the last 7 days</p></div><div className="rounded-xl bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">+12.4%</div></div>
        <div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity=".35"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient></defs><XAxis dataKey="d" axisLine={false} tickLine={false} tick={{fill:"#64748b",fontSize:11}}/><YAxis domain={[40,100]} axisLine={false} tickLine={false} tick={{fill:"#64748b",fontSize:11}}/><Tooltip contentStyle={{background:"#0f1b2d",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,color:"#fff"}}/><Area type="monotone" dataKey="v" stroke="#8b5cf6" strokeWidth={3} fill="url(#fill)" /></AreaChart></ResponsiveContainer></div>
      </section>

      <section className="glass rounded-[28px] p-5 sm:p-6">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-black">Today’s goal</h2><p className="mt-1 text-xs text-slate-500">Keep the streak alive</p></div><ProgressRing value={68} size={68}/></div>
        <div className="mt-6 space-y-3">
          {[
            { x: "Revise Laws of Motion", time: "15 min", done: true },
            { x: "Practice 10 MCQs", time: "10 min", done: true },
            { x: "Review 3 mistakes", time: "5 min", done: false }
          ].map(({x,time,done}) => <div key={x} className="flex items-center gap-3 rounded-2xl bg-white/[.035] p-3"><div className={`grid size-8 place-items-center rounded-xl ${done ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-slate-500"}`}>{done ? <CheckCircle2 size={16}/> : <Timer size={16}/>}</div><div className="min-w-0 flex-1"><div className={`text-sm font-semibold ${done ? "text-slate-400 line-through" : ""}`}>{x}</div><div className="text-[11px] text-slate-600">{time}</div></div></div>)}
        </div>
      </section>
    </div>

    <section>
      <div className="mb-4 flex items-end justify-between"><div><h2 className="text-xl font-black">Your subjects</h2><p className="mt-1 text-xs text-slate-500">Pick up exactly where you left off.</p></div><Link to="/subjects" className="flex items-center gap-1 text-xs font-bold text-violet-300">View all <ArrowRight size={14}/></Link></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {subjects.map(s => <div key={s.id} className="group glass rounded-[26px] p-5 transition hover:-translate-y-1 hover:border-white/20"><div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-xl shadow-lg`}>{s.icon}</div><div className="mt-5 flex items-end justify-between"><div><h3 className="font-black">{s.name}</h3><p className="mt-1 text-xs text-slate-500">{s.mastered}/{s.chapters} chapters mastered</p></div><span className="text-sm font-black">{s.progress}%</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{width:`${s.progress}%`}}/></div><button className="mt-4 text-xs font-bold text-slate-400 transition group-hover:text-white">Continue learning →</button></div>)}
      </div>
    </section>

    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass rounded-[28px] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-black">Focus next</h2><p className="mt-1 text-xs text-slate-500">AI-selected from your recent attempts</p></div><BrainCircuit size={20} className="text-violet-300"/></div><div className="mt-5 space-y-3">{weakTopics.map(t => <div key={t.name} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[.025] p-4"><ProgressRing value={t.progress} size={54}/><div className="min-w-0 flex-1"><div className="font-bold">{t.name}</div><div className="mt-1 text-xs text-slate-500">{t.subject} · {t.action}</div></div><ArrowRight size={16} className="text-slate-600"/></div>)}</div></section>
      <section className="glass rounded-[28px] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-black">Recent tests</h2><p className="mt-1 text-xs text-slate-500">A snapshot of your latest performance</p></div><Link to="/analytics" className="text-xs font-bold text-violet-300">Analytics</Link></div><div className="mt-5 space-y-3">{recentTests.map(t => <div key={t.title} className="flex items-center gap-4 rounded-2xl bg-white/[.025] p-4"><div className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><ClipboardIcon/></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold">{t.title}</div><div className="mt-1 text-xs text-slate-500">{t.subject} · {t.date}</div></div><div className="text-right"><div className="font-black">{t.score}%</div><div className="text-[10px] text-slate-600">score</div></div></div>)}</div></section>
    </div>
  </div>;
}
function ClipboardIcon(){ return <CheckCircle2 size={18}/> }
