import { Link } from 'react-router-dom';
import { FaClipboardCheck, FaPeopleGroup, FaRecycle } from 'react-icons/fa6';
import heroImage from '../assets/hero.png';

const About = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container grid items-center gap-10 px-4 py-12 mx-auto lg:grid-cols-2">
        <div className="reveal-up">
          <p className="text-sm font-semibold tracking-wide text-green-700 uppercase">About the project</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900">
            Built to connect citizens and waste management teams
          </h1>
          <p className="mt-5 leading-8 text-gray-700">
            This Waste Management System is a MERN-style web application for reporting local garbage and cleanliness issues. It gives users a direct way to submit complaints with location details and images, while administrators get tools to review, forward, resolve, or remove complaints.
          </p>
          <p className="mt-4 leading-8 text-gray-700">
            The goal is to reduce delays, improve transparency, and make it easier for municipal teams or campus maintenance teams to identify repeated problem areas.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg reveal-up hover-lift">
          <img
            src={heroImage}
            alt="Waste management workers and clean city environment"
            className="object-cover w-full h-full max-h-[430px]"
          />
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-200">
        <div className="container grid gap-6 px-4 mx-auto md:grid-cols-3">
          <article className="p-5 border border-gray-200 rounded-lg reveal-up hover-lift hover:border-green-300">
            <FaPeopleGroup className="mb-4 text-3xl text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">For Citizens</h2>
            <p className="leading-7 text-gray-600">Create an account, submit complaints, upload optional images, and track the latest status from your dashboard.</p>
          </article>

          <article className="p-5 border border-gray-200 rounded-lg reveal-up hover-lift hover:border-green-300" style={{ animationDelay: '90ms' }}>
            <FaClipboardCheck className="mb-4 text-3xl text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">For Admins</h2>
            <p className="leading-7 text-gray-600">Review all complaints, change statuses, forward work items, delete invalid entries, and view complaint analytics.</p>
          </article>

          <article className="p-5 border border-gray-200 rounded-lg reveal-up hover-lift hover:border-green-300" style={{ animationDelay: '180ms' }}>
            <FaRecycle className="mb-4 text-3xl text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">For Communities</h2>
            <p className="leading-7 text-gray-600">Build a shared record of waste issues so cleanup teams can act faster and plan better routes.</p>
          </article>
        </div>
      </section>

      <section className="container px-4 py-12 mx-auto">
        <div className="flex flex-col gap-5 p-6 text-white bg-green-700 rounded-lg reveal-up md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Ready to report a waste issue?</h2>
            <p className="mt-2 text-green-50">Create a complaint and help keep your area clean.</p>
          </div>
          <Link
            to="/submit-complaint"
            className="px-5 py-3 font-semibold text-center text-green-800 bg-white rounded-lg hover-lift hover:bg-green-100"
          >
            Submit Complaint
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
