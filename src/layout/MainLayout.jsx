import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './Header/Header'
import Dashboard from '../pages/Dashboard'
import LoanCreate from '../pages/LoanCreate'
import Payments from '../pages/Payments'
import Loans from '../pages/Loans';
import Profile from '../pages/Profile';

export default function MainLayout() {

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile
        setSideBarCollapsed(true);
      } else {
        // Desktop
        setSideBarCollapsed(false);
      }
    };

    handleResize(); // al cargar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Accedemos directamente al elemento raíz del navegador
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (

    <div
      className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <div className='flex h-screen overflow-hidden'>
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(p => !p)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className='flex-1 flex flex-col overflow-hidden '>
          <Header
            sidebarCollapsed={sideBarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
            setCurrentView={setCurrentPage}
            darkMode={darkMode}
            toggleTheme={() => setDarkMode(p => !p)}
          />
          <main className='flex-1 overflow-y-auto bg-transparent'>
            <div className='p-6 space-y-6'>
              {currentPage === "Profile" && <Profile />}
              {currentPage === "Dashboard" && <Dashboard />}
              {currentPage === "Historial" && <Loans />}
              {currentPage === "Registro" && <LoanCreate />}
              {currentPage === "Pagos" && <Payments />}
            </div>
          </main>
        </div>
      </div>
    </div >

  )
}
