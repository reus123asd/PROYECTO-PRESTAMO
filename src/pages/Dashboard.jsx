import React from 'react';
import { CreditCard, Users, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-[#111826] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 cursor-default">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Resumen general</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Préstamos Activos"
          value="124"
          icon={CreditCard}
          color="bg-blue-500 text-blue-500"
        />
        <StatCard
          title="Clientes Totales"
          value="850"
          icon={Users}
          color="bg-purple-500 text-purple-500"
        />
        <StatCard
          title="Recaudado Hoy"
          value="S/ 2,450"
          icon={DollarSign}
          color="bg-green-500 text-green-500"
        />
        <StatCard
          title="Tasa de Interés"
          value="12%"
          icon={Activity}
          color="bg-orange-500 text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111826] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actividad Reciente</h3>
          <div className="flex items-center justify-center h-full text-gray-400">
            Gráfico de actividad aquí
          </div>
        </div>

        <div className="bg-white dark:bg-[#111826] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Solicitudes Pendientes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Cliente #{i}</p>
                    <p className="text-xs text-gray-500">Solicitó S/ 1000</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pendiente</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard