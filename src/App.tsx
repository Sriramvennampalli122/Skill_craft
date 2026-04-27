/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import TodoList from './components/TodoList';
import TicTacToe from './components/TicTacToe';
import Stopwatch from './components/Stopwatch';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={
          <PageWrapper title="Calculator Task 01">
            <Calculator />
          </PageWrapper>
        } />
        <Route path="/todo" element={
          <PageWrapper title="Todo List Task 02">
            <TodoList />
          </PageWrapper>
        } />
        <Route path="/tictactoe" element={
          <PageWrapper title="Tic-Tac-Toe Task 03">
            <TicTacToe />
          </PageWrapper>
        } />
        <Route path="/stopwatch" element={
          <PageWrapper title="Stopwatch Task 04">
            <Stopwatch />
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-10 flex flex-col items-center bg-slate-50"
    >
      <div className="w-full max-w-5xl mb-12 text-left">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold mb-3">Project Component</h2>
        <h1 className="text-4xl font-light text-slate-900 tracking-tight">{title}</h1>
        <div className="h-px bg-slate-200 mt-6 w-full opacity-60"></div>
      </div>
      <div className="w-full max-w-5xl">
        {children}
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
