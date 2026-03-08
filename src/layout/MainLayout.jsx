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

    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <div className="flex h-screen overflow-hidden relative">
        {/* Backdrop for mobile */}
        {!sideBarCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setSideBarCollapsed(true)}
          />
        )}

        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(p => !p)}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            if (window.innerWidth < 768) setSideBarCollapsed(true);
          }}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Header
            sidebarCollapsed={sideBarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
            setCurrentView={(view) => {
              setCurrentPage(view);
              if (window.innerWidth < 768) setSideBarCollapsed(true);
            }}
            darkMode={darkMode}
            toggleTheme={() => setDarkMode(p => !p)}
          />
          <main className="flex-1 overflow-y-auto bg-transparent custom-scrollbar">
            <div className="p-4 md:p-8 lg:p-10 space-y-6 md:space-y-10">
              {currentPage === "Profile" && <Profile />}
              {currentPage === "Dashboard" && <Dashboard onNavigate={setCurrentPage} />}
              {currentPage === "Historial" && <Loans />}
              {currentPage === "Registro" && <LoanCreate />}
              {currentPage === "Pagos" && <Payments />}
            </div>
          </main>
        </div>
      </div>
    </div>

  )
}
