'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, MapPin, Wrench, ShieldCheck, CheckCircle2, Calendar, Phone } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  category?: string;
  service_category?: string;
  location: string;
  base_price: number;
  rating: number;
  experience_years: number;
  verified: boolean;
  image_url?: string;
  skills?: string[];
  availability_days?: string[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
      <span className="text-xs font-bold text-slate-800">{rating}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse space-y-4">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-slate-200 rounded w-1/2" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>
      </div>
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="h-8 bg-slate-200 rounded-xl" />
    </div>
  );
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/providers')
      .then((res) => setProviders(res.data))
      .catch((err) => console.error('Error fetching providers:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
            SERVICE NETWORK
          </p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Verified Service Providers
          </h1>
          <p className="text-slate-500 mt-1 text-sm max-w-xl">
            Professionals evaluated by skill compatibility, proximity, verified background, and
            community ratings.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm self-start md:self-auto">
          {providers.length} Registered Providers
        </span>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {!loading && providers.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            No service providers currently registered.
          </div>
        )}

        {!loading &&
          providers.map((prov) => {
            const categoryName = prov.category || prov.service_category || 'General Service';
            return (
              <div
                key={prov.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between gap-5 group"
              >
                <div className="space-y-4">
                  {/* Top: Avatar, Name, Verification */}
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        prov.image_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(prov.name)}&background=random`
                      }
                      alt={prov.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-base font-bold text-slate-900 truncate">{prov.name}</h2>
                        {prov.verified && (
                          <ShieldCheck
                            className="w-4 h-4 text-indigo-600 shrink-0"
                            title="Verified Provider"
                          />
                        )}
                      </div>
                      <p className="text-xs text-indigo-600 font-semibold">{categoryName}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={prov.rating} />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {prov.experience_years} yrs exp
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Location */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Base Price:</span>
                      <p className="text-sm font-black text-slate-900 mt-0.5">₹{prov.base_price}/mo</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Operating Out Of:</span>
                      <p className="text-xs font-bold text-slate-700 mt-0.5 flex items-center justify-end gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {prov.location}
                      </p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  {prov.skills && prov.skills.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Core Competencies
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {prov.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Availability */}
                  {prov.availability_days && prov.availability_days.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px]">
                        Available:{' '}
                        <strong className="text-slate-700">
                          {prov.availability_days.slice(0, 3).map((d) => d.slice(0, 3)).join(', ')}
                          {prov.availability_days.length > 3 ? '...' : ''}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href="/services/request"
                    className="flex-1 text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-2.5 px-3 rounded-xl transition border border-indigo-200"
                  >
                    Match with Request
                  </a>
                  <button
                    onClick={() => alert(`Direct dispatch for ${prov.name} is enabled in demo mode.`)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl transition"
                    title="Direct Contact"
                  >
                    Contact
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
