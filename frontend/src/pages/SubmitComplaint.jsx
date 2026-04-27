import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import axios from '../api/axios';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    area: '',
    city: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location detection is not supported in this browser');
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = coords.latitude.toFixed(6);
        const longitude = coords.longitude.toFixed(6);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.address || {};
          const area =
            address.neighbourhood ||
            address.suburb ||
            address.road ||
            address.city_district ||
            data.display_name ||
            `${latitude}, ${longitude}`;
          const city =
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            address.state_district ||
            '';

          setFormData((current) => ({
            ...current,
            area,
            city
          }));
          toast.success('Location detected');
        } catch {
          setFormData((current) => ({
            ...current,
            area: `${latitude}, ${longitude}`
          }));
          toast.success('Coordinates detected');
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        setDetectingLocation(false);
        toast.error(error.message || 'Unable to detect location');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', JSON.stringify({
      area: formData.area,
      city: formData.city
    }));
    data.append('description', formData.description);
    if (image) data.append('image', image);

    try {
      await axios.post('/api/complaints', data);
      toast.success('Complaint submitted successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Error submitting complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="container max-w-2xl px-4 mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold">Submit New Complaint</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
                <label className="text-gray-700">Area/Locality</label>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={detectingLocation}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-green-700 border border-green-600 rounded-lg hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaLocationCrosshairs aria-hidden="true" />
                  {detectingLocation ? 'Detecting...' : 'Detect my location'}
                </button>
              </div>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
                placeholder="e.g., Sector 15, Indira Nagar"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border rounded-lg"
                required
                placeholder="Describe the waste/garbage issue..."
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Upload Image (Optional)</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
