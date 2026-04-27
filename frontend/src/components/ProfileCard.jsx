import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaIdBadge,
  FaLocationDot,
  FaPenToSquare,
  FaPhone,
  FaShieldHalved,
  FaUserCheck
} from 'react-icons/fa6';

const ProfileCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const completedFields = [user.name, user.email, user.phone, user.address].filter(Boolean).length;
  const completion = Math.round((completedFields / 4) * 100);
  const initials = user.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <section className="max-w-5xl mx-auto overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl reveal-up">
      <div className="p-6 text-white bg-gradient-to-r from-green-700 to-emerald-600">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-green-800 bg-white rounded-full shadow-md">
              {initials}
            </div>
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-semibold text-green-900 bg-green-100 rounded-full">
                <FaShieldHalved /> {user.role}
              </p>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="mt-1 text-green-50">{user.email}</p>
            </div>
          </div>

          <Link
            to="/edit-profile"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-green-800 bg-white rounded-lg hover-lift hover:bg-green-100"
          >
            <FaPenToSquare /> Edit Profile
          </Link>
        </div>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-gray-200 rounded-lg hover-lift">
              <FaEnvelope className="mb-3 text-2xl text-green-600" />
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900 break-all">{user.email}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover-lift">
              <FaPhone className="mb-3 text-2xl text-green-600" />
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-900">{user.phone || 'Not added yet'}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover-lift sm:col-span-2">
              <FaLocationDot className="mb-3 text-2xl text-green-600" />
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold text-gray-900">{user.address || 'Add your address for faster complaint follow-up'}</p>
            </div>
          </div>
        </div>

        <aside className="p-5 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Profile completion</p>
              <p className="text-2xl font-bold text-gray-900">{completion}%</p>
            </div>
            <FaUserCheck className="text-4xl text-green-600" />
          </div>
          <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
            <div className="h-full bg-green-600 rounded-full" style={{ width: `${completion}%` }} />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <FaIdBadge className="mb-2 text-green-600" />
              <p className="text-xs text-gray-500">Account type</p>
              <p className="font-semibold capitalize">{user.role}</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <FaPhone className="mb-2 text-green-600" />
              <p className="text-xs text-gray-500">Phone lock</p>
              <p className="font-semibold">{user.phone ? 'Locked' : 'Available'}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Email is locked after registration. Phone can be added once, then it becomes locked for account safety.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default ProfileCard;
