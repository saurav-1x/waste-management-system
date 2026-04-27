import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ComplaintCard from '../components/ComplaintCard';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  const fetchComplaints = useCallback(async () => {
    try {
      const response = await axios.get('/api/complaints/my-complaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this complaint?')) return;

    try {
      setCancelingId(id);
      const response = await axios.patch(`/api/complaints/${id}/cancel`);
      setComplaints((currentComplaints) =>
        currentComplaints.map((complaint) =>
          complaint._id === id ? response.data : complaint
        )
      );
      toast.success('Complaint cancelled');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling complaint');
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Complaints</h1>
          <Link
            to="/submit-complaint"
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            + Submit Complaint
          </Link>
        </div>
        
        {complaints.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-lg">
            <p className="text-gray-600">No complaints submitted yet.</p>
            <Link to="/submit-complaint" className="inline-block mt-2 text-green-600 hover:underline">
              Submit your first complaint
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                isAdmin={false}
                onCancel={handleCancel}
                canceling={cancelingId === complaint._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
