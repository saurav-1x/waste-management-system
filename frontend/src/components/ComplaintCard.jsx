import { API_BASE_URL } from '../api/axios';

const ComplaintCard = ({
  complaint,
  onStatusChange,
  onDelete,
  onCancel,
  isAdmin,
  canceling = false
}) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-500';
      case 'Forwarded': return 'bg-blue-500';
      case 'Resolved': return 'bg-green-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      {complaint.imagePath && (
        <img 
          src={`${API_BASE_URL}${complaint.imagePath}`}
          alt="Complaint"
          className="object-cover w-full h-48"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{complaint.name}</h3>
          <span className={`${getStatusColor(complaint.status)} text-white px-2 py-1 rounded-full text-xs`}>
            {complaint.status}
          </span>
        </div>
        
        <p className="mb-2 text-sm text-gray-600">
          📍 {complaint.location.area}, {complaint.location.city}
        </p>
        
        <p className="mb-3 text-gray-700">{complaint.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>📅 {formatDate(complaint.createdAt)}</span>
          
          {isAdmin && (
            <div className="flex gap-2">
              <select
                value={complaint.status}
                onChange={(e) => onStatusChange(complaint._id, e.target.value)}
                className="px-2 py-1 text-sm border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Forwarded">Forwarded</option>
                <option value="Resolved">Resolved</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => onDelete(complaint._id)}
                className="px-2 text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          )}

          {!isAdmin && complaint.status === 'Pending' && (
            <button
              onClick={() => onCancel(complaint._id)}
              disabled={canceling}
              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {canceling ? 'Cancelling...' : 'Cancel'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
