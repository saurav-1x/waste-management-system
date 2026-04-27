import { Link } from 'react-router-dom';
import { FaCamera, FaChartLine, FaLocationDot, FaShieldHalved } from 'react-icons/fa6';
import heroImage from '../assets/hero.png';

const Home = () => {
  return (
    <main className="bg-gray-50">
      <section
        className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.86), rgba(17, 24, 39, 0.34)), url(${heroImage})` }}
      >
        <div className="container flex min-h-[calc(100vh-72px)] items-center px-4 py-16 mx-auto">
          <div className="max-w-2xl reveal-up">
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-green-200">
              Smart Civic Waste Reporting
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Waste Management System
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-100 md:text-xl">
              A simple platform for citizens to report garbage issues, upload evidence, share locations, and track complaint progress while administrators manage the cleanup workflow.
            </p>
            <div className="flex flex-col gap-3 mt-8 sm:flex-row">
              <Link
                to="/register"
                className="px-5 py-3 font-semibold text-center text-gray-900 bg-white rounded-lg hover-lift hover:bg-green-100"
              >
                Report an Issue
              </Link>
              <Link
                to="/about"
                className="px-5 py-3 font-semibold text-center text-white border border-white rounded-lg hover-lift hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-14 mx-auto">
        <div className="mb-8 reveal-up">
          <p className="text-sm font-semibold tracking-wide text-green-700 uppercase">How it helps</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">A cleaner process for cleaner neighborhoods</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm reveal-up hover-lift hover:border-green-300">
            <FaLocationDot className="mb-4 text-3xl text-green-600" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Location-Aware Reports</h3>
            <p className="text-sm leading-6 text-gray-600">Residents can enter an area manually or detect their current location while submitting a complaint.</p>
          </article>

          <article className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm reveal-up hover-lift hover:border-green-300" style={{ animationDelay: '90ms' }}>
            <FaCamera className="mb-4 text-3xl text-green-600" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Image Evidence</h3>
            <p className="text-sm leading-6 text-gray-600">Optional photo uploads help administrators understand the issue before assigning action.</p>
          </article>

          <article className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm reveal-up hover-lift hover:border-green-300" style={{ animationDelay: '180ms' }}>
            <FaChartLine className="mb-4 text-3xl text-green-600" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Status Tracking</h3>
            <p className="text-sm leading-6 text-gray-600">Users can follow complaints from pending to forwarded, resolved, or cancelled.</p>
          </article>

          <article className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm reveal-up hover-lift hover:border-green-300" style={{ animationDelay: '270ms' }}>
            <FaShieldHalved className="mb-4 text-3xl text-green-600" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Admin Control</h3>
            <p className="text-sm leading-6 text-gray-600">Admin users can review complaints, update statuses, forward items, and monitor analytics.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
