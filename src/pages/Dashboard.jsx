import React from 'react';
import { CreditCard, Users, DollarSign, Activity, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white dark:bg-[#111826] p-7 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide uppercase">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-lg">
            <TrendingUp size={12} /> {trend}
          </div>
        )}
      </div>
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={26} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="w-full text-gray-900 dark:text-white transition-colors">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Bienvenido de nuevo. Aquí tienes un resumen ejecutivo de tus operaciones hoy.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <StatCard
          title="Préstamos Activos"
          value="124"
          icon={CreditCard}
          color="bg-blue-500"
          trend="+12% este mes"
        />
        <StatCard
          title="Clientes Totales"
          value="850"
          icon={Users}
          color="bg-purple-500"
          trend="+5 nuevos hoy"
        />
        <StatCard
          title="Recaudado Hoy"
          value="S/ 2,450"
          icon={DollarSign}
          color="bg-green-500"
          trend="+8.2% vs ayer"
        />
        <StatCard
          title="Tasa Promedio"
          value="12%"
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Activity Card */}
        <div className="bg-white dark:bg-[#111826] p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl shadow-blue-500/5 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={24} /> Actividad Reciente
            </h3>
            <button className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">Ver todo</button>
          </div>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl text-gray-400 group">
            <Activity className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform opacity-20" />
            <p className="font-medium opacity-50 text-sm">Visualización de métricas en desarrollo</p>
          </div>
        </div>

        {/* Requests Card */}
        <div className="bg-white dark:bg-[#111826] p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl shadow-blue-500/5 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-indigo-500" size={24} /> Solicitudes Pendientes
            </h3>
            <span className="bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-lg text-xs font-bold">3 Nuevas</span>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-[#1A2234] rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold group-hover:rotate-6 transition-transform">
                    {i}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 dark:text-white">Cliente de Prueba #{i}</p>
                    <p className="text-xs font-bold text-blue-500">S/ 1,000.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-3 py-1.5 rounded-xl text-xs font-extrabold">
                  <Clock size={14} /> Espera
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 bg-slate-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm">
            Gestionar Solicitudes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;