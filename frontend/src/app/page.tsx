import Link from 'next/link';
import {
  Building2,
  Users,
  Cpu,
  MapPin,
  ShoppingBag,
  FlaskConical,
  ArrowRight,
  BarChart3,
  Sparkles,
} from 'lucide-react';

const modules = [
  {
    icon: Building2,
    color: 'bg-indigo-100 text-indigo-600',
    title: 'AI Property Finder',
    description:
      'Enter your preferences and let the engine rank every property with a transparent match score and full explanation.',
    href: '/properties/recommend',
    cta: 'Find My Property',
  },
  {
    icon: MapPin,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'Society Intelligence',
    description:
      'Track service demand across residential communities — discover what residents actually need.',
    href: '/societies',
    cta: 'Browse Societies',
  },
  {
    icon: ShoppingBag,
    color: 'bg-amber-100 text-amber-600',
    title: 'Community Deals',
    description:
      'Collective purchasing power unlocks group pricing for maintenance, cleaning, security and more.',
    href: '/society/deals',
    cta: 'View Deals',
  },
  {
    icon: Users,
    color: 'bg-violet-100 text-violet-600',
    title: 'Service Providers',
    description:
      'Browse AI-vetted professionals matched by skill, proximity, availability and community rating.',
    href: '/providers',
    cta: 'Explore Providers',
  },
  {
    icon: FlaskConical,
    color: 'bg-sky-100 text-sky-600',
    title: 'Research & Evaluation',
    description:
      'Full transparency into our methodology: scoring weights, evaluation framework, and prototype status.',
    href: '/research',
    cta: 'Read Research',
  },
];

const stats = [
  { label: 'Properties Analyzed', value: '10', icon: Building2, color: 'text-indigo-600 bg-indigo-50' },
  { label: 'AI Recommendation Engine', value: 'Active', icon: Cpu, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Communities Tracked', value: '5', icon: MapPin, color: 'text-violet-600 bg-violet-50' },
  { label: 'Active Service Requests', value: '65+', icon: BarChart3, color: 'text-amber-600 bg-amber-50' },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="grid lg:grid-cols-2 gap-10 items-center py-6">
        {/* Left: copy */}
        <div className="space-y-6">
          <span className="inline-block text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            AI-Powered Real Estate Intelligence
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Find the property that fits{' '}
            <span className="text-indigo-600">your life</span> — not just your budget.
          </h1>
          <p className="text-lg text-slate-500 max-w-lg">
            PropVision AI evaluates every property across budget, location, area, bedrooms and
            amenities — and explains exactly why each property fits you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/properties/recommend"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 font-semibold hover:bg-indigo-700 shadow-sm"
            >
              Find My Ideal Property
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/societies"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 rounded-xl px-5 py-2.5 font-semibold hover:bg-slate-50 shadow-sm"
            >
              Explore Communities
            </Link>
          </div>
        </div>

        {/* Right: Intelligence card */}
        <div className="relative">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-4">
            {/* Property mockup header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Top AI Recommendation
                </p>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Skyline Apartments, Gota</h3>
                <p className="text-sm text-slate-500">2 BHK · For Rent · Ahmedabad</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-center shrink-0">
                <p className="text-2xl font-bold text-emerald-600">92%</p>
                <p className="text-xs font-semibold text-emerald-700">AI MATCH</p>
              </div>
            </div>

            {/* Factor chips */}
            <div className="flex flex-wrap gap-2">
              {['Budget ✓', 'Location ✓', '2 BHK ✓'].map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Bar chart mockup */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Factor Breakdown
              </p>
              <div className="flex items-end gap-3 h-16">
                {[
                  { label: 'Budget', pct: 90, color: 'bg-emerald-500' },
                  { label: 'Location', pct: 75, color: 'bg-indigo-500' },
                  { label: 'Area', pct: 60, color: 'bg-amber-400' },
                  { label: 'Amenities', pct: 50, color: 'bg-violet-400' },
                ].map(({ label, pct, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full flex items-end justify-center" style={{ height: '48px' }}>
                      <div
                        className={`w-full rounded-t-md ${color}`}
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-3 -right-3 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="inline w-3 h-3 mr-1" />
            Explainable AI
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* MODULE CARDS */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Platform Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(({ icon: Icon, color, title, description, href, cta }) => (
            <div
              key={href}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{description}</p>
              </div>
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 group"
              >
                {cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* AI INSIGHT BANNER */}
      <section className="bg-indigo-50 border-l-4 border-indigo-600 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="shrink-0">
          <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-100 border border-indigo-200 rounded-full px-3 py-1">
            AI Insight
          </span>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          <span className="font-semibold text-slate-900">Green Valley Society</span> — 18 registered
          residents have collectively expressed demand for 3 service categories. Community group
          pricing unlocks an estimated{' '}
          <span className="font-semibold text-indigo-600">23.3% average savings</span> versus
          individual hiring. Deal creation is available now.
        </p>
        <Link
          href="/society/deals"
          className="shrink-0 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 whitespace-nowrap"
        >
          View Deals →
        </Link>
      </section>
    </div>
  );
}
