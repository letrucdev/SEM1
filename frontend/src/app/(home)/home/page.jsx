"use client";
import Image from "next/image";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src="/Banner.png" // Replace with your actual image path
            alt="Banner Home"
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center pl-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold md:w-1/4">
              Exceptional dental care for all ages
            </h1>
            <p className="mt-2 text-sm md:text-lg md:w-1/2">
              Exceptional dental care for all ages. Your great smile begins with
              a great dentist.
            </p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center justify-between px-7 py-12 max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-4 text-black">
              Welcome to Belleville Dental Care
            </h1>
            <p className="text-gray-600">
              Come to us for the personalized dental care you need and deserve.
              Our dental team looks forward to meeting you. Visit our Belleville
              dental office. We can't wait to welcome you to our dental family.
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <div className="mb-4 ">
              <h2 className="text-xl font-bold text-black">
                Belleville Dental Care
              </h2>
              <p className="text-yellow-500">5.0 ⭐⭐⭐⭐⭐ Google reviews</p>
              <p className="text-gray-600 md:w-2/3">
                135 Victoria Ave, Belleville, ON K8N 2B1 CA
              </p>
            </div>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium block mb-4 "
            >
              Get Directions →
            </a>

            <Image
              src="/DentalFeedback.png" // Replace with your actual image path
              alt="Dental Office"
              width={600}
              height={300}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Our Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Exceptional dental care for all ages. Your great smile begins with
              a great dentist.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <Image
                src="/service.png" // Replace with your actual image path
                alt="Dental Patient"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Services List */}
            <div className="w-full md:w-1/2 space-y-6">
              {[
                {
                  title: "Wisdom Teeth Removal",
                  description:
                    "Everything you expect and then some. Cleanings, fillings, and x-rays.",
                },
                {
                  title: "Preventative Dentistry",
                  description:
                    "Everything you expect and then some. Cleanings, fillings, and x-rays.",
                },
                {
                  title: "Oral Surgery",
                  description:
                    "Everything you expect and then some. Cleanings, fillings, and x-rays.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full">
                    <svg
                      width="22"
                      height="25"
                      viewBox="0 0 22 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.3598 2.8295C17.9505 -0.347847 14.2771 -0.35978 11.2481 1.30552C11.001 1.44446 10.7218 1.51162 10.4405 1.49979C10.1592 1.48797 9.88627 1.39762 9.65099 1.2384C8.49546 0.449379 7.2903 -0.109574 5.13898 0.411345C0.623347 1.50464 -6.10352e-05 5.0806 -6.10352e-05 9.15138C0.0796743 12.2952 0.500796 15.42 1.25545 18.4675C2.11829 22.0949 3.90376 24.0667 5.43348 24.0667C6.9632 24.0667 7.00957 22.2974 7.00957 20.8868C7.00957 19.2953 7.39499 14.9206 10.8641 14.9206C13.5316 14.9206 14.3333 18.5003 14.3333 20.8868C14.3329 23.167 15.1722 24.0667 16.6628 24.0667C19.5266 24.0667 20.9796 15.5102 21.3719 13.2531C21.7642 10.996 22.9882 6.29546 20.3598 2.8295Z"
                        fill="#10375C"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Services Button */}
          <div className="text-center mt-8">
            <button className="px-8 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">
              All Services
            </button>
          </div>
        </div>
        {/* About US */}
        <div className="flex flex-col md:flex-row items-center justify-between px-7 py-12 max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4 text-black">About Us</h1>
            <p className="text-gray-600 md:w-3/4 text-2xl">
              At Dentist, we’re more than just a dental practice—we’re a
              compassionate team committed to helping you achieve lifelong oral
              health and a smile you’re proud of. With a focus on personalized,
              patient-centered care, we strive to make each visit a comfortable
              and positive experience
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:flex-row items-center justify-center py-12 px-6">
            <div className="w-full">
              <Image
                src="/about.png" // Replace with your actual image path
                alt="Dental Patient"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="bg-white py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Our Dentist</h1>
            <button className="px-10 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">
              Meet More
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Dr. Essence Page",
                qualification: "DDS, California - Loma University",
              },
              {
                name: "Dr. Essence Page",
                qualification: "DDS, California - Loma University",
              },
              {
                name: "Dr. Essence Page",
                qualification: "DDS, California - Loma University",
              },
            ].map((dentist, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white shadow-md rounded-lg p-6"
              >
                <Image
                  src="/doctor.png" // Replace with your actual image path
                  alt="About Dental"
                  width={600}
                  height={400}
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {dentist.name}
                </h3>
                <p className="text-gray-600 text-sm">{dentist.qualification}</p>
              </div>
            ))}
          </div>

          {/* Latest Documents & Research Section */}
          <div className="w-full max-w-6xl mx-auto mt-16 ">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Read Latest Document & Research
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "What is Population Health Management?",
                  description:
                    "It’s easy to think about medical care from an episodic perspective. You go to the hospital...",
                  image: "/images/research-placeholder1.jpg", // Replace with the actual image path
                },
                {
                  title: "What is Population Health Management?",
                  description:
                    "It’s easy to think about medical care from an episodic perspective. You go to the hospital...",
                  image: "/images/research-placeholder2.jpg", // Replace with the actual image path
                },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <Image
                    src="/detail.png"
                    alt={doc.title}
                    width={200}
                    height={100}
                    className="w-1/3 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {doc.description}
                    </p>
                    <a
                      href="#"
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4">
              <a href="#" className="text-blue-500 hover:underline font-medium">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
