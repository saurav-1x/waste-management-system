import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaLock, FaSave, FaUnlock } from 'react-icons/fa';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const isEmailLocked = Boolean(user?.email);
  const isPhoneLocked = Boolean(user?.phone);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: user.email,
        phone: isPhoneLocked ? user.phone : form.phone,
        address: form.address
      };
      const response = await axios.patch('/api/profile', payload);
      updateUser(response.data);
      toast.success('Profile updated successfully');
      navigate('/my-profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Link to="/my-profile" className="inline-flex items-center gap-2 mb-5 text-green-700 hover:text-green-900">
          <FaArrowLeft /> Back to profile
        </Link>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl reveal-up">
          <div className="p-6 text-white bg-green-700">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="mt-2 text-green-50">Update your personal details. Email is permanent, and phone locks after the first save.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 p-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-3 border rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-gray-700">Email</label>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                  <FaLock /> Locked after registration
                </span>
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                disabled={isEmailLocked}
                className="w-full px-3 py-3 text-gray-500 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-gray-700">Phone</label>
                <span className={`inline-flex items-center gap-1 text-sm ${isPhoneLocked ? 'text-gray-500' : 'text-green-700'}`}>
                  {isPhoneLocked ? <FaLock /> : <FaUnlock />}
                  {isPhoneLocked ? 'Locked after first save' : 'Can be saved once'}
                </span>
              </div>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                disabled={isPhoneLocked}
                placeholder="Enter phone number"
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none ${
                  isPhoneLocked
                    ? 'text-gray-500 bg-gray-100 cursor-not-allowed'
                    : 'focus:border-green-500 focus:ring-2 focus:ring-green-100'
                }`}
              />
              {!isPhoneLocked && (
                <p className="mt-2 text-sm text-amber-700">After you save a phone number, it cannot be changed from this page.</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="4"
                placeholder="Add your address or locality"
                className="w-full px-3 py-3 border rounded-lg resize-none focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
