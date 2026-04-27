import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ComplaintCard from '../components/ComplaintCard';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [analytics, setAnalytics] = useState({
    total: 0,
    pending: 0,
    forwarded: 0,
    resolved: 0,
    cancelled: 0
  });
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
    try {
      const response = await axios.get('/api/admin/complaints');
      setComplaints(response.data);
    } catch {
      toast.error('Error fetching complaints');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await axios.get('/api/admin/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
    fetchAnalytics();
  }, [fetchAnalytics, fetchComplaints]);

  const filteredComplaints = useMemo(() => {
    let filtered = [...complaints];
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    return filtered;
  }, [searchTerm, statusFilter, complaints]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/admin/complaints/${id}`, { status: newStatus });
      toast.success('Status updated');
      fetchComplaints();
      fetchAnalytics();
    } catch {
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this complaint?')) {
      try {
        await axios.delete(`/api/admin/complaints/${id}`);
        toast.success('Complaint deleted');
        fetchComplaints();
        fetchAnalytics();
      } catch {
        toast.error('Error deleting complaint');
      }
    }
  };

  const handleSelectComplaint = (id) => {
    setSelectedComplaints(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedComplaints.length === filteredComplaints.length) {
      setSelectedComplaints([]);
    } else {
      setSelectedComplaints(filteredComplaints.map(c => c._id));
    }
  };

  const handleBulkForward = async () => {
    if (selectedComplaints.length === 0) {
      toast.error('Select at least one complaint');
      return;
    }
    
    const municipality = prompt('Enter municipality name:', 'Local Municipality');
    if (!municipality) return;
    
    try {
      await axios.post('/api/admin/complaints/bulk-forward', {
        complaintIds: selectedComplaints,
        municipality
      });
      toast.success(`${selectedComplaints.length} complaints forwarded`);
      setSelectedComplaints([]);
      fetchComplaints();
      fetchAnalytics();
    } catch {
      toast.error('Error forwarding complaints');
    }
  };

  const handleForwardAll = async () => {
    const municipality = prompt('Enter municipality name:', 'Local Municipality');
    if (!municipality) return;
    
    try {
      await axios.post('/api/admin/complaints/bulk-forward', {
        complaintIds: 'all',
        municipality
      });
      toast.success('All pending complaints forwarded');
      fetchComplaints();
      fetchAnalytics();
    } catch {
      toast.error('Error forwarding complaints');
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-5">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Total Complaints</p>
            <p className="text-2xl font-bold">{analytics.total}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{analytics.pending}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Forwarded</p>
            <p className="text-2xl font-bold text-blue-600">{analytics.forwarded}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Resolved</p>
            <p className="text-2xl font-bold text-green-600">{analytics.resolved}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{analytics.cancelled}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 mb-6 bg-white rounded-lg shadow">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Forwarded">Forwarded</option>
              <option value="Resolved">Resolved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            
            {selectedComplaints.length > 0 && (
              <button
                onClick={handleBulkForward}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Forward Selected ({selectedComplaints.length})
              </button>
            )}
            
            <button
              onClick={handleForwardAll}
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Forward All Pending
            </button>
          </div>
        </div>

        {/* Select All */}
        <div className="mb-4">
          <button onClick={handleSelectAll} className="text-blue-600">
            {selectedComplaints.length === filteredComplaints.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredComplaints.map((complaint) => (
            <div key={complaint._id} className="relative">
              <input
                type="checkbox"
                checked={selectedComplaints.includes(complaint._id)}
                onChange={() => handleSelectComplaint(complaint._id)}
                className="absolute z-10 w-5 h-5 top-2 left-2"
              />
              <ComplaintCard
                complaint={complaint}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                isAdmin={true}
              />
            </div>
          ))}
        </div>
        
        {filteredComplaints.length === 0 && (
          <div className="py-12 text-center bg-white rounded-lg">
            <p className="text-gray-600">No complaints found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
