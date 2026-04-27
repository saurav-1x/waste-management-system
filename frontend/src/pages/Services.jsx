import { Link } from 'react-router-dom';
import {
  FaBell,
  FaCamera,
  FaChartPie,
  FaClipboardList,
  FaLocationCrosshairs,
  FaRoute,
  FaTruck,
  FaUserShield
} from 'react-icons/fa6';
import heroImage from '../assets/hero.png';

const services = [
  {
    icon: FaClipboardList,
    title: 'Complaint Registration',
    description: 'Citizens can submit waste-related complaints with area, city, description, and optional image proof.'
  },
  {
    icon: FaLocationCrosshairs,
    title: 'Location Detection',
    description: 'The complaint form can detect the user location and fill location details faster for accurate reporting.'
  },
  {
    icon: FaCamera,
    title: 'Photo Evidence',
    description: 'Image uploads help teams understand the size, type, and urgency of waste collection issues.'
  },
  {
    icon: FaTruck,
    title: 'Forwarding Workflow',
    description: 'Admins can forward complaints to the right team and move issues through pending, forwarded, and resolved states.'
  },
  {
    icon: FaBell,
    title: 'Status Updates',
    description: 'Users can monitor complaint progress from their dashboard and cancel pending complaints when needed.'
  },
  {
    icon: FaChartPie,
    title: 'Admin Analytics',
    description: 'The admin panel summarizes complaint activity so teams can spot repeated problem areas and workload patterns.'
  }
];

const Services = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <img
          src={heroImage}
          alt="Clean waste management service background"
          className="absolute inset-0 object-cover w-full h-full opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/85 to-green-900/55" />
        <div className="container relative px-4 py-20 mx-auto reveal-up">
          <p className="text-sm font-semibold tracking-wide uppercase text-green-200">Our Services</p>
          <h1 className="max-w-3xl mt-3 text-4xl font-bold leading-tight md:text-6xl">
            Digital tools for faster waste issue reporting and resolution
          </h1>
          <p className="max-w-2xl mt-5 text-lg leading-8 text-gray-100">
            The platform brings complaint submission, location capture, image evidence, status tracking, and admin management into one simple workflow.
          </p>
          <div className="flex flex-col gap-3 mt-8 sm:flex-row">
            <Link
              to="/submit-complaint"
              className="px-5 py-3 font-semibold text-center text-gray-900 bg-white rounded-lg hover-lift hover:bg-green-100"
            >
              Submit Complaint
            </Link>
            <Link
              to="/about"
              className="px-5 py-3 font-semibold text-center text-white border border-white rounded-lg hover-lift hover:bg-white/10"
            >
              About Project
            </Link>
          </div>
        </div>
      </section>

      <section className="container px-4 py-14 mx-auto">
        <div className="max-w-3xl mb-8 reveal-up">
          <p className="text-sm font-semibold tracking-wide text-green-700 uppercase">Service Modules</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Everything needed to report, manage, and track complaints</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm reveal-up hover-lift hover:border-green-300"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-5 text-xl text-white bg-green-600 rounded-lg">
                  <Icon />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="leading-7 text-gray-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-14 bg-white border-y border-gray-200">
        <div className="container grid gap-8 px-4 mx-auto lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="reveal-up">
            <p className="text-sm font-semibold tracking-wide text-green-700 uppercase">Workflow</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">From report to resolution</h2>
            <p className="mt-4 leading-8 text-gray-700">
              Each service is designed around a practical municipal workflow: collect the complaint, verify the details, forward it to the right team, update the status, and keep a record for planning.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg reveal-up hover-lift">
              <FaRoute className="mb-3 text-3xl text-green-600" />
              <h3 className="font-semibold text-gray-900">1. Locate</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">Capture the affected area and city clearly.</p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg reveal-up hover-lift" style={{ animationDelay: '90ms' }}>
              <FaClipboardList className="mb-3 text-3xl text-green-600" />
              <h3 className="font-semibold text-gray-900">2. Submit</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">Send a detailed complaint with optional image evidence.</p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg reveal-up hover-lift" style={{ animationDelay: '180ms' }}>
              <FaUserShield className="mb-3 text-3xl text-green-600" />
              <h3 className="font-semibold text-gray-900">3. Manage</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">Admins review, forward, resolve, and track outcomes.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
