import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-1.5 sm:p-2 rounded-xl shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <div className="hidden xs:block">
              <div className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">TruckSuvidha</div>
              <div className="text-xs text-purple-300 hidden sm:block">Your Transport Partner</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300 text-sm xl:text-base hover:text-orange-300">
              Home
            </Link>

            {user?.role === 'admin' || user?.role === 'superadmin' ? (
              <>
                <Link to="/admin/manage-loads" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-purple-300">
                  Manage Loads
                </Link>
                <Link to="/admin/manage-trucks" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-cyan-300">
                  Manage Trucks
                </Link>
                <Link to="/admin/manage-users" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-emerald-300">
                  Manage Users
                </Link>
                <Link to="/admin/manage-social-media" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-pink-300">
                  Social
                </Link>
              </>
            ) : (
              <>
                <Link to="/load-board" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-cyan-300">
                  Load Board
                </Link>
                <Link to="/truck-board" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-purple-300">
                  Truck Board
                </Link>
                {user && (
                  <Link to="/post-load" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300 text-sm xl:text-base whitespace-nowrap hover:text-emerald-300">
                    Post Load
                  </Link>
                )}
              </>
            )}

            <Link to="/contact" className="px-3 xl:px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 text-sm xl:text-base hover:text-amber-300">
              Contact
            </Link>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-purple-400 group-hover:border-orange-400 transition"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div className="text-sm text-right">
                    <div className="font-semibold text-white">{user.name || 'User'}</div>
                    <div className="text-xs text-purple-300 capitalize">{user.role}</div>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 xl:px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl transition-all duration-300 text-sm shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-2 hover:bg-white/10 rounded-xl transition-all duration-300 text-sm border border-purple-500/30 hover:border-purple-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 xl:px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm whitespace-nowrap shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
                >
                  Free Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-lg"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-purple-500/20 transition-all duration-300 focus:outline-none border border-purple-500/30"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-gradient-to-b from-slate-900/98 to-purple-900/98 backdrop-blur-md border-t border-purple-500/30">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {user && (
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 mb-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                onClick={closeMobileMenu}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-purple-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
                    {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white">{user.name || 'User'}</div>
                  <div className="text-xs text-purple-300 capitalize">{user.role} • View Profile</div>
                </div>
              </Link>
            )}

            <Link
              to="/"
              className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 transition-all duration-300 active:bg-white/20"
              onClick={closeMobileMenu}
            >
              🏠 Home
            </Link>

            {user?.role === 'admin' || user?.role === 'superadmin' ? (
              <>
                <Link
                  to="/admin/manage-loads"
                  className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 active:bg-white/20"
                  onClick={closeMobileMenu}
                >
                  📦 Manage Loads
                </Link>
                <Link
                  to="/admin/manage-trucks"
                  className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 active:bg-white/20"
                  onClick={closeMobileMenu}
                >
                  🚛 Manage Trucks
                </Link>
                <Link
                  to="/admin/manage-users"
                  className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300 active:bg-white/20"
                  onClick={closeMobileMenu}
                >
                  👥 Manage Users
                </Link>
                <Link
                  to="/admin/manage-social-media"
                  className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 active:bg-white/20"
                  onClick={closeMobileMenu}
                >
                  🔗 Social Media
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/load-board"
                  className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 active:bg-white/20"
                  onClick={closeMobileMenu}
                >
                  📋 Load Board
                </Link>
                <Link
                  to="/truck-board"
                  className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 active:bg-white/20"
                  onClick={closeMobileMenu}
                >
                  🚚 Truck Board
                </Link>
                {user && (
                  <Link
                    to="/post-load"
                    className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-300 active:bg-white/20"
                    onClick={closeMobileMenu}
                  >
                    ➕ Post Load
                  </Link>
                )}
              </>
            )}

            <Link
              to="/contact"
              className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 active:bg-white/20"
              onClick={closeMobileMenu}
            >
              📞 Contact
            </Link>

            {!user && (
              <div className="pt-3 border-t border-purple-500/30 mt-3">
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl text-center transition-all duration-300 shadow-lg shadow-orange-500/30"
                  onClick={closeMobileMenu}
                >
                  ✨ Free Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Bar - Hidden on very small screens */}
      <div className="hidden sm:block bg-gradient-to-r from-purple-900/50 via-slate-900/50 to-purple-900/50 border-t border-purple-500/20">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-xs sm:text-sm gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a href="tel:+917489635343" className="hover:text-orange-400 transition-colors duration-300">
              📞 +91-7489635343
            </a>
            <a href="mailto:info@trucksuvidha.com" className="hover:text-pink-400 transition-colors duration-300 hidden sm:inline">
              ✉️ info@trucksuvidha.com
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-xs text-purple-300 hidden md:inline">FOLLOW US:</span>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">FB</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">X</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-300">IN</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
