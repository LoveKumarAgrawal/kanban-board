import Link from "next/link";

export default function Hero() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center">
        {/* Navbar */}
        <nav className="w-full absolute top-0 p-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">SaaSify</div>
          <div className="">
            <Link
              href="/login"
              className="text-blue-900 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </div>
        </nav>
  
        {/* Hero Section */}
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Build Your Dream SaaS Product
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            SaaSify is the all-in-one platform to build, launch, and scale your
            software-as-a-service product. Get started today and take your business
            to the next level.
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
  
        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Easy to Use
            </h2>
            <p className="text-gray-700">
              Intuitive interface designed for both beginners and experts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Scalable Infrastructure
            </h2>
            <p className="text-gray-700">
              Grow your product without worrying about performance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Secure & Reliable
            </h2>
            <p className="text-gray-700">
              Enterprise-grade security to protect your data.
            </p>
          </div>
        </div>
      </div>
    );
  }

