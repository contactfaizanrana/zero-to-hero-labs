import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// Initialize the secure cloud database bridge
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  // Query live table records (ordered by newest first)
  const { data: logs, error } = await supabase
    .from('system_logs')
    .select('*')
    .order('id', { ascending: false });

  // Next.js Server Action to safely send your form data straight to Singapore
  async function injectLog(formData: FormData) {
    'use server';
    
    const message = formData.get('message') as string;
    const level = formData.get('level') as string;
    const service = formData.get('service') as string;

    if (!message) return;

    // Insert the new row into the cloud database
    await supabase.from('system_logs').insert([
      { level, message, service }
    ]);

    // Force the page to refresh its server data instantly
    revalidatePath('/');
  }

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

      {/* New Feature: Interactive Cloud Data Injector Form */}
      <section className="bg-[#151B2C] border border-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 font-mono flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          Execute Cloud Log Injection
        </h2>
        <form action={injectLog} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Log Level</label>
            <select name="level" className="w-full bg-[#0F1422] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500">
              <option value="INFO">INFO</option>
              <option value="READY">READY</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="WARN">WARN</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Target Node/Service</label>
            <select name="service" className="w-full bg-[#0F1422] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500">
              <option value="Next.js">Next.js</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Tailwind">Tailwind</option>
              <option value="Supabase">Supabase</option>
            </select>
          </div>
          <div className="md:col-span-2 flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Telemetry Payload Message</label>
              <input 
                required
                type="text" 
                name="message" 
                placeholder="Enter custom telemetry string..." 
                className="w-full bg-[#0F1422] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold px-5 py-2 rounded-lg transition-colors h-[34px]">
              Execute Run
            </button>
          </div>
        </form>
      </section>

      {/* Dynamic Console/Logs Section powered by Supabase */}
      <section className="bg-[#0F1422] border border-slate-800 rounded-xl p-6 font-mono">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Cloud Database Logs
        </h2>
        <div className="space-y-2 text-xs text-slate-400 bg-black/30 p-4 rounded-lg border border-slate-900 overflow-x-auto max-h-[300px] overflow-y-auto">
          {error && <p className="text-red-400">[ERROR] Failed to stream telemetry clusters from Supabase backend.</p>}
          
          {logs && logs.map((log) => {
            let levelColor = "text-blue-400";
            if (log.level === "READY") levelColor = "text-indigo-400";
            if (log.level === "SUCCESS") levelColor = "text-emerald-400";
            if (log.level === "WARN") levelColor = "text-amber-400";

            return (
              <p key={log.id} className="transition-all duration-300 hover:bg-slate-800/30 py-0.5 px-1 rounded flex gap-2">
                <span className={levelColor}>[{log.level}]</span>{" "}
                <span className="text-slate-500">
                  {new Date(log.created_at).toISOString().replace('T', ' ').substring(0, 19)}
                </span>{" "}
                <span className="text-slate-400">[{log.service}]</span>
                <span className="text-slate-200">- {log.message}</span>
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