import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/client';
import { useAuth } from '../auth/AuthContext';

export default function CustomerDashboard() {
  const [loads, setLoads] = useState([]);
  const [myLoads, setMyLoads] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user should see all available loads (drivers, admins, superadmins)
  const canSeeAllLoads = user?.role === 'driver' || user?.role === 'admin' || user?.role === 'superadmin';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const loadsRes = await axios.get('/api/loads');
      // For non-customers, show all loads
      if (canSeeAllLoads) {
        setLoads(loadsRes.data.slice(0, 10));
      }
      // Filter user's own loads
      const userId = user?.id || user?._id;
      setMyLoads(loadsRes.data.filter(load => {
        const loadOwnerId = load.postedBy?._id || load.postedBy;
        return loadOwnerId === userId;
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 text-white">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
            Welcome back, {user?.name || 'Customer'}!
          </h1>
          <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
            {canSeeAllLoads
              ? 'Manage shipments and find freight opportunities'
              : 'Manage your shipments and find the best transport solutions'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <Link
            to="/post-load"
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center hover:shadow-2xl transition transform hover:scale-105 active:scale-[0.98]"
          >
            <div className="bg-white/20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Post New Load</h3>
            <p className="text-sm sm:text-base text-gray-800">Get instant quotes from transporters</p>
          </Link>

          <Link
            to="/load-board"
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center hover:shadow-2xl transition transform hover:scale-105 active:scale-[0.98]"
          >
            <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
              {canSeeAllLoads ? 'Browse Loads' : 'My Posted Loads'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {canSeeAllLoads ? 'View available freight opportunities' : 'View and manage your loads'}
            </p>
          </Link>

          <Link
            to="/truck-board"
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center hover:shadow-2xl transition transform hover:scale-105 active:scale-[0.98] sm:col-span-2 lg:col-span-1"
          >
            <div className="bg-green-100 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Find Trucks</h3>
            <p className="text-sm sm:text-base text-gray-600">Search available vehicles</p>
          </Link>
        </div>

        {/* My Loads Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Posted Loads</h2>
            <Link
              to="/post-load"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition text-center text-sm sm:text-base"
            >
              + Post Load
            </Link>
          </div>

          {myLoads.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {myLoads.map((load) => (
                <div key={load._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800">
                          {load.sourceCity} → {load.destinationCity}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Material:</span>
                          <span className="ml-1 sm:ml-2 font-semibold text-gray-800">{load.material}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Weight:</span>
                          <span className="ml-1 sm:ml-2 font-semibold text-gray-800">{load.weightMT || 'N/A'} MT</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <span className="ml-1 sm:ml-2 font-semibold text-gray-800">
                            {new Date(load.scheduledDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${load.status === 'open' ? 'bg-green-100 text-green-800' :
                            load.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                            {load.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/load/${load._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition w-full sm:w-auto text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </svg>
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-2">No Loads Yet</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Start posting your transport requirements</p>
              <Link
                to="/post-load"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition inline-block text-sm sm:text-base"
              >
                Post Your First Load
              </Link>
            </div>
          )}
        </div>

        {/* Available Loads Section - Only for drivers, admins, superadmins */}
        {canSeeAllLoads && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Available Loads</h2>
              <Link
                to="/load-board"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center text-sm sm:text-base"
              >
                View All
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {loads.slice(0, 5).map((load) => (
                <div key={load._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">
                        {load.sourceCity} → {load.destinationCity}
                      </h3>
                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span>📦 {load.material}</span>
                        <span>⚖️ {load.weightMT || 'N/A'} MT</span>
                        <span>📅 {new Date(load.scheduledDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/load/${load._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition text-sm w-full sm:w-auto text-center"
                      >
                        View Details
                      </Link>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 sm:px-6 py-2 rounded-lg font-semibold transition text-sm w-full sm:w-auto">
                        Quote Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
