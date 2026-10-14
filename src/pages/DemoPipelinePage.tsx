import { useCallback, useEffect, useRef, useState } from "react";
import { PageMeta } from "../components/PageMeta";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  KeyRound,
  PhoneCall,
  RefreshCcw,
  UserCheck,
} from "lucide-react";

const KEY_STORAGE = "bb_demo_pipeline_vapi_key";
const POLL_MS = 5000;

type StructuredData = {
  caller_name?: string;
  callback_number?: string;
  issue_summary?: string;
  urgency?: string;
  service_area_ok?: string;
  booked_slot?: string;
  message_taken?: string;
};

type StructuredOutputEntry = {
  structuredOutputId?: string;
  output?: StructuredData;
  result?: StructuredData;
  data?: StructuredData;
  [key: string]: unknown;
};

type DemoCall = {
  id: string;
  createdAt: string;
  status?: string;
  endedReason?: string;
  summary?: string;
  transcript?: string;
  analysis?: { structuredData?: StructuredData };
  artifact?: { structuredOutputs?: StructuredOutputEntry[] };
};

const LEAD_OUTPUT_ID = "01ee4b95-e6af-442e-885b-610a2be5ec13";

type Stage = "new" | "qualified" | "booked";

function getStructured(call: DemoCall): StructuredData {
  const entries = call.artifact?.structuredOutputs;
  if (Array.isArray(entries) && entries.length > 0) {
    const entry =
      entries.find((e) => e.structuredOutputId === LEAD_OUTPUT_ID) ?? entries[0];
    const nested =
      (entry.output as StructuredData | undefined) ??
      (entry.result as StructuredData | undefined) ??
      (entry.data as StructuredData | undefined);
    if (nested && typeof nested === "object") return nested;
    const { structuredOutputId: _omit, ...rest } = entry;
    if (rest && typeof rest === "object" && ("urgency" in rest || "caller_name" in rest)) {
      return rest as StructuredData;
    }
  }
  return call.analysis?.structuredData ?? {};
}

function stageOf(call: DemoCall): Stage {
  const sd = getStructured(call);
  if (sd?.booked_slot && sd.booked_slot.trim()) return "booked";
  if (sd && (sd.issue_summary || sd.urgency)) return "qualified";
  return "new";
}

function timeAgo(iso: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const STAGES: { key: Stage; title: string; icon: typeof PhoneCall; hint: string }[] = [
  { key: "new", title: "New Lead", icon: PhoneCall, hint: "Call just ended — details landing" },
  { key: "qualified", title: "Qualified", icon: UserCheck, hint: "Issue captured, urgency judged" },
  { key: "booked", title: "Booked", icon: CalendarCheck, hint: "Slot agreed, ready for handoff" },
];

function LeadCard({ call, fresh }: { call: DemoCall; fresh: boolean }) {
  const sd = getStructured(call);
  const name = sd.caller_name?.trim() || "Unknown caller";
  const urgent = (sd.urgency || "").toLowerCase() === "emergency";
  const transcript = (call.transcript || "").replace(/\s+/g, " ").trim();
  return (
    <article className={`demo-lead-card${fresh ? " is-fresh" : ""}${urgent ? " is-urgent" : ""}`}>
      <div className="demo-lead-top">
        <strong>{name}</strong>
        {urgent ? (
          <span className="demo-badge demo-badge-urgent">Emergency</span>
        ) : sd.urgency ? (
          <span className="demo-badge">Standard</span>
        ) : null}
      </div>
      {sd.callback_number ? <p className="demo-lead-line">{sd.callback_number}</p> : null}
      {sd.issue_summary ? (
        <p className="demo-lead-issue">“{sd.issue_summary}”</p>
      ) : (
        <p className="demo-lead-line demo-lead-muted">Analysis landing…</p>
      )}
      {sd.booked_slot ? (
        <p className="demo-lead-slot">
          <CalendarCheck size={15} /> {sd.booked_slot}
        </p>
      ) : null}
      {sd.message_taken === "yes" ? (
        <p className="demo-lead-line">Callback message taken</p>
      ) : null}
      {call.summary ? <p className="demo-lead-summary">{call.summary}</p> : null}
      {transcript ? (
        <details className="demo-lead-transcript">
          <summary>Transcript</summary>
          <p>{transcript.slice(0, 900)}{transcript.length > 900 ? "…" : ""}</p>
        </details>
      ) : null}
      <p className="demo-lead-time">
        <Clock3 size={13} /> {timeAgo(call.createdAt)}
      </p>
    </article>
  );
}

export function DemoPipelinePage() {
  const [apiKey, setApiKey] = useState<string | null>(() =>
    typeof localStorage !== "undefined" ? localStorage.getItem(KEY_STORAGE) : null
  );
  const [keyInput, setKeyInput] = useState("");
  const [calls, setCalls] = useState<DemoCall[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const latestId = useRef<string | null>(null);
  const [freshId, setFreshId] = useState<string | null>(null);

  const fetchCalls = useCallback(async (key: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      // Same-origin proxy: some phones/networks can't reach api.vapi.ai
      // directly, so the edge function forwards the request to Vapi.
      const res = await fetch("/api/demo-calls", {
        headers: { "x-vapi-key": key },
        signal: controller.signal,
      });
      const data = (await res.json()) as DemoCall[] | { error?: string };
      if (!res.ok) {
        const message =
          typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
            ? data.error
            : `Request failed (${res.status}). Trying again…`;
        throw new Error(message);
      }
      const list = data as DemoCall[];
      return Array.isArray(list) ? list : [];
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw new Error("The request timed out. Check your connection and try again.");
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }, []);

  const refresh = useCallback(
    async (key: string, silent: boolean) => {
      if (!silent) setLoading(true);
      try {
        const data = await fetchCalls(key);
        setCalls(data);
        setError(null);
        setLastUpdated(new Date());
        if (data.length > 0) {
          const newest = data[0].id;
          if (latestId.current && newest !== latestId.current) setFreshId(newest);
          latestId.current = newest;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not reach Vapi.");
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [fetchCalls]
  );

  useEffect(() => {
    if (!apiKey) return;
    refresh(apiKey, false);
    const timer = setInterval(() => refresh(apiKey, true), POLL_MS);
    return () => clearInterval(timer);
  }, [apiKey, refresh]);

  useEffect(() => {
    if (!freshId) return;
    const timer = setTimeout(() => setFreshId(null), 12000);
    return () => clearTimeout(timer);
  }, [freshId]);

  const saveKey = () => {
    const key = keyInput.trim();
    if (!key) return;
    localStorage.setItem(KEY_STORAGE, key);
    latestId.current = null;
    setApiKey(key);
    setKeyInput("");
  };

  const clearKey = () => {
    localStorage.removeItem(KEY_STORAGE);
    setApiKey(null);
    setCalls([]);
    setError(null);
  };

  const grouped = (stage: Stage) => calls.filter((c) => stageOf(c) === stage);

  return (
    <>
      <PageMeta
        path="/demo-pipeline"
        title="Live Demo Pipeline | Backend Brilliance"
        description="Watch demo calls to the FlowRight Plumbing line land in the pipeline in real time — qualified, booked, and handed off."
      />
      <div className="vertical-page vertical-page--home demo-pipeline">
        <header className="vertical-header">
          <a className="vertical-brand" href="/" aria-label="Backend Brilliance home">
            <img src="/backend-brilliance-logo.png" alt="" />
            <span>
              <strong>Backend</strong>
              <strong>Brilliance</strong>
            </span>
          </a>
          <span className="demo-live-pill">
            <span className="demo-live-dot" aria-hidden="true" />
            Live demo pipeline
          </span>
        </header>

        <main className="section-shell">
          <div className="demo-pipeline-intro">
            <p className="vertical-eyebrow">FlowRight Plumbing — sample business</p>
            <h1>Every demo call, live in the pipeline.</h1>
            <p className="vertical-subheading">
              Call the Olivia demo line at{" "}
              <a href="tel:+13049317167">(304) 931-7167</a>, then watch the lead
              land here — qualified, booked, and handed off with the full
              conversation. This is exactly what your CRM would show.
            </p>
          </div>

          {!apiKey ? (
            <div className="demo-key-card">
              <KeyRound size={28} />
              <h2>Connect your Vapi key</h2>
              <p>
                This board reads live calls from your Vapi account. Paste your
                key once — it stays in this browser only, never on our servers.
                Find it at dashboard.vapi.ai → API Keys.
              </p>
              <div className="demo-key-row">
                <input
                  type="password"
                  placeholder="Vapi API key"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveKey()}
                  aria-label="Vapi API key"
                />
                <button className="button button-primary" onClick={saveKey}>
                  Connect<ArrowRight size={18} />
                </button>
              </div>
              {error ? <p className="demo-error">{error}</p> : null}
            </div>
          ) : (
            <>
              <div className="demo-statusbar">
                <span className="demo-statusbar-item">
                  <RefreshCcw size={15} className={loading ? "demo-spin" : ""} />
                  {error
                    ? "Couldn't reach Vapi — see below"
                    : lastUpdated
                      ? `Updated ${lastUpdated.toLocaleTimeString()}`
                      : "Connecting…"}
                </span>
                <span className="demo-statusbar-item demo-statusbar-muted">
                  Auto-refreshes every 5s
                </span>
                <button className="demo-clear-key" onClick={clearKey}>
                  Disconnect key
                </button>
              </div>
              {error ? <p className="demo-error">{error}</p> : null}
              {calls.length === 0 && !error ? (
                <p className="demo-empty">
                  {loading ? "Loading calls…" : "No calls yet — dial the demo line to make one appear."}
                </p>
              ) : (
                <div className="demo-board">
                  {STAGES.map(({ key, title, icon: Icon, hint }) => {
                    const list = grouped(key);
                    return (
                      <section className="demo-column" key={key} aria-label={title}>
                        <div className="demo-column-head">
                          <span className="demo-column-icon">
                            <Icon size={18} />
                          </span>
                          <div>
                            <h2>
                              {title} <span className="demo-count">{list.length}</span>
                            </h2>
                            <p>{hint}</p>
                          </div>
                        </div>
                        <div className="demo-column-cards">
                          {list.length === 0 ? (
                            <p className="demo-column-empty">Nothing here yet</p>
                          ) : (
                            list.map((call) => (
                              <LeadCard key={call.id} call={call} fresh={call.id === freshId} />
                            ))
                          )}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
