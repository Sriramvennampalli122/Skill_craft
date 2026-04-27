import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input,
      completed: false
    };
    
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-light text-slate-900 tracking-tight">Project Tasks</h2>
        <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest">Internal Management Module</p>
      </div>
      
      <form onSubmit={addTodo} className="flex gap-3 mb-10 overflow-hidden">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new task description..."
          className="flex-1 px-5 py-4 rounded-lg bg-slate-50 text-slate-700 placeholder-slate-400 outline-none focus:ring-1 focus:ring-slate-300 transition-all border border-slate-200 text-sm"
        />
        <button
          type="submit"
          className="bg-slate-900 text-white px-8 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm font-semibold text-sm"
        >
          Add Task
        </button>
      </form>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${
                todo.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`transition-colors ${todo.completed ? 'text-blue-500' : 'text-slate-300 hover:text-slate-400'}`}
              >
                {todo.completed ? <CheckCircle size={22} fill="currentColor" className="text-white" /> : <Circle size={22} />}
              </button>
              
              <span className={`flex-1 text-sm font-medium ${
                todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
              }`}>
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {todos.length === 0 && (
          <div className="text-center py-10 text-white/60">
            <p>Your task list is empty!</p>
          </div>
        )}
      </div>
    </div>
  );
}
