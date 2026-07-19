import { createClient } from '@supabase/supabase-js';

// Force Next.js to fetch fresh database records on every single page load
export const dynamic = 'force-dynamic';

// Initialize the secure cloud database bridge
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  // Query our live table records directly from the AWS cloud infrastructure
  const { data: logs, error } = await supabase
    .from('system_logs')
    .select('*')
    .order('id', { ascending: true });

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
        <div className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Automation Engine</p>
          <p className="text-3xl font-bold mt-2 font-mono text-blue-400">n8n_Active</p>
          <div className="text-xs text-slate-500 mt-2 flex justify-between">
            <span>Active Workflows: 4</span>
            <span className="text-emerald-400">100% Success Rate</span>
          </div>
        </div>

        <div className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Data Stream Metrics</p>
          <p className="text-3xl font-bold mt-2 font-mono text-indigo-400">14.2k <span className="text-lg font-normal text-slate-400">/req</span></p>
          <div className="text-xs text-slate-500 mt-2 flex justify-between">
            <span>Python Script Node</span>
            <span className="text-slate-400">Latency: 24ms</span>
          </div>
        </div>

        <div className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Infrastructure Security</p>
          <p className="text-3xl font-bold mt-2 font-mono text-emerald-400">Hardened</p>
          <div className="text-xs text-slate-500 mt-2 flex justify-between">
            <span>SSL Protocols</span>
            <span className="text-emerald-400">0 Threat Anomalies</span>
          </div>
        </div>
      </section>

      {/* Dynamic Console/Logs Section powered by Supabase */}
      <section className="bg-[#0F1422] border border-slate-800 rounded-xl p-6 font-mono">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Cloud Database Logs
        </h2>
        <div className="space-y-2 text-xs text-slate-400 bg-black/30 p-4 rounded-lg border border-slate-900 overflow-x-auto">
          {error && <p className="text-red-400">[ERROR] Failed to stream telemetry clusters from Supabase backend.</p>}
          
          {logs && logs.map((log) => {
            // Dynamic color assignment matching database log levels
            let levelColor = "text-blue-400";
            if (log.level === "READY") levelColor = "text-indigo-400";
            if (log.level === "SUCCESS") levelColor = "text-emerald-400";
            if (log.level === "WARN") levelColor = "text-amber-400";

            return (
              <p key={log.id} className="transition-all duration-300 hover:bg-slate-800/30 py-0.5 px-1 rounded">
                <span className={levelColor}>[{log.level}]</span>{" "}
                <span className="text-slate-500">
                  {new Date(log.created_at).toISOString().replace('T', ' ').substring(0, 19)}
                </span>{" "}
                - <span className="text-slate-200">{log.message}</span>
              </p>
            );
          })}

          {logs && logs.length === 0 && (
            <p className="text-slate-500">[EMPTY] Cloud records compiled but no log entries were found.</p>
          )}
        </div>
      </section>
    </main>
  );
}