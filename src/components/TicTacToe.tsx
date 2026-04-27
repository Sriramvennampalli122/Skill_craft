import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-light text-slate-900 tracking-tight">Interactive Game Logic</h2>
        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">Two-Player Interface</p>
      </div>
      
      <div className="mb-10 h-10 flex items-center justify-center">
        {winner ? (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="px-6 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-full border border-blue-100"
          >
            {winner === 'Draw' ? "GAME DRAW" : `WINNER: ${winner}`}
          </motion.div>
        ) : (
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold uppercase tracking-widest">
            <span>Next turn:</span>
            <span className={`px-2 py-0.5 rounded ${isXNext ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {isXNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!!winner || !!square}
            className={`w-24 h-24 flex items-center justify-center text-4xl font-light rounded-xl transition-all border
              ${!square && !winner ? 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30' : 'bg-white/60 border-slate-100 cursor-default'}
              ${square === 'X' ? 'text-slate-900' : 'text-blue-500'}
            `}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: square ? 1 : 0, scale: square ? 1 : 0.5 }}
            >
              {square}
            </motion.span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-12 px-10 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md font-semibold text-sm uppercase tracking-widest active:scale-95 border border-slate-900"
      >
        Restart Module
      </button>
    </div>
  );
}
