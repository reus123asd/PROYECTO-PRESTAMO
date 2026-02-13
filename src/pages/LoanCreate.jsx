import React from 'react'
import PrestamoForm from '../components/forms/PrestamoForm'

const LoanCreate = () => {

  return (
    <div className="max-h-[calc(100vh-130px)] overflow-y-auto p-6 transition-colors">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Registrar Préstamo</h1>
      <PrestamoForm />
    </div>
  )
}

export default LoanCreate
