'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Zap,
  PiggyBank,
  TrendingDown,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Building2,
  Tag,
  CheckCircle2,
} from 'lucide-react';

interface ServiceDemand {
  service_category: string;
  households_interested: number;
  current_avg_price: number;
  potential_group_price: number;
  estimated_savings_percentage: number;
}

interface DemandResponse {
  society_id: string;
  society_name: string;
  demands: ServiceDemand[];
}

export default function SocietyDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [demandData, setDemandData] = useState<DemandResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://127.0.0.1:8000/api/societies/${id}/demand`)
      .then((res) => setDemandData(res.data))
      .catch((err) => console.error('Error fetching society demand:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse py-6">
        <div className="h-8 bg-slate-200 rounded w-1/4" />
        <div className="h-28 bg-slate-200 rounded-2xl" />
        <div className="h-64 bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (!demandData) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
        <p className="text-slate-500">Society intelligence not found.</p>
        <Link
          href="/societies"
          className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Societies
        </Link>
      </div>
    );
  }

  const demands = demandData.demands || [];
  const maxDemand = Math.max(...demands.map((d) => d.households_interested), 20);
  const totalInterestedHouseholds = demands.reduce((acc, d) => acc + d.households_interested, 0);

  // Total monthly estimated community savings
  const totalMonthlySavings = demands.reduce((acc, d) => {
    const diff = d.current_avg_price - d.potential_group_price;
    return acc + diff * d.households_interested;
  }, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <div>
        <Link
          href="/societies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Societies</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Community Intelligence Platform</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {demandData.society_name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gota, Ahmedabad · Aggregated Household Service Demand Analysis
          </p>
        </div>

        <Link
          href="/society/deals"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition self-start md:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore Community Deals</span>
        </Link>
      </div>

      {/* Top Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Interested Households
              </p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">
                {totalInterestedHouseholds}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Categories
              </p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">{demands.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Est. Community Savings
              </p>
              <p className="text-2xl font-black text-emerald-600 mt-0.5">
                ₹{totalMonthlySavings.toLocaleString('en-IN')}/mo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregated Demand Analytics (Horizontal Bar Chart) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Aggregated Service Demand
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Live density of requests aggregated at the society level to trigger volume discounts.
            </p>
          </div>
          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full self-start sm:self-auto">
            Dynamic Demand Clustering
          </span>
        </div>

        {/* Visual Bar Chart Section */}
        <div className="space-y-6">
          {demands.map((demand, idx) => {
            const barWidth = Math.round((demand.households_interested / maxDemand) * 100);
            const isDealReady = demand.households_interested >= 10;

            return (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:bg-white hover:shadow-sm transition-all duration-200 space-y-3"
              >
                {/* Bar Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {demand.service_category}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      Standard: <span className="line-through">₹{demand.current_avg_price}</span>
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      Group: ₹{demand.potential_group_price}/mo
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <TrendingDown className="w-3 h-3" />
                      {demand.estimated_savings_percentage}% OFF
                    </span>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>
                      {demand.households_interested} Interested Households
                    </span>
                    <span>Threshold: 10 Households</span>
                  </div>

                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isDealReady ? 'bg-indigo-600' : 'bg-slate-400'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>

                {/* Bottom Callout / Action */}
                <div className="flex items-center justify-between pt-1">
                  {isDealReady ? (
                    <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Volume threshold satisfied — Community deal available</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">
                      Gathering additional resident interest (need {10 - demand.households_interested} more)
                    </span>
                  )}

                  {isDealReady && (
                    <Link
                      href="/society/deals"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      <span>Create Deal Opportunity</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Opportunity Callout */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-3 py-1 rounded-full">
              RESEARCH CONCEPT: DEMAND AGGREGATION
            </span>
            <h3 className="text-xl font-bold">How Community Deals Work</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of 18 individual households negotiating separate cleaning rates, PropVision AI
              aggregates neighborhood demand into a collective contract. Service providers reduce travel
              overhead and pass 20-30% volume discounts directly back to the society.
            </p>
          </div>

          <Link
            href="/society/deals"
            className="shrink-0 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition"
          >
            Launch Deal Engine →
          </Link>
        </div>
      </div>
    </div>
  );
}
