import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-tet-dark-red mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-tet-red/30 focus:border-tet-red focus:ring-2 focus:ring-tet-red/20'
            }
            focus:outline-none
            bg-white/80 backdrop-blur-sm
            text-gray-800 placeholder-gray-400
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input

