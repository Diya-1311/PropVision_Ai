'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AIRecommendationExplanation from '@/components/AIRecommendationExplanation';
import {
  Building2,
  MapPin,
  Loader2,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Scale,
  X,
  Check,
  ShieldCheck,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  property_type: string;
  area: number;
  bedrooms: number;
  amenities: string[];
  image_url: string;
}

interface FeatureScore {
  score: number;
  max: number;
  explanation: string;
}

interface RecommendedProperty {
  property: Property;
  score: number;
  feature_scores: Record<string, FeatureScore>;
  explanation: string[];
}

const loadingMessages = [
  'Analyzing property fit...',
  'Evaluating location...',
  'Comparing budget compatibility...',
  'Calculating explainable match score...',
];

const AHMEDABAD_LOCALITIES = [
  'Gota',
  'Chandkheda',
  'Bopal',
  'Thaltej',
  'SG Highway',
  'Satellite',
  'Prahlad Nagar',
  'Vastrapur',
];

export default function RecommendPage() {
  const [formData, setFormData] = useState({
    location: 'Gota',
    budget_min: 5000000,
    budget_max: 7000000,
    property_type: 'Apartment',
    bedrooms: 2,
    min_area: 1000,
    buy_or_rent: 'Buy',
    priorities: ['Location', 'Budget'],
  });

  const [results, setResults] = useState<RecommendedProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Record<string, boolean>>({});
  const [compareList, setCompareList] = useState<RecommendedProperty[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const msgIdx = useRef(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      msgIdx.current = (msgIdx.current + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIdx.current]);
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    msgIdx.current = 0;
    setLoadingMsg(loadingMessages[0]);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recommend/properties', {
        location: formData.location,
        budget_min: Number(formData.budget_min),
        budget_max: Number(formData.budget_max),
        property_type: formData.property_type,
        bedrooms: Number(formData.bedrooms),
        min_area: Number(formData.min_area),
        buy_or_rent: formData.buy_or_rent,
        amenities: [],
        priorities: formData.priorities,
      });
      setResults(response.data);
      // Auto expand first result analysis for quick demo
      if (response.data.length > 0) {
        setExpandedAnalysis({ [response.data[0].property.id]: true });
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnalysis = (propId: string) => {
    setExpandedAnalysis((prev) => ({ ...prev, [propId]: !prev[propId] }));
  };

  const toggleCompare = (rec: RecommendedProperty) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.property.id === rec.property.id);
      if (exists) {
        return prev.filter((p) => p.property.id !== rec.property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties at once.');
        return prev;
      }
      return [...prev, rec];
    });
  };

  const isCompared = (propId: string) => compareList.some((p) => p.property.id === propId);

  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm';
  const labelClass = 'block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5';

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Step Indicator */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Factor Deterministic Recommender</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Find My Ideal Property</h1>
            <p className="text-slate-500 text-sm mt-1">
              Transparent, explainable recommendation engine tailored to Ahmedabad communities.
            </p>
          </div>

          {/* Stepper Badge */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                01
              </span>
              <span>LOCATION</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">
                02
              </span>
              <span>BUDGET</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">
                03
              </span>
              <span>PREFS</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                04
              </span>
              <span>AI MATCH</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Form (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-base">Search Parameters</h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Ahmedabad Market</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location */}
            <div>
              <label className={labelClass}>Locality / Submarket</label>
              <div className="relative">
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={inputClass}
                >
                  {AHMEDABAD_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}, Ahmedabad
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className={labelClass}>Budget Range (₹)</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Min (₹ Lakhs)</span>
                  <input
                    type="number"
                    step="100000"
                    value={formData.budget_min}
                    onChange={(e) => setFormData({ ...formData, budget_min: Number(e.target.value) })}
                    className={inputClass}
                    placeholder="Min Budget"
                  />
                  <span className="text-[10px] text-indigo-600 font-semibold mt-0.5 block">
                    ₹{(formData.budget_min / 100000).toFixed(0)} Lakh
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Max (₹ Lakhs)</span>
                  <input
                    type="number"
                    step="100000"
                    value={formData.budget_max}
                    onChange={(e) => setFormData({ ...formData, budget_max: Number(e.target.value) })}
                    className={inputClass}
                    placeholder="Max Budget"
                  />
                  <span className="text-[10px] text-indigo-600 font-semibold mt-0.5 block">
                    ₹{(formData.budget_max / 100000).toFixed(0)} Lakh
                  </span>
                </div>
              </div>
            </div>

            {/* Bedrooms & Area */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className={inputClass}
                >
                  <option value={1}>1 BHK</option>
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4 BHK</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Min Area (sq.ft)</label>
                <input
                  type="number"
                  value={formData.min_area}
                  onChange={(e) => setFormData({ ...formData, min_area: Number(e.target.value) })}
                  className={inputClass}
                  placeholder="e.g. 1000"
                />
              </div>
            </div>

            {/* Property Type & Mode */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Property Type</label>
                <select
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  className={inputClass}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Purpose</label>
                <select
                  value={formData.buy_or_rent}
                  onChange={(e) => setFormData({ ...formData, buy_or_rent: e.target.value })}
                  className={inputClass}
                >
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>

            {/* Priorities */}
            <div>
              <label className={labelClass}>Primary Priority Weights</label>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200">
                  <Check className="w-3 h-3 text-indigo-600" /> Location (25%)
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" /> Budget (30%)
                </span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-indigo-600 text-white rounded-xl py-3 px-4 font-semibold text-sm hover:bg-indigo-700 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{loadingMsg}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Recommendations</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt quick trigger helper */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600">
            <p className="font-semibold text-slate-800 mb-1">Demo Quick Preset:</p>
            <p>
              Pre-configured for Gota, ₹50-70 Lakh, 2 BHK Apartment. Click the button to inspect the explainable scoring engine.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Recommendations (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Empty state */}
          {!loading && results.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8" />
              </div>
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-slate-900">Ready for Intelligence Matching</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Click &quot;Generate AI Recommendations&quot; to score and rank properties based on your multi-factor priorities.
                </p>
              </div>
              <button
                onClick={() => handleSubmit()}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Run Default Demo Search
              </button>
            </div>
          )}

          {/* Loading state skeleton cards */}
          {loading && (
            <div className="space-y-4">
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
                <div>
                  <p className="text-sm font-bold text-indigo-900">{loadingMsg}</p>
                  <p className="text-xs text-indigo-700 mt-0.5">
                    Executing multi-attribute utility calculation across Ahmedabad database...
                  </p>
                </div>
              </div>

              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4">
                  <div className="flex gap-4">
                    <div className="w-48 h-32 bg-slate-200 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-slate-200 rounded w-1/3" />
                      <div className="h-4 bg-slate-200 rounded w-1/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results List */}
          {!loading && results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Ranked Output ({results.length} Candidates)
                  </p>
                  <h2 className="text-lg font-bold text-slate-900">Highest Compatibility Matches</h2>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                  Sorted by Multi-Factor Score (0-100)
                </span>
              </div>

              {results.map((rec, idx) => {
                const { property, score, feature_scores, explanation } = rec;
                const isExpanded = !!expandedAnalysis[property.id];
                const compared = isCompared(property.id);

                return (
                  <div
                    key={property.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    {/* Top Row: Visual + Main Info */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Property Image Thumbnail */}
                        <div className="md:w-64 h-48 rounded-xl overflow-hidden relative shrink-0 bg-slate-100">
                          <img
                            src={property.image_url}
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              TOP AI MATCH
                            </span>
                          )}
                          <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                            {property.bedrooms} BHK · {property.property_type}
                          </span>
                        </div>

                        {/* Property Meta & Score */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                  {property.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                  <MapPin className="w-4 h-4 text-slate-400" />
                                  <span>{property.location}, Ahmedabad</span>
                                  <span>•</span>
                                  <span>{property.area} sq.ft</span>
                                </div>
                              </div>

                              {/* Prominent AI Match Score */}
                              <div className="text-right shrink-0">
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 text-center">
                                  <div className="flex items-baseline justify-center gap-0.5">
                                    <span className="text-2xl font-black text-emerald-600">{score}</span>
                                    <span className="text-xs font-bold text-emerald-600">%</span>
                                  </div>
                                  <p className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                                    AI MATCH
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Price Presentation */}
                            <div className="mt-3 flex items-baseline gap-2">
                              <span className="text-2xl font-extrabold text-slate-900">
                                ₹{(property.price / 100000).toFixed(1)} Lakhs
                              </span>
                              <span className="text-xs text-slate-400 font-medium">
                                (₹{property.price.toLocaleString('en-IN')})
                              </span>
                            </div>

                            {/* Compact Explanation Chips */}
                            <div className="mt-3">
                              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Why this property matches:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {explanation.slice(0, 4).map((exp, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full"
                                  >
                                    {exp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleCompare(rec)}
                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
                                  compared
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                <Scale className="w-3.5 h-3.5" />
                                {compared ? 'In Comparison' : 'Compare'}
                              </button>

                              <button
                                onClick={() => toggleAnalysis(property.id)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl"
                              >
                                {isExpanded ? (
                                  <>
                                    <span>Hide AI Analysis</span>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  </>
                                ) : (
                                  <>
                                    <span>View AI Analysis</span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Amenities summary */}
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <span>Amenities:</span>
                              <span className="font-medium text-slate-600">
                                {property.amenities.slice(0, 3).join(', ')}
                                {property.amenities.length > 3 ? ` +${property.amenities.length - 3}` : ''}
                              </span>
                            </div>
                          </div>
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

      {/* STICKY BOTTOM COMPARE BAR (When items are selected) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-6 animate-slideUp">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-semibold">
              {compareList.length} of 3 properties selected to compare
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCompareModal(true)}
              className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-indigo-500 transition shadow-sm"
            >
              Compare Properties Side-by-Side
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-slate-400 hover:text-white p-1 text-xs"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Property AI Comparison</h3>
                <p className="text-sm text-slate-500">
                  Compare multi-factor compatibility scores and features side-by-side.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 font-bold text-slate-400 text-xs uppercase tracking-wider w-40">
                      Attribute
                    </th>
                    {compareList.map((rec) => (
                      <th key={rec.property.id} className="py-3 px-4 min-w-[200px]">
                        <div className="font-bold text-base text-slate-900">{rec.property.name}</div>
                        <div className="text-xs text-slate-500">{rec.property.location}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* AI Match Score */}
                  <tr className="bg-emerald-50/50">
                    <td className="py-4 px-4 font-bold text-emerald-900">AI Match Score</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-lg font-black text-emerald-600 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-sm">
                          {rec.score}%
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Price</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 font-bold text-slate-900">
                        ₹{(rec.property.price / 100000).toFixed(1)} Lakhs
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Location</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 text-slate-700">
                        {rec.property.location}
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Configuration</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 text-slate-700">
                        {rec.property.bedrooms} BHK ({rec.property.property_type})
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Carpet Area</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 text-slate-700">
                        {rec.property.area} sq.ft
                      </td>
                    ))}
                  </tr>

                  {/* Budget Fit */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Budget Compatibility</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 text-slate-700">
                        {rec.feature_scores['Budget'] ? (
                          <span className="font-semibold text-slate-800">
                            {rec.feature_scores['Budget'].score} / {rec.feature_scores['Budget'].max}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Location Fit */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Location Compatibility</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 text-slate-700">
                        {rec.feature_scores['Location'] ? (
                          <span className="font-semibold text-slate-800">
                            {rec.feature_scores['Location'].score} / {rec.feature_scores['Location'].max}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Amenities */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Key Amenities</td>
                    {compareList.map((rec) => (
                      <td key={rec.property.id} className="py-3 px-4 text-xs text-slate-600">
                        {rec.property.amenities.join(', ')}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowCompareModal(false)}
                className="bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
