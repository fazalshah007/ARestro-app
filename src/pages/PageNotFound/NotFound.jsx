import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-9xl font-bold text-astro-green">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-astro-green hover:bg-astro-light text-white px-6 py-3 rounded-full transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
