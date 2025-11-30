import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl
      border-2 border-tet-gold/30
      p-8 relative overflow-hidden
      tet-decoration
      ${className}
    `}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-tet-red/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-tet-gold/5 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default Card

