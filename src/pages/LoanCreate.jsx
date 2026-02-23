import React from 'react'
import PrestamoForm from '../components/forms/PrestamoForm'

const LoanCreate = () => {

  return (
    <div className="w-full text-gray-900 dark:text-white transition-colors">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Registrar Préstamo
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
          Completa la información para generar un nuevo contrato de préstamo de forma rápida y segura.
        </p>
      </div>

      <PrestamoForm />
    </div>
  )
}

export default LoanCreate
