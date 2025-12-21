import React, { useState, useEffect } from 'react';
import axios from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ManageTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTruck, setEditingTruck] = useState(null);
  const [formData, setFormData] = useState({
    plateNumber: '',
    capacityWeight: '',
    model: '',
    truckSize: '',
    gpsAvailable: false,
    truckPhoto: '',
    status: 'available'
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin or superadmin
    if (!['admin', 'superadmin'].includes(user?.role)) {
      navigate('/');
      return;
    }
    fetchTrucks();
  }, [user, navigate]);

  const fetchTrucks = async () => {
    try {
      const response = await axios.get('/api/trucks');
      setTrucks(response.data);
    } catch (error) {
      console.error('Error fetching trucks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTruck) {
        await axios.put(`/api/trucks/${editingTruck._id}`, formData);
        alert('Truck updated successfully!');
      } else {
        await axios.post('/api/trucks', formData);
        alert('Truck added successfully!');
      }
      setShowModal(false);
      setEditingTruck(null);
      setFormData({ plateNumber: '', capacityWeight: '', model: '', truckSize: '', gpsAvailable: false, truckPhoto: '', status: 'available' });
      setPhotoPreview(null);
      fetchTrucks();
    } catch (error) {
      console.error('Error saving truck:', error);
      alert(error.response?.data?.message || 'Failed to save truck');
    }
  };

  const handleEdit = (truck) => {
    setEditingTruck(truck);
    setFormData({
      plateNumber: truck.plateNumber,
      capacityWeight: truck.capacityWeight,
      model: truck.model || '',
      truckSize: truck.truckSize || '',
      gpsAvailable: truck.gpsAvailable || false,
      truckPhoto: truck.truckPhoto || '',
      status: truck.status
    });
    setPhotoPreview(truck.truckPhoto || null);
    setShowModal(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, truckPhoto: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (truckId) => {
    if (!window.confirm('Are you sure you want to delete this truck?')) return;

    try {
      await axios.delete(`/api/trucks/${truckId}`);
      alert('Truck deleted successfully!');
      fetchTrucks();
    } catch (error) {
      console.error('Error deleting truck:', error);
      alert('Failed to delete truck');
    }
  };

  const handleStatusChange = async (truckId, newStatus) => {
    try {
      await axios.put(`/api/trucks/${truckId}`, { status: newStatus });
      fetchTrucks();
    } catch (error) {
      console.error('Error updating truck status:', error);
      alert('Failed to update truck status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Manage Trucks</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Total Trucks: <span className="font-bold text-blue-600">{trucks.length}</span></p>
          </div>
          <button
            onClick={() => {
              setEditingTruck(null);
              setFormData({ plateNumber: '', capacityWeight: '', model: '', truckSize: '', gpsAvailable: false, truckPhoto: '', status: 'available' });
              setPhotoPreview(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Truck
          </button>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-3 sm:space-y-4">
          {trucks.map((truck) => (
            <div key={truck._id} className="bg-white rounded-xl shadow-lg p-4 sm:p-5">
              <div className="flex gap-3 sm:gap-4">
                <img
                  src={truck.truckPhoto || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop'}
                  alt={truck.plateNumber}
                  className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{truck.plateNumber}</h3>
                    <select
                      value={truck.status}
                      onChange={(e) => handleStatusChange(truck._id, e.target.value)}
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border-0 cursor-pointer flex-shrink-0 ${truck.status === 'available' ? 'bg-green-100 text-green-800' :
                          truck.status === 'in_use' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}
                    >
                      <option value="available">Available</option>
                      <option value="in_use">In Use</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{truck.model || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{truck.truckSize || 'Not Specified'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="px-2 py-1 bg-gray-100 rounded-lg">⚖️ {truck.capacityWeight} kg</span>
                {truck.gpsAvailable ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg">📍 GPS</span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg">No GPS</span>
                )}
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(truck)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold text-xs sm:text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(truck._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold text-xs sm:text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <tr>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Photo</th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Plate Number</th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Model</th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Truck Size</th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Capacity</th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">GPS</th>
                  <th className="px-4 xl:px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-4 xl:px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trucks.map((truck, idx) => (
                  <tr key={truck._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                      <img
                        src={truck.truckPhoto || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop'}
                        alt={truck.plateNumber}
                        className="w-16 h-12 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {truck.plateNumber}
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {truck.model || 'N/A'}
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {truck.truckSize || 'Not Specified'}
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {truck.capacityWeight} kg
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                      {truck.gpsAvailable ? (
                        <span className="px-2 xl:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          ✓ Available
                        </span>
                      ) : (
                        <span className="px-2 xl:px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                          ✗ N/A
                        </span>
                      )}
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                      <select
                        value={truck.status}
                        onChange={(e) => handleStatusChange(truck._id, e.target.value)}
                        className={`px-2 xl:px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${truck.status === 'available' ? 'bg-green-100 text-green-800' :
                            truck.status === 'in_use' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}
                      >
                        <option value="available">Available</option>
                        <option value="in_use">In Use</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </td>
                    <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-center text-sm space-x-1 xl:space-x-2">
                      <button
                        onClick={() => handleEdit(truck)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 xl:px-4 py-2 rounded-lg font-semibold text-xs transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(truck._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 xl:px-4 py-2 rounded-lg font-semibold text-xs transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {trucks.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center text-gray-500">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
            </svg>
            <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No Trucks Yet</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Start by adding your first truck to the fleet</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {editingTruck ? 'Edit Truck' : 'Add New Truck'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingTruck(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Plate Number *
                </label>
                <input
                  type="text"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  required
                  disabled={editingTruck !== null}
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-base"
                  placeholder="e.g., ABC-123"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Model
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="e.g., Tata 407"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Truck Size / Type *
                </label>
                <select
                  value={formData.truckSize}
                  onChange={(e) => setFormData({ ...formData, truckSize: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                >
                  <option value="">Select Truck Size</option>
                  <option value="Tata Ace (ताटा ऐस)">Tata Ace (ताटा ऐस)</option>
                  <option value="6 Wheel / 7 Ton (6 व्हील)">6 Wheel / 7 Ton (6 व्हील)</option>
                  <option value="10 Wheel / 9-12 Ton (10 व्हील)">10 Wheel / 9-12 Ton (10 व्हील)</option>
                  <option value="12 Wheel / 15-18 Ton (12 व्हील)">12 Wheel / 15-18 Ton (12 व्हील)</option>
                  <option value="14 Wheel / 20-22 Ton (14 व्हील)">14 Wheel / 20-22 Ton (14 व्हील)</option>
                  <option value="16 Wheel / 24-25 Ton (16 व्हील)">16 Wheel / 24-25 Ton (16 व्हील)</option>
                  <option value="18 Wheel / 28-30 Ton (18 व्हील)">18 Wheel / 28-30 Ton (18 व्हील)</option>
                  <option value="20 Wheel / 32-35 Ton (20 व्हील)">20 Wheel / 32-35 Ton (20 व्हील)</option>
                  <option value="22 Wheel / 40 Ton (22 व्हील)">22 Wheel / 40 Ton (22 व्हील)</option>
                  <option value="Container 20ft (कंटेनर)">Container 20ft (कंटेनर)</option>
                  <option value="Container 32ft (कंटेनर)">Container 32ft (कंटेनर)</option>
                  <option value="Container 40ft (कंटेनर)">Container 40ft (कंटेनर)</option>
                  <option value="Trailer (ट्रेलर)">Trailer (ट्रेलर)</option>
                  <option value="Other (अन्य)">Other (अन्य)</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Select the truck size based on wheel count or container type</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Capacity Weight (kg) *
                </label>
                <input
                  type="number"
                  value={formData.capacityWeight}
                  onChange={(e) => setFormData({ ...formData, capacityWeight: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  GPS Tracking
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer py-1">
                    <input
                      type="radio"
                      checked={formData.gpsAvailable === true}
                      onChange={() => setFormData({ ...formData, gpsAvailable: true })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">GPS Available</span>
                  </label>
                  <label className="flex items-center cursor-pointer py-1">
                    <input
                      type="radio"
                      checked={formData.gpsAvailable === false}
                      onChange={() => setFormData({ ...formData, gpsAvailable: false })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No GPS</span>
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">Indicate if this truck has GPS tracking</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Truck Photo
                </label>
                <div className="space-y-2 sm:space-y-3">
                  {photoPreview && (
                    <div className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, truckPhoto: '' });
                          setPhotoPreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500">Upload truck photo (max 5MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                >
                  <option value="available">Available</option>
                  <option value="in_use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTruck(null);
                    setPhotoPreview(null);
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-sm sm:text-base"
                >
                  {editingTruck ? 'Update' : 'Add'} Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
