'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MapPin, Users, ShoppingBag, TrendingUp, ArrowRight, Building2, Flame } from 'lucide-react';

interface Society {
  id: string;
  name: string;
  location: string;
  residents_count: number;
  amenities: string[];
  active_service_requests: number;
  community_deals_count: number;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse space-y-4">
      <div className="h-5 bg-slate-200 rounded w-1/2" />
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-16 bg-slate-100 rounded-xl" />
      <div className="h-9 bg-slate-200 rounded-xl" />
    </div>
  );
}

export default function SocietiesPage() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/societies')
      .then((res) => setSocieties(res.data))
      .catch((err) => console.error('Error fetching societies:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          COMMUNITY INTELLIGENCE
        </p>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Understand what residents need
        </h1>
        <p className="text-slate-500 mt-1 text-sm max-w-2xl">
          Understand what residents need before demand becomes a problem. Monitor aggregated requests
          across societies to identify bulk service opportunities.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {!loading && societies.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            No societies found in database.
          </div>
        )}

        {!loading &&
          societies.map((society) => {
            const isHighDemand = society.active_service_requests >= 10;
            const demandPercentage = Math.min(
              100,
              Math.round((society.active_service_requests / 25) * 100)
            );

            return (
              <div
                key={society.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between gap-5 group"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                        {society.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {society.location}, Ahmedabad
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                        isHighDemand
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {isHighDemand ? (
                        <>
                          <Flame className="w-3 h-3 text-amber-500" />
                          High Demand
                        </>
                      ) : (
                        'Active'
                      )}
                    </span>
                  </div>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Residents</p>
                      <p className="text-base font-extrabold text-slate-900 mt-0.5">
                        {society.residents_count}
                      </p>
                    </div>

                    <div className="text-center border-x border-slate-200/60">
                      <p className="text-xs text-slate-400">Requests</p>
                      <p className="text-base font-extrabold text-indigo-600 mt-0.5">
                        {society.active_service_requests}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-slate-400">Deals</p>
                      <p className="text-base font-extrabold text-amber-600 mt-0.5">
                        {society.community_deals_count}
                      </p>
                    </div>
                  </div>

                  {/* Demand Intensity Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Demand Intensity
                      </span>
                      <span className="font-bold text-slate-700">{demandPercentage}%</span>
                    </div>
                    <div className="bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          demandPercentage > 60 ? 'bg-amber-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${demandPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Amenities Tags */}
                  {society.amenities && society.amenities.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {society.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Link */}
                <Link
                  href={`/societies/${society.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition border border-indigo-200"
                >
                  <span>View Society Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
