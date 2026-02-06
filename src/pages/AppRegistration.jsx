import React from 'react'
import PrestamoForm from '../components/forms/PrestamoForm'

const AppRegistration = () => {

  return (
    <div className="max-h-[calc(100vh-130px)] overflow-y-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Registrar Préstamo</h1>
      <PrestamoForm />
    </div>
  )
}

export default AppRegistration
