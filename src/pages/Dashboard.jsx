import React, { useEffect, useState } from 'react';
import { CreditCard, Users, DollarSign, Activity, TrendingUp, Clock, CheckCircle2, XCircle, ChevronRight, Wallet, PieChart, BarChart3 } from 'lucide-react';
import { getEstadisticas, patchEstadoPrestamo } from '../services/prestamosApi';
import { toast } from 'sonner';

const StatCard = ({ title, value, icon: Icon, colorClass, textColor, trend }) => (
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
      <div className={`p-4 rounded-2xl ${colorClass}/15 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={26} className={textColor} />
      </div>
    </div>
  </div>
);

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getEstadisticas();
        setStats(data);
      } catch (error) {
        toast.error("Error al cargar estadísticas");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

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
          value={stats?.prestamosActivos || 0}
          icon={Wallet}
          colorClass="bg-blue-600"
          textColor="text-blue-600"
        />
        <StatCard
          title="Clientes Totales"
          value={stats?.clientesTotales || 0}
          icon={Users}
          colorClass="bg-indigo-600"
          textColor="text-indigo-600"
        />
        <StatCard
          title="Recaudado Hoy (S/)"
          value={`S/ ${stats?.recaudadoHoy?.PEN.toFixed(2) || "0.00"}`}
          icon={PieChart}
          colorClass="bg-emerald-600"
          textColor="text-emerald-600"
        />
        <StatCard
          title="Recaudado Hoy ($)"
          value={`$ ${stats?.recaudadoHoy?.USD.toFixed(2) || "0.00"}`}
          icon={BarChart3}
          colorClass="bg-orange-600"
          textColor="text-orange-600"
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
            <button
              onClick={() => onNavigate("Pagos")}
              className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors"
            >
              Ver todo
            </button>
          </div>
          <div className="space-y-4">
            {stats?.recientes?.length > 0 ? (
              stats.recientes.map((pago) => (
                <div key={pago.id} className="group flex items-center justify-between p-5 bg-slate-50 dark:bg-[#1A2234] rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white">{pago.cliente}</p>
                      <p className="text-xs font-bold text-blue-500">
                        Pago recibido: {pago.moneda === 'USD' ? '$' : 'S/'} {pago.monto.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold">{pago.fecha}</p>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-green-500">
                      <CheckCircle2 size={10} /> Completado
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 opacity-30">
                <Activity size={48} className="mb-4" />
                <p className="font-medium text-sm">Sin pagos recientes</p>
              </div>
            )}
          </div>
        </div>

        {/* Requests Card */}
        <div className="bg-white dark:bg-[#111826] p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl shadow-blue-500/5 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-orange-500" size={24} /> Solicitudes Pendientes
            </h3>
            <span className="bg-orange-500/10 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold">
              {stats?.solicitudesPendientes?.length || 0} Pendientes
            </span>
          </div>
          <div className="space-y-4">
            {stats?.solicitudesPendientes?.length > 0 ? (
              stats.solicitudesPendientes.map((sol) => (
                <div key={sol.id} className="group flex flex-col p-5 bg-slate-50 dark:bg-[#1A2234] rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                        {sol.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900 dark:text-white">{sol.nombre}</p>
                        <p className="text-xs font-bold text-orange-500">
                          {sol.moneda === 'USD' ? '$' : 'S/'} {sol.monto}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">{sol.fecha}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        await patchEstadoPrestamo(sol.id, 'Deuda');
                        toast.success("Préstamo aprobado");
                        const data = await getEstadisticas();
                        setStats(data);
                      }}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 size={14} /> Aprobar
                    </button>
                    <button
                      onClick={async () => {
                        await patchEstadoPrestamo(sol.id, 'Rechazado');
                        toast.error("Préstamo rechazado");
                        const data = await getEstadisticas();
                        setStats(data);
                      }}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <XCircle size={14} /> Rechazar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 opacity-30">
                <CheckCircle2 size={48} className="mb-2 text-green-500" />
                <p className="text-sm font-bold">Todo al día</p>
              </div>
            )}
          </div>
          <button
            onClick={() => onNavigate("Historial")}
            className="w-full mt-6 py-4 bg-slate-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm flex items-center justify-center gap-2"
          >
            Gestionar Todo <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;