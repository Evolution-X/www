import React from 'react'
import { Link } from 'react-router-dom' 
import notFoundImage from '../../assets/evolution.svg'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white p-8">
      <div className="text-center max-w-md mx-auto">
        <img
          src={notFoundImage}
          alt="404 Not Found"
          className="w-3/4 mx-auto mb-8"
        />
        <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl mb-6">The page you are looking for does not exist or has been moved.</p>
        <div>
          <Link
            to="/"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
