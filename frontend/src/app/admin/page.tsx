'use client';

import { useState } from 'react';
import {
  Building2,
  Users,
  Wrench,
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Tag,
  Star,
  Settings,
} from 'lucide-react';

interface AdminProvider {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  verified: boolean;
}

const initialProviders: AdminProvider[] = [
  { id: 'prov-1', name: 'Ramesh Kumar', category: 'Home Cleaning', location: 'Gota', rating: 4.8, verified: true },
  { id: 'prov-2', name: 'Suresh Patel', category: 'Home Cleaning', location: 'Chandkheda', rating: 4.2, verified: false },
  { id: 'prov-3', name: 'CleanCare Services', category: 'Home Cleaning', location: 'SG Highway', rating: 4.9, verified: true },
  { id: 'prov-4', name: 'Mahesh Plumbers', category: 'Plumber', location: 'Bopal', rating: 4.5, verified: true },
  { id: 'prov-8', name: 'CoolAir Tech', category: 'AC Technician', location: 'Thaltej', rating: 4.3, verified: false },
  { id: 'prov-10', name: 'Vijay Cleaners', category: 'Home Cleaning', location: 'Bopal', rating: 4.1, verified: false },
];

export default function AdminPage() {
  const [providers, setProviders] = useState<AdminProvider[]>(initialProviders);

  const toggleVerification = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p))
    );
  };

  const stats = [
    { label: 'Properties Tracked', value: '10', icon: Building2, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Societies Active', value: '5', icon: Users, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Registered Providers', value: '10', icon: Wrench, color: 'bg-violet-50 text-violet-600' },
    { label: 'Service Requests', value: '25+', icon: FileText, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Platform Governance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Administration &amp; Verification
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Ecosystem oversight: monitor platform statistics, approve service partners, and view demand.
          </p>
        </div>
        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-full self-start md:self-auto">
          Demo Supervisor Mode
        </span>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Provider Verification Control Table */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Provider Verification Management</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified providers earn +5% bonus in the AI multi-factor recommendation algorithm.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {providers.filter((p) => p.verified).length} Verified ·{' '}
            {providers.filter((p) => !p.verified).length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Locality</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {providers.map((prov) => (
                <tr key={prov.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{prov.name}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium text-xs">{prov.category}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{prov.location}</td>
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-700">⭐ {prov.rating}</td>
                  <td className="py-3.5 px-4">
                    {prov.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3 text-amber-500" />
                        Unverified
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleVerification(prov.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
                        prov.verified
                          ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {prov.verified ? 'Revoke Status' : 'Mark Verified'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Note about Research Scope */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600">
        <p className="font-bold text-slate-800 mb-1">Research Prototype Boundary:</p>
        <p>
          In this MVP, authentication and authorization are streamlined via demo accounts and role
          badges. Complex RBAC, full billing, and production database migrations remain documented
          in future academic work.
        </p>
      </div>
    </div>
  );
}
