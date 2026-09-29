export function ProgressRing({ value, size = 72 }: { value: number; size?: number }) {
  const radius = 30, circumference = 2 * Math.PI * radius, dash = circumference - (value / 100) * circumference;
  return <div className="relative" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 72 72" className="-rotate-90">
      <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(148,163,184,.12)" strokeWidth="7"/>
      <circle cx="36" cy="36" r={radius} fill="none" stroke="url(#ring)" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dash}/>
      <defs><linearGradient id="ring"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
    </svg>
    <div className="absolute inset-0 grid place-items-center text-sm font-black">{value}%</div>
  </div>;
}
