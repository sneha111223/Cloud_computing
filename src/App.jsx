import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import QuizSlide from './components/QuizSlide.jsx';
import TitleSlide from './slides/TitleSlide.jsx';
import IntroSlide from './slides/IntroSlide.jsx';
import AssessmentSlide from './slides/AssessmentSlide.jsx';
import StrategySlide from './slides/StrategySlide.jsx';
import ProviderSlide from './slides/ProviderSlide.jsx';
import SecuritySlide from './slides/SecuritySlide.jsx';
import DataMigrationSlide from './slides/DataMigrationSlide.jsx';
import TestingSlide from './slides/TestingSlide.jsx';
import DeploymentSlide from './slides/DeploymentSlide.jsx';
import DrawbacksSlide from './slides/DrawbacksSlide.jsx';
import PitfallsSlide from './slides/PitfallsSlide.jsx';
import ChallengesSlide from './slides/ChallengesSlide.jsx';
import ConclusionSlide from './slides/ConclusionSlide.jsx';
import MigrationSimSlide from './slides/MigrationSimSlide.jsx';
import ThankYouSlide from './slides/ThankYouSlide.jsx';

const quizzes = [
  { id: 'q1', question: 'What is cloud migration?', options: ['Deleting data from servers', 'Moving digital assets from on-premise to cloud platforms', 'Installing new hardware', 'Creating local backups'], correct: 1 },
  { id: 'q2', question: 'Which migration strategy involves redesigning applications for cloud-native architecture?', options: ['Rehosting (Lift & Shift)', 'Refactoring', 'Rearchitecting', 'Retiring'], correct: 2 },
  { id: 'q3', question: 'Why is compliance important in cloud migration?', options: ['It reduces internet speed', 'It ensures data protection and regulatory adherence', 'It eliminates the need for testing', 'It makes migration faster'], correct: 1 },
  { id: 'q4', question: 'What should be validated after migration?', options: ['Only the UI design', 'Performance, security, and data integrity', 'Just the login page', 'Nothing — migration is automatic'], correct: 1 },
  { id: 'q5', question: 'What happens if organizations migrate without proper planning?', options: ['Everything works perfectly', 'Higher failure rates, cost overruns, and downtime', 'Cloud providers fix all issues', 'Migration becomes faster'], correct: 1 },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);

  const handleQuizAnswer = useCallback((quizId, isCorrect) => {
    setScores(prev => ({ ...prev, [quizId]: isCorrect }));
  }, []);

  const quizScore = Object.values(scores).filter(Boolean).length;
  const totalQuizzes = quizzes.length;

  const slides = [
    { id: 'title', render: () => <TitleSlide /> },
    { id: 'intro', render: () => <IntroSlide /> },
    { id: 'quiz1', render: () => <QuizSlide question={quizzes[0].question} options={quizzes[0].options} correctIndex={quizzes[0].correct} quizId="q1" onAnswer={handleQuizAnswer} answered={'q1' in scores} /> },
    { id: 'assessment', render: () => <AssessmentSlide /> },
    { id: 'strategy', render: () => <StrategySlide /> },
    { id: 'quiz2', render: () => <QuizSlide question={quizzes[1].question} options={quizzes[1].options} correctIndex={quizzes[1].correct} quizId="q2" onAnswer={handleQuizAnswer} answered={'q2' in scores} /> },
    { id: 'provider', render: () => <ProviderSlide /> },
    { id: 'security', render: () => <SecuritySlide /> },
    { id: 'quiz3', render: () => <QuizSlide question={quizzes[2].question} options={quizzes[2].options} correctIndex={quizzes[2].correct} quizId="q3" onAnswer={handleQuizAnswer} answered={'q3' in scores} /> },
    { id: 'data', render: () => <DataMigrationSlide /> },
    { id: 'testing', render: () => <TestingSlide /> },
    { id: 'quiz4', render: () => <QuizSlide question={quizzes[3].question} options={quizzes[3].options} correctIndex={quizzes[3].correct} quizId="q4" onAnswer={handleQuizAnswer} answered={'q4' in scores} /> },
    { id: 'deployment', render: () => <DeploymentSlide /> },
    { id: 'drawbacks', render: () => <DrawbacksSlide /> },
    { id: 'pitfalls', render: () => <PitfallsSlide /> },
    { id: 'quiz5', render: () => <QuizSlide question={quizzes[4].question} options={quizzes[4].options} correctIndex={quizzes[4].correct} quizId="q5" onAnswer={handleQuizAnswer} answered={'q5' in scores} /> },
    { id: 'challenges', render: () => <ChallengesSlide /> },
    { id: 'migration-sim', render: () => <MigrationSimSlide /> },
    { id: 'conclusion', render: () => <ConclusionSlide quizScore={quizScore} totalQuizzes={totalQuizzes} /> },
    { id: 'thankyou', render: () => <ThankYouSlide onRestart={() => { setCurrent(0); setScores({}); }} /> },
  ];

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= slides.length) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current, slides.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  useEffect(() => { setTimeout(() => setLoading(false), 1800); }, []);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  if (loading) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#060b1f' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ width: 50, height: 50, borderRadius: '50%', border: '3px solid rgba(0,240,255,0.1)', borderTopColor: '#00f0ff', marginBottom: 20 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#00f0ff', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
          Loading Presentation...
        </motion.p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#060b1f' }}>
      <AnimatedBackground />

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.03)', zIndex: 50 }}>
        <motion.div animate={{ width: ((current + 1) / slides.length * 100) + '%' }} transition={{ duration: 0.4 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #00f0ff, #7b61ff)', borderRadius: '0 2px 2px 0' }} />
      </div>

      {/* Slide counter */}
      <div style={{ position: 'fixed', top: 12, right: 20, zIndex: 50, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(0,240,255,0.4)', fontWeight: 600 }}>
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Slide dots */}
      <div style={{ position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 50, display: 'flex', gap: 4 }}>
        {slides.map((_, i) => (
          <motion.div key={i} onClick={() => goTo(i)}
            animate={{ background: i === current ? '#00f0ff' : i < current ? '#7b61ff' : 'rgba(255,255,255,0.08)', scale: i === current ? 1.3 : 1 }}
            style={{ width: 6, height: 6, borderRadius: '50%', cursor: 'pointer' }} />
        ))}
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={slides[current].id}
          custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}>
          {slides[current].render()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {current > 0 && (
        <motion.button whileHover={{ scale: 1.1, background: 'rgba(0,240,255,0.12)' }} whileTap={{ scale: 0.9 }}
          onClick={() => goTo(current - 1)}
          style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 50, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.12)', color: '#00f0ff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={22} />
        </motion.button>
      )}
      {current < slides.length - 1 && (
        <motion.button whileHover={{ scale: 1.1, background: 'rgba(0,240,255,0.12)' }} whileTap={{ scale: 0.9 }}
          onClick={() => goTo(current + 1)}
          style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 50, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.12)', color: '#00f0ff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={22} />
        </motion.button>
      )}
    </div>
  );
}
