'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AIRecommendationExplanation from '@/components/AIRecommendationExplanation';
import {
  Wrench,
  Loader2,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  experience_years: number;
  base_price: number;
  verified: boolean;
  skills: string[];
  availability_days: string[];
  image_url: string;
}

interface FeatureScore {
  score: number;
  max: number;
  explanation: string;
}

interface RecommendedProvider {
  provider: ServiceProvider;
  score: number;
  feature_scores: Record<string, FeatureScore>;
  explanation: string[];
}

const loadingMessages = [
  'Evaluating provider skill vectors...',
  'Calculating distance matrix from society...',
  'Verifying calendar availability...',
  'Synthesizing multi-factor recommendation score...',
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ServiceRequestPage() {
  const [formData, setFormData] = useState({
    society_id: 'soc-1',
    service_category: 'Home Cleaning',
    required_date: '2026-10-01',
    preferred_days: ['Tuesday', 'Friday'],
    budget: 1500,
    frequency: 'Twice a week',
    location: 'Gota',
    additional_requirements: 'Standard & deep home cleaning',
  });

  const [results, setResults] = useState<RecommendedProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Record<string, boolean>>({});
  const [hiredProvider, setHiredProvider] = useState<string | null>(null);

  const msgIdx = useRef(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      msgIdx.current = (msgIdx.current + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIdx.current]);
    }, 850);
    return () => clearInterval(interval);
  }, [loading]);

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.preferred_days.includes(day);
      if (exists) {
        return { ...prev, preferred_days: prev.preferred_days.filter((d) => d !== day) };
      }
      return { ...prev, preferred_days: [...prev.preferred_days, day] };
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    msgIdx.current = 0;
    setLoadingMsg(loadingMessages[0]);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recommend/providers', {
        ...formData,
        budget: Number(formData.budget),
      });
      setResults(response.data);
      if (response.data.length > 0) {
        setExpandedAnalysis({ [response.data[0].provider.id]: true });
      }
    } catch (err) {
      console.error('Error fetching provider matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnalysis = (provId: string) => {
    setExpandedAnalysis((prev) => ({ ...prev, [provId]: !prev[provId] }));
  };

  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm';
  const labelClass = 'block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5';

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7-Factor Algorithmic Matching</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Service Provider Matching
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Find verified household service providers ranked by skill, distance, availability, rating,
          and budget.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-base">Service Request Details</h2>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Resident Mode
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div>
              <label className={labelClass}>Service Category</label>
              <select
                value={formData.service_category}
                onChange={(e) => setFormData({ ...formData, service_category: e.target.value })}
                className={inputClass}
              >
                <option value="Home Cleaning">Home Cleaning</option>
                <option value="Plumber">Plumbing</option>
                <option value="Electrician">Electrician</option>
                <option value="Cook">Cook / Meal Prep</option>
                <option value="Gardener">Gardener</option>
                <option value="AC Technician">AC Technician</option>
                <option value="Driver">Driver</option>
              </select>
            </div>

            {/* Society & Locality */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Society Context</label>
                <select
                  value={formData.society_id}
                  onChange={(e) => setFormData({ ...formData, society_id: e.target.value })}
                  className={inputClass}
                >
                  <option value="soc-1">Green Valley</option>
                  <option value="soc-2">Bopal Orchids</option>
                  <option value="soc-3">Satellite Sunbird</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Locality</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Budget & Frequency */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Budget (₹ / mo)</label>
                <input
                  type="number"
                  step="100"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className={inputClass}
                >
                  <option value="Daily">Daily</option>
                  <option value="Twice a week">Twice a week</option>
                  <option value="Thrice a week">Thrice a week</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </div>

            {/* Preferred Days */}
            <div>
              <label className={labelClass}>Preferred Days</label>
              <div className="flex flex-wrap gap-1.5">
                {DAYS_OF_WEEK.map((day) => {
                  const selected = formData.preferred_days.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                        selected
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 px-4 font-semibold text-sm disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{loadingMsg}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Find Best Matches</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600">
            <p className="font-semibold text-slate-800 mb-0.5">Demo Matching Flow:</p>
            <p>
              Pre-configured for <strong>Home Cleaning</strong> in <strong>Gota</strong> (Budget: ₹1500/mo, Tue+Fri).
              Ranks local providers with 7-factor transparency.
            </p>
          </div>
        </div>

        {/* Results Panel (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Empty state */}
          {!loading && results.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Wrench className="w-8 h-8" />
              </div>
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-slate-900">Matching Engine Ready</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Click &quot;Find Best Matches&quot; to execute the multi-factor scoring model across local service providers.
                </p>
              </div>
              <button
                onClick={() => handleSubmit()}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-emerald-700 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Find Matches for Home Cleaning
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {loading && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-900">{loadingMsg}</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Weighting skill compatibility, distance, verified status, and pricing...
                  </p>
                </div>
              </div>

              {[1, 2].map((n) => (
                <div key={n} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-slate-200 rounded w-1/3" />
                      <div className="h-4 bg-slate-200 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ranked Providers List */}
          {!loading && results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Ranked Matches ({results.length} Providers Found)
                  </p>
                  <h2 className="text-lg font-bold text-slate-900">Recommended Service Partners</h2>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                  Evaluated Against 7 Dimensions
                </span>
              </div>

              {results.map((rec, idx) => {
                const { provider, score, feature_scores, explanation } = rec;
                const isExpanded = !!expandedAnalysis[provider.id];
                const isHired = hiredProvider === provider.id;

                return (
                  <div
                    key={provider.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        {/* Avatar & Info */}
                        <div className="flex items-start gap-4">
                          <img
                            src={provider.image_url}
                            alt={provider.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-slate-900">{provider.name}</h3>
                              {provider.verified && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  Verified
                                </span>
                              )}
                              {idx === 0 && (
                                <span className="bg-amber-400 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                                  BEST MATCH
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-slate-500 font-medium mt-0.5">
                              {provider.category} · {provider.experience_years} Years Experience
                            </p>

                            {/* Badges row */}
                            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                              <span className="inline-flex items-center gap-1 font-bold text-slate-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                {provider.rating} Rating
                              </span>
                              <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {provider.location}
                              </span>
                              <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                                ₹{provider.base_price}/mo
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Prominent Match Score */}
                        <div className="shrink-0 self-end sm:self-start">
                          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 text-center min-w-24">
                            <span className="text-2xl font-black text-emerald-600">{score}%</span>
                            <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                              AI MATCH
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Explanation Chips */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Why Recommended:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {explanation.map((exp, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <button
                          onClick={() => toggleAnalysis(provider.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-xl"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Factor Breakdown</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>View AI Breakdown</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setHiredProvider(provider.id);
                              alert(`Booking request dispatched to ${provider.name}!`);
                            }}
                            className={`text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm ${
                              isHired
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {isHired ? '✓ Hired & Dispatched' : 'Hire Provider'}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Explanation Panel */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                          <AIRecommendationExplanation
                            score={score}
                            featureScores={feature_scores}
                            explanations={explanation}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
