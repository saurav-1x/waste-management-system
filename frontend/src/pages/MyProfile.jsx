import ProfileCard from '../components/ProfileCard';

const MyProfile = () => {
  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto mb-6">
        <p className="text-sm font-semibold tracking-wide text-green-700 uppercase">My Account</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Profile Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your public complaint details and contact information.</p>
      </div>
      <ProfileCard />
    </div>
  );
};

export default MyProfile;
