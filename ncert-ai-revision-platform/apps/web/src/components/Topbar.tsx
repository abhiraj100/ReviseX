import { Bell, Menu, Search, UserRound } from "lucide-react";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07101d]/80 backdrop-blur-xl">
    <div className="flex h-18 items-center gap-3 px-4 sm:px-6 lg:px-8">
      <button onClick={onMenu} className="lg:hidden rounded-xl border border-white/10 p-2 text-slate-300"><Menu size={20}/></button>
      <div className="hidden md:flex max-w-xl flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] px-4 py-2.5">
        <Search size={18} className="text-slate-500"/><input placeholder="Search chapters, topics, questions..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"/>
        <kbd className="hidden xl:block rounded-lg border border-white/10 px-2 py-1 text-[10px] text-slate-500">⌘ K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-slate-400 hover:text-white"><Bell size={18}/></button>
        <div className="ml-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-2 py-1.5">
          <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-black">DS</div>
          <div className="hidden sm:block pr-2"><div className="text-xs font-bold">Demo Student</div><div className="text-[10px] text-slate-500">Class 11 · Science</div></div>
          <UserRound size={15} className="text-slate-500 sm:hidden"/>
        </div>
      </div>
    </div>
  </header>;
}
