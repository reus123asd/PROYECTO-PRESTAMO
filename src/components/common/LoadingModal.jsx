import { Zap } from "lucide-react";

export default function LoadingModal({ show, text = "Cargando..." }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative group">
        {/* Decorative Glowing Backgrounds */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-1000"></div>
        <div className="absolute -inset-4 bg-gradient-to-bl from-purple-600 to-blue-600 rounded-full blur-2xl opacity-10 group-hover:opacity-30 animate-pulse delay-500 transition-opacity duration-1000"></div>

        {/* Main Loader Container */}
        <div className="relative bg-white/80 dark:bg-[#1A2234]/90 backdrop-blur-xl rounded-[2.5rem] p-10 flex flex-col items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/20 dark:border-white/5 transition-all duration-300 scale-100 animate-in zoom-in-95 duration-500">

          {/* Animated Multi-layered Logo/Icon */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping duration-[3s]"></div>
            <div className="absolute inset-2 rounded-full border-2 border-indigo-500/20 animate-ping duration-[3s] delay-700"></div>

            {/* Rotating gradient border */}
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600 border-r-indigo-500 animate-spin duration-1000"></div>

            {/* Center Icon */}
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/40 rotate-12 transition-transform group-hover:rotate-0 duration-500">
              <Zap size={32} className="text-white fill-white/20 animate-pulse" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2 text-center mt-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {text}
            </h3>
            <div className="flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
          </div>

          {/* Footer message */}
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-500 px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full mt-2">
            Reus Admin System
          </p>
        </div>
      </div>
    </div>
  );
}
