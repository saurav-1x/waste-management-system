// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter cards
        document.querySelectorAll('.complaint-card').forEach(card => {
            const status = card.getAttribute('data-status');
            if (filter === 'all' || status === filter) {
                card.style.display = '';
                setTimeout(() => card.classList.add('show'), 10);
            } else {
                card.classList.remove('show');
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Forward complaint to municipality
async function forwardComplaint(complaintId) {
    if (confirm('Forward this complaint to the nearest municipality?')) {
        try {
            const response = await fetch(`/api/admin/complaints/${complaintId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Forwarded' })
            });
            
            if (response.ok) {
                alert('✅ Complaint forwarded to municipality successfully!');
                location.reload();
            } else {
                alert('❌ Error forwarding complaint');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error forwarding complaint');
        }
    }
}

// Resolve complaint
async function resolveComplaint(complaintId) {
    if (confirm('Mark this complaint as resolved?')) {
        try {
            const response = await fetch(`/api/admin/complaints/${complaintId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Resolved' })
            });
            
            if (response.ok) {
                alert('✅ Complaint marked as resolved!');
                location.reload();
            } else {
                alert('❌ Error resolving complaint');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error resolving complaint');
        }
    }
}

// Cancel complaint
async function cancelComplaint(complaintId) {
    if (confirm('Cancel this complaint?')) {
        try {
            const response = await fetch(`/api/admin/complaints/${complaintId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Cancelled' })
            });
            
            if (response.ok) {
                alert('✅ Complaint cancelled!');
                location.reload();
            } else {
                alert('❌ Error cancelling complaint');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error cancelling complaint');
        }
    }
}

// Delete complaint
async function deleteComplaint(complaintId) {
    if (confirm('⚠️ Are you sure you want to delete this complaint? This action cannot be undone!')) {
        try {
            const response = await fetch(`/api/admin/complaints/${complaintId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('✅ Complaint deleted successfully!');
                location.reload();
            } else {
                alert('❌ Error deleting complaint');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting complaint');
        }
    }
}
