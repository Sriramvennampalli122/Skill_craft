import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Delete, RotateCcw } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      // Using Function constructor for simple evaluation - in production you'd use a parser
      // but for an internship project, this follows the 'eval' logic mentioned in reports
      const result = new Function('return ' + fullEquation.replace('x', '*').replace('÷', '/'))();
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-sm mx-auto">
      <div className="w-full mb-6 p-6 bg-slate-50 rounded-xl text-right border border-slate-100">
        <div className="text-slate-400 text-xs h-6 font-mono tracking-wider">{equation}</div>
        <div className="text-slate-900 text-4xl font-light truncate font-mono tracking-tighter">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
        <button onClick={clear} className="bg-slate-100 text-slate-600 p-4 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors border border-slate-200"><RotateCcw size={18} /></button>
        <button onClick={backspace} className="bg-slate-100 text-slate-600 p-4 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors border border-slate-200"><Delete size={18} /></button>
        <button onClick={() => handleOperator('%')} className="bg-slate-100 text-slate-600 p-4 rounded-lg hover:bg-slate-200 transition-colors font-medium border border-slate-200">%</button>
        <button onClick={() => handleOperator('÷')} className="bg-slate-900 text-white p-4 rounded-lg hover:bg-slate-800 transition-colors font-medium border border-slate-900">÷</button>

        {[7, 8, 9].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="bg-white text-slate-700 p-4 rounded-lg hover:bg-slate-50 transition-colors font-medium border border-slate-200 shadow-sm">{n}</button>
        ))}
        <button onClick={() => handleOperator('x')} className="bg-slate-900 text-white p-4 rounded-lg hover:bg-slate-800 transition-colors font-medium border border-slate-900">×</button>

        {[4, 5, 6].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="bg-white text-slate-700 p-4 rounded-lg hover:bg-slate-50 transition-colors font-medium border border-slate-200 shadow-sm">{n}</button>
        ))}
        <button onClick={() => handleOperator('-')} className="bg-slate-900 text-white p-4 rounded-lg hover:bg-slate-800 transition-colors font-medium border border-slate-900">−</button>

        {[1, 2, 3].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="bg-white text-slate-700 p-4 rounded-lg hover:bg-slate-50 transition-colors font-medium border border-slate-200 shadow-sm">{n}</button>
        ))}
        <button onClick={() => handleOperator('+')} className="bg-slate-900 text-white p-4 rounded-lg hover:bg-slate-800 transition-colors font-medium border border-slate-900">+</button>

        <button onClick={() => handleNumber('0')} className="col-span-2 bg-white text-slate-700 p-4 rounded-lg hover:bg-slate-50 transition-colors font-medium border border-slate-200 shadow-sm">0</button>
        <button onClick={() => handleNumber('.')} className="bg-white text-slate-700 p-4 rounded-lg hover:bg-slate-50 transition-colors font-medium border border-slate-200 shadow-sm">.</button>
        <button onClick={calculate} className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md shadow-blue-100">=</button>
      </div>
    </div>
  );
}
