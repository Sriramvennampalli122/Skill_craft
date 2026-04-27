import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, ListTodo, Hash, Timer } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Calculator' },
    { to: '/todo', label: 'Task List' },
    { to: '/tictactoe', label: 'Game Logic' },
    { to: '/stopwatch', label: 'Stopwatch' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-200 bg-white flex items-center justify-between px-10">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xl shadow-sm">S</div>
        <div>
          <h1 className="text-sm font-semibold leading-none text-slate-900">Internship Portfolio</h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Web Development • 2025</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              text-sm font-medium transition-all pb-1 border-b-2
              ${isActive 
                ? 'text-slate-900 border-slate-900' 
                : 'text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-200'}
            `}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
