import React from 'react';

interface FeatureScore {
  score: number;
  max: number;
  explanation: string;
}

interface AIRecommendationExplanationProps {
  score: number;
  featureScores: Record<string, FeatureScore>;
  explanations: string[];
}

function getBarColor(percentage: number): string {
  if (percentage > 80) return 'bg-emerald-500';
  if (percentage > 50) return 'bg-amber-400';
  return 'bg-rose-400';
}

function capitalize(str: string): string {
  return str
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function AIRecommendationExplanation({
  score,
  featureScores,
  explanations,
}: AIRecommendationExplanationProps) {
  const topExplanations = explanations.slice(0, 5);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            AI Match Analysis
          </p>
          <p className="text-xs italic text-slate-400 mt-0.5">
            Scored using weighted deterministic multi-factor ranking — not a black-box model.
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-emerald-600">{score}</span>
          <span className="text-sm text-slate-400 font-medium">/100</span>
        </div>
      </div>

      {/* Feature bars */}
      {Object.keys(featureScores).length > 0 && (
        <div className="space-y-3">
          {Object.entries(featureScores).map(([feature, data]) => {
            const percentage = data.max > 0 ? Math.round((data.score / data.max) * 100) : 0;
            return (
              <div key={feature}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">{capitalize(feature)}</span>
                  <span className="text-xs text-slate-500">
                    {data.score}/{data.max}
                  </span>
                </div>
                <div className="bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getBarColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Match factor chips */}
      {topExplanations.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Match Factors
          </p>
          <div className="flex flex-wrap gap-2">
            {topExplanations.map((exp, i) => {
              const isPositive = exp.startsWith('✓');
              const isNegative = exp.startsWith('x') || exp.startsWith('✗');
              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                    isPositive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : isNegative
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {exp}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="text-xs text-slate-400 border-t border-slate-200 pt-3">
        <span className="font-semibold text-slate-500">Why explainable?</span> PropVision AI shows
        every factor that contributed to this score, not just a percentage.
      </p>
    </div>
  );
}
