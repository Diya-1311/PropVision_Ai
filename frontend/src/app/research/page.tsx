'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CheckCircle2,
  Clock,
  Eye,
  Cpu,
  ChevronRight,
  BookOpen,
  Layers,
  BarChart4,
  ShieldCheck,
  Scale,
  BrainCircuit,
  Sliders,
} from 'lucide-react';

interface ResearchApiResponse {
  methodology: string;
  features: {
    property: string[];
    provider: string[];
  };
  evaluation_framework: Record<string, string>;
  implementation_status: Record<string, string>;
}

const pipelineSteps = [
  { label: 'User Preferences', icon: '👤', desc: 'Captures multidimensional criteria' },
  { label: 'Feature Extraction', icon: '🔍', desc: 'Normalizes budget, geo-distance & specs' },
  { label: 'Weighted Scoring', icon: '⚖️', desc: 'Deterministic multi-attribute utility model' },
  { label: 'Property Ranking', icon: '📊', desc: 'Descending compatibility ordering (0-100)' },
  { label: 'Explainability Engine', icon: '💡', desc: 'Generates transparent factor contributions' },
  { label: 'Recommendation', icon: '✅', desc: 'Actionable ranked cards with full breakdown' },
];

const whyExplainableFeatures = [
  {
    icon: Eye,
    title: 'Transparent Scoring',
    desc: 'Every single factor weight (e.g. Budget 30%, Location 25%) is visible to users and faculty rather than hidden in latent embeddings.',
  },
  {
    icon: Cpu,
    title: 'User-Understandable Explanations',
    desc: 'Outputs concrete human-readable justifications (e.g. "✓ Within budget", "✓ 1.4 km from society") so users understand the ranking.',
  },
  {
    icon: CheckCircle2,
    title: 'Deterministic & Reproducible',
    desc: 'The same search inputs guarantee identical scoring outputs every execution. Crucial for scientific evaluation and audits.',
  },
  {
    icon: BrainCircuit,
    title: 'No Black-Box Dependency',
    desc: 'Avoids costly LLM hallucination and API latency by using robust mathematical multi-criteria decision analysis (MCDA).',
  },
];

const propertyWeights = [
  { label: 'Budget Compatibility', weight: 30, color: 'bg-indigo-600' },
  { label: 'Location Match (Distance graph)', weight: 25, color: 'bg-emerald-500' },
  { label: 'Property Type Match', weight: 15, color: 'bg-violet-500' },
  { label: 'Carpet Area Preference', weight: 10, color: 'bg-amber-500' },
  { label: 'Bedrooms Configuration', weight: 10, color: 'bg-sky-500' },
  { label: 'Amenities Alignment', weight: 10, color: 'bg-pink-500' },
];

const providerWeights = [
  { label: 'Skill Match', weight: 25, color: 'bg-indigo-600' },
  { label: 'Proximity / Distance', weight: 20, color: 'bg-emerald-500' },
  { label: 'Calendar Availability', weight: 15, color: 'bg-violet-500' },
  { label: 'Community Rating', weight: 15, color: 'bg-amber-500' },
  { label: 'Experience Years', weight: 10, color: 'bg-sky-500' },
  { label: 'Price Compatibility', weight: 10, color: 'bg-pink-500' },
  { label: 'Verification Status', weight: 5, color: 'bg-slate-500' },
];

export default function ResearchPage() {
  const [data, setData] = useState<ResearchApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/research/metrics')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching research metrics:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Methodology & Evaluation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Research &amp; Evaluation Dashboard
          </h1>
          <p className="text-slate-500 mt-1 text-sm max-w-2xl">
            Formal architectural framework for explainable smart housing recommendations and
            society-level demand aggregation.
          </p>
        </div>

        <span className="text-xs font-bold bg-white border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full shadow-sm self-start md:self-auto">
          Protocol: Multi-Factor MCDA
        </span>
      </div>

      {/* SECTION 1: Methodology Pipeline Architecture */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Recommendation Pipeline Architecture</h2>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Transparent Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.label}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between text-center relative group hover:bg-indigo-50/50 hover:border-indigo-200 transition"
            >
              <div>
                <span className="text-2xl mb-2 block">{step.icon}</span>
                <p className="text-xs font-bold text-slate-900 mb-1">{step.label}</p>
                <p className="text-[11px] text-slate-500 leading-snug">{step.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-bold text-indigo-600">
                Phase 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Two Columns - Feature Weights */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Left: Property Recommender Model */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-600" />
              Property Scoring Weights (100%)
            </h3>
            <span className="text-xs font-semibold text-slate-400">Deterministic</span>
          </div>

          <p className="text-xs text-slate-500">
            Linear additive utility scoring combining continuous budget compatibility, submarket
            distance indices, and exact spec criteria.
          </p>

          <div className="space-y-3 pt-2">
            {propertyWeights.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900 font-bold">{item.weight}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.weight * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Provider Matching Model */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Provider Matching Weights (100%)
            </h3>
            <span className="text-xs font-semibold text-slate-400">7 Dimensions</span>
          </div>

          <p className="text-xs text-slate-500">
            Multi-factor compatibility balancing skill taxonomy, physical proximity to the residential
            society, availability calendar, and community reputation.
          </p>

          <div className="space-y-3 pt-2">
            {providerWeights.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900 font-bold">{item.weight}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.weight * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Evaluation Framework */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Academic Evaluation Framework</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Metrics defined for empirical assessment during user research trials.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Standard IR Benchmarks
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data?.evaluation_framework &&
            Object.entries(data.evaluation_framework).map(([metric, val]) => {
              const isPending = val.toLowerCase().includes('pending');
              return (
                <div
                  key={metric}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <p className="text-xs font-semibold text-slate-500">{metric}</p>
                  <div className="my-2">
                    <p
                      className={`text-lg font-extrabold ${
                        isPending ? 'text-slate-400 font-medium' : 'text-indigo-600'
                      }`}
                    >
                      {val}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block self-start ${
                      isPending
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isPending ? 'Protocol Defined' : 'Simulated Baseline'}
                  </span>
                </div>
              );
            })}
        </div>
      </section>

      {/* SECTION 4: Why Explainable Recommendations? */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Why Explainable Recommendations?</h2>
          <p className="text-xs text-slate-500">
            Overcoming the critical limitations of opaque neural embeddings in high-stakes housing
            decisions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyExplainableFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Current Prototype Status */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Current Prototype Implementation Status</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified operational capabilities demonstrated in this live system evaluation.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Live MVP Active
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.implementation_status &&
            Object.entries(data.implementation_status).map(([module, status]) => {
              const isImplemented = status === 'IMPLEMENTED';
              return (
                <div
                  key={module}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/70"
                >
                  <div className="flex items-center gap-2.5">
                    {isImplemented ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-slate-800">{module}</span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isImplemented
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
