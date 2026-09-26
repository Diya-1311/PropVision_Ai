'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  ShoppingBag,
  TrendingDown,
  Loader2,
  Sparkles,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Plus,
  X,
  Calculator,
} from 'lucide-react';

interface DemandItem {
  service_category: string;
  households_interested: number;
  current_avg_price: number;
  potential_group_price: number;
  estimated_savings_percentage: number;
}

interface Deal {
  id: string;
  society_id: string;
  service_category: string;
  provider_id: string;
  participating_households: number;
  individual_price: number;
  group_price: number;
  status: string;
}

export default function CommunityDealsPage() {
  const societyId = 'soc-1'; // Green Valley Society context
  const [demand, setDemand] = useState<DemandItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for "Create Society Deal"
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<DemandItem | null>(null);
  const [modalHouseholds, setModalHouseholds] = useState<number>(18);
  const [modalBasePrice, setModalBasePrice] = useState<number>(1500);
  const [modalGroupPrice, setModalGroupPrice] = useState<number>(1150);
  const [submittingDeal, setSubmittingDeal] = useState(false);

  const fetchData = async () => {
    try {
      const [dealsRes, demandRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/societies/${societyId}/deals`),
        axios.get(`http://127.0.0.1:8000/api/societies/${societyId}/demand`),
      ]);
      setDeals(dealsRes.data || []);
      setDemand(demandRes.data?.demands || []);
    } catch (err) {
      console.error('Error fetching deals or demand:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openDealModal = (item?: DemandItem) => {
    if (item) {
      setSelectedDemand(item);
      setModalHouseholds(item.households_interested);
      setModalBasePrice(item.current_avg_price);
      setModalGroupPrice(item.potential_group_price);
    } else {
      setSelectedDemand({
        service_category: 'Home Cleaning',
        households_interested: 18,
        current_avg_price: 1500,
        potential_group_price: 1150,
        estimated_savings_percentage: 23.3,
      });
      setModalHouseholds(18);
      setModalBasePrice(1500);
      setModalGroupPrice(1150);
    }
    setModalOpen(true);
  };

  // Dynamic calculations as per prompt specifications
  const calcIndividualTotal = modalBasePrice * modalHouseholds;
  const calcGroupTotal = modalGroupPrice * modalHouseholds;
  const calcSavings = calcIndividualTotal - calcGroupTotal;
  const calcSavingPct =
    modalBasePrice > 0
      ? (((modalBasePrice - modalGroupPrice) / modalBasePrice) * 100).toFixed(1)
      : '0';

  const handleCreateDealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingDeal(true);
    try {
      await axios.post(`http://127.0.0.1:8000/api/societies/${societyId}/deals`, {
        service_category: selectedDemand?.service_category || 'Home Cleaning',
        provider_id: 'prov-3', // CleanCare Services
        participating_households: Number(modalHouseholds),
        individual_price: Number(modalBasePrice),
        group_price: Number(modalGroupPrice),
      });
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      console.error('Error creating deal:', err);
    } finally {
      setSubmittingDeal(false);
    }
  };

  // Identify demand opportunities with >= 10 households not yet converted into active deals
  const opportunities = demand.filter(
    (d) =>
      d.households_interested >= 10 &&
      !deals.some((deal) => deal.service_category.toLowerCase() === d.service_category.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Green Valley Society (Gota, Ahmedabad)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Community Deals
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Collective demand unlocks better service pricing. Aggregated household contracts.
          </p>
        </div>

        <button
          onClick={() => openDealModal()}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Society Deal</span>
        </button>
      </div>

      {/* SECTION 1: Opportunities Identified */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-amber-900">
              Community Deal Opportunities Identified
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            {opportunities.length} Eligible Services
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-amber-200/80 shadow-sm p-6 flex flex-col justify-between gap-5 hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-slate-900">{item.service_category}</h3>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full">
                    {item.estimated_savings_percentage}% SAVING
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-semibold text-slate-700">
                    {item.households_interested} households
                  </span>{' '}
                  ready in Green Valley
                </p>

                {/* Price Comparison Block */}
                <div className="mt-5 grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">
                      Individual Rate
                    </span>
                    <p className="text-base font-bold text-slate-400 line-through mt-0.5">
                      ₹{item.current_avg_price}/mo
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase">
                      Group Price
                    </span>
                    <p className="text-lg font-extrabold text-emerald-600 mt-0.5">
                      ₹{item.potential_group_price}/mo
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openDealModal(item)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <span>Create Society Deal</span>
                <span>→</span>
              </button>
            </div>
          ))}

          {opportunities.length === 0 && (
            <div className="col-span-2 bg-white/80 rounded-2xl border border-amber-200 p-8 text-center text-slate-500 text-sm">
              All high-demand opportunities have already been activated into community deals!
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Active Community Deals */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Active Community Deals
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Bulk-negotiated society agreements currently active for Green Valley residents.
          </p>
        </div>

        {deals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            No active community deals yet. Use the opportunity section above to launch one.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {deals.map((deal) => {
              const unitSaving = deal.individual_price - deal.group_price;
              const savingPercent =
                deal.individual_price > 0
                  ? ((unitSaving / deal.individual_price) * 100).toFixed(1)
                  : '0';
              const monthlyCommunitySaving = unitSaving * deal.participating_households;

              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 space-y-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          {deal.service_category}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          {deal.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Provider: </span>
                        <strong className="text-slate-700">CleanCare Services (Verified)</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-600">
                        ₹{deal.group_price}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">/ household</span>
                    </div>
                  </div>

                  {/* Core Calculation Metrics */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400">Participating:</span>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">
                        {deal.participating_households} Households
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Unit Discount:</span>
                      <p className="text-sm font-bold text-emerald-600 mt-0.5">
                        {savingPercent}% Saved
                      </p>
                    </div>
                  </div>

                  {/* Estimated Monthly Community Savings Badge */}
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-800 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      Monthly Community Savings:
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      ₹{monthlyCommunitySaving.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE SOCIETY DEAL MODAL / DRAWER */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 space-y-6 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Create Society Deal</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aggregate household demand into an official society bulk discount.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDealSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Society
                </label>
                <input
                  type="text"
                  disabled
                  value="Green Valley Society (Gota)"
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Service Category
                </label>
                <input
                  type="text"
                  value={selectedDemand?.service_category || 'Home Cleaning'}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Households
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={modalHouseholds}
                    onChange={(e) => setModalHouseholds(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Individual Price (₹)
                  </label>
                  <input
                    type="number"
                    value={modalBasePrice}
                    onChange={(e) => setModalBasePrice(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Bulk / Group Price (₹)
                </label>
                <input
                  type="number"
                  value={modalGroupPrice}
                  onChange={(e) => setModalGroupPrice(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* DYNAMIC REACTIVE SAVINGS PREVIEW */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 border-b border-slate-200/80 pb-2">
                  <Calculator className="w-4 h-4 text-indigo-600" />
                  <span>Real-Time Economic Calculation</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span>Individual Total:</span>
                    <p className="font-bold text-slate-900 text-sm">
                      ₹{calcIndividualTotal.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <span>Community Total:</span>
                    <p className="font-bold text-emerald-600 text-sm">
                      ₹{calcGroupTotal.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-700">
                    Est. Monthly Savings ({calcSavingPct}%):
                  </span>
                  <span className="text-base font-extrabold text-emerald-600">
                    ₹{calcSavings.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-white border border-slate-300 text-slate-700 font-semibold text-xs py-3 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDeal}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                >
                  {submittingDeal ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Deal...</span>
                    </>
                  ) : (
                    'Confirm & Activate Deal'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
