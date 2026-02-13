import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Trophy,
  Zap,
  Rocket,
  X,
  Check
} from 'lucide-react';
import { useGoalsStore, GOAL_UNITS } from '../store/useGoalsStore';
import { useAuthStore } from '../store/useAuthStore';

const STEPS = [
  {
    id: 1,
    title: "What's your BIG goal for 2026?",
    subtitle: "Your yearly vision - the main thing you want to achieve",
    type: 'yearly',
    icon: Target,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 2,
    title: "Break it into quarters",
    subtitle: "What milestones will you hit each quarter?",
    type: 'quarterly',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    title: "What's your 90-day focus?",
    subtitle: "The next 3 months - what's most important?",
    type: 'ninetyDay',
    icon: Zap,
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 4,
    title: "What's your 30-day target?",
    subtitle: "This month's sprint goal - make it specific",
    type: 'thirtyDay',
    icon: Rocket,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    title: "Review Your Goals",
    subtitle: "Here's your smart breakdown - ready to crush it!",
    type: 'review',
    icon: Trophy,
    color: 'from-pink-500 to-rose-600'
  }
];

const GoalInput = ({ goal, onChange, type, quarter = null }) => {
  const [localGoal, setLocalGoal] = useState(goal || {
    title: '',
    description: '',
    target: '',
    unit: 'videos',
    deadline: type === 'yearly' ? '2026-12-31' :
              type === 'ninetyDay' ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
              type === 'thirtyDay' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
              '',
    milestoneReward: '',
    current: 0
  });

  const handleChange = (field, value) => {
    const updated = { ...localGoal, [field]: value };
    setLocalGoal(updated);
    onChange(updated, quarter);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Goal Title</label>
        <input
          type="text"
          value={localGoal.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., 500 Videos, $10K MRR, 100 Clients"
          className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white placeholder-gray-500 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Description (optional)</label>
        <textarea
          value={localGoal.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="What does this goal mean to you?"
          rows={2}
          className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white placeholder-gray-500 transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Target Number</label>
          <input
            type="number"
            value={localGoal.target}
            onChange={(e) => handleChange('target', parseInt(e.target.value) || 0)}
            placeholder="500"
            min="0"
            className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white placeholder-gray-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Unit</label>
          <select
            value={localGoal.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
            className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white transition-all"
          >
            {GOAL_UNITS.map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.icon} {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Deadline</label>
          <input
            type="date"
            value={localGoal.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Current Progress</label>
          <input
            type="number"
            value={localGoal.current}
            onChange={(e) => handleChange('current', parseInt(e.target.value) || 0)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white placeholder-gray-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Milestone Reward (optional)</label>
        <input
          type="text"
          value={localGoal.milestoneReward}
          onChange={(e) => handleChange('milestoneReward', e.target.value)}
          placeholder="e.g., Trip to Bangkok, New laptop, Celebrate with team"
          className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl focus:border-accent-primary focus:ring-1 focus:ring-accent-primary text-white placeholder-gray-500 transition-all"
        />
      </div>
    </div>
  );
};

const QuarterlyGoals = ({ goals, onChange }) => {
  const [activeQuarter, setActiveQuarter] = useState('Q1');

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {quarters.map(q => (
          <button
            key={q}
            onClick={() => setActiveQuarter(q)}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
              activeQuarter === q
                ? 'bg-accent-primary text-white'
                : 'bg-dark-input text-gray-400 hover:bg-dark-border'
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuarter}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <GoalInput
            goal={goals[activeQuarter]}
            onChange={onChange}
            type="quarterly"
            quarter={activeQuarter}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ReviewStep = ({ goals }) => {
  const { calculateBreakdown } = useGoalsStore();

  const renderGoalSummary = (goal, label) => {
    if (!goal || !goal.title) return null;

    const breakdown = calculateBreakdown(goal);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-secondary rounded-xl p-4 border border-dark-border"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
            <h4 className="font-semibold text-white">{goal.title}</h4>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold gradient-text">{goal.target}</span>
            <span className="text-gray-500 text-sm ml-1">{goal.unit}</span>
          </div>
        </div>

        {breakdown.dailyTarget > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-dark-border">
            <div className="text-center">
              <p className="text-lg font-bold text-accent-primary">{breakdown.dailyTarget}</p>
              <p className="text-xs text-gray-500">per day</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-accent-success">{breakdown.weeklyTarget}</p>
              <p className="text-xs text-gray-500">per week</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-accent-warning">{breakdown.monthlyTarget}</p>
              <p className="text-xs text-gray-500">per month</p>
            </div>
          </div>
        )}

        {goal.milestoneReward && (
          <div className="mt-3 pt-3 border-t border-dark-border">
            <p className="text-sm text-gray-400">
              <Trophy className="w-4 h-4 inline mr-1 text-accent-warning" />
              Reward: {goal.milestoneReward}
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {renderGoalSummary(goals.yearly, 'Yearly Goal')}

      {goals.quarterly && Object.keys(goals.quarterly).map(q => {
        if (!goals.quarterly[q]?.title) return null;
        return (
          <div key={q}>
            {renderGoalSummary(goals.quarterly[q], `${q} Goal`)}
          </div>
        );
      })}

      {renderGoalSummary(goals.ninetyDay, '90-Day Focus')}
      {renderGoalSummary(goals.thirtyDay, '30-Day Sprint')}

      {!goals.yearly?.title && !goals.ninetyDay?.title && !goals.thirtyDay?.title && (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No goals set yet. Go back and add some!</p>
        </div>
      )}
    </div>
  );
};

export default function GoalOnboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [draftGoals, setDraftGoals] = useState({
    yearly: null,
    quarterly: { Q1: null, Q2: null, Q3: null, Q4: null },
    ninetyDay: null,
    thirtyDay: null
  });

  const { setGoal, completeOnboarding } = useGoalsStore();
  const { markOnboardingComplete } = useAuthStore();

  const step = STEPS[currentStep];
  const StepIcon = step.icon;

  const handleGoalChange = (goal, quarter = null) => {
    if (step.type === 'quarterly' && quarter) {
      setDraftGoals(prev => ({
        ...prev,
        quarterly: {
          ...prev.quarterly,
          [quarter]: goal
        }
      }));
    } else {
      setDraftGoals(prev => ({
        ...prev,
        [step.type]: goal
      }));
    }
  };

  const handleNext = () => {
    // Save current step's goal(s)
    if (step.type === 'quarterly') {
      Object.keys(draftGoals.quarterly).forEach(q => {
        if (draftGoals.quarterly[q]?.title) {
          setGoal('quarterly', draftGoals.quarterly[q], q);
        }
      });
    } else if (step.type !== 'review' && draftGoals[step.type]?.title) {
      setGoal(step.type, draftGoals[step.type]);
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
      markOnboardingComplete();
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    markOnboardingComplete();
    onComplete?.();
  };

  return (
    <div className="fixed inset-0 bg-dark-primary flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-dark-secondary rounded-2xl border border-dark-border overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${step.color} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <StepIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Step {currentStep + 1} of {STEPS.length}</p>
                <h2 className="text-xl font-bold text-white">{step.title}</h2>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white/70 hover:text-white transition-colors"
              title="Skip for now"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/80">{step.subtitle}</p>

          {/* Progress Bar */}
          <div className="mt-4 flex gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {step.type === 'quarterly' ? (
                <QuarterlyGoals
                  goals={draftGoals.quarterly}
                  onChange={handleGoalChange}
                />
              ) : step.type === 'review' ? (
                <ReviewStep goals={draftGoals} />
              ) : (
                <GoalInput
                  goal={draftGoals[step.type]}
                  onChange={handleGoalChange}
                  type={step.type}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 pt-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all order-2 sm:order-1 ${
              currentStep === 0
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-400 hover:text-white hover:bg-dark-input'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Skip for now
            </button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r ${step.color} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all`}
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <Check className="w-5 h-5" />
                  Complete Setup
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-success/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
