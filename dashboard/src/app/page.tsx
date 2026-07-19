export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-100 p-8 font-sans">
      {/* Header Section */}
      <header className="border-b border-slate-800 pb-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            SaaS Operations Command Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            System status: <span className="text-emerald-400 font-medium">Fully Operational</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">LIVE_LOG_STREAM: ACTIVE</span>
        </div>
      </header>

      {/* Grid Layout for Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Automation Engine</p>
          <p className="text-3xl font-bold mt-2 font-mono text-blue-400">n8n_Active</p>
          <div className="text-xs text-slate-500 mt-2 flex justify-between">
            <span>Active Workflows: 4</span>
            <span className="text-emerald-400">100% Success Rate</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Data Stream Metrics</p>
          <p className="text-3xl font-bold mt-2 font-mono text-indigo-400">14.2k <span className="text-lg font-normal text-slate-400">/req</span></p>
          <div className="text-xs text-slate-500 mt-2 flex justify-between">
            <span>Python Script Node</span>
            <span className="text-slate-400">Latency: 24ms</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Infrastructure Security</p>
          <p className="text-3xl font-bold mt-2 font-mono text-emerald-400">Hardened</p>
          <div className="text-xs text-slate-500 mt-2 flex justify-between">
            <span>SSL Protocols</span>
            <span className="text-emerald-400">0 Threat Anomalies</span>
          </div>
        </div>
      </section>

      {/* Console/Logs Section */}
      <section className="bg-[#0F1422] border border-slate-800 rounded-xl p-6 font-mono">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          System Initialization Logs
        </h2>
        <div className="space-y-2 text-xs text-slate-400 bg-black/30 p-4 rounded-lg border border-slate-900 overflow-x-auto">
          <p><span className="text-blue-400">[INFO]</span> 2026-07-19 16:57:36 - Bootstrapping Next.js production shell...</p>
          <p><span className="text-indigo-400">[READY]</span> Loaded TypeScript configuration engine successfully.</p>
          <p><span className="text-emerald-400">[SUCCESS]</span> Global styles mapped with Tailwind CSS utility modules.</p>
          <p><span className="text-amber-400">[WARN]</span> Database link pending: Supabase connection layer uninitialized.</p>
        </div>
      </section>
    </main>
  );
}
