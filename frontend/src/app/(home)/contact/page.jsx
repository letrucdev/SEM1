"use client";
import Image from "next/image";
export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          {/* Display banner image */}
          <Image
            src="/Contact.png" // Replace with your actual image path
            alt="Banner Home"
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center pl-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">Contact Us</h1>
            <p className="mt-2 text-sm md:text-lg">
            Send us an email or give us a call!            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-center bg-white py-10 px-4 md:px-10">
          <div className="w-full max-w-3xl bg-white   p-6 md:p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-6 text-black">
              SEND US YOUR QUESTIONS & COMMENTS
            </h1>
            <p className="text-center text-gray-600 mb-8">
              We are proud to provide a state-of-the-art facility for the
              highest quality dental care available. Contact us today for any of
              your dental needs!
            </p>

            {/* Contact Form */}
            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Your Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  rows="5"
                  placeholder="Your message"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Additional Information Section */}
          <div className="w-full max-w-md mt-12 md:mt-0 md:ml-10">
            {/* Opening Hours */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold mb-4 text-blue-600">
                Opening Hours
              </h3>
              <ul className="space-y-2 border-b-2">
                <li className="flex justify-between text-black">
                  <span>Monday</span>
                  <span>9:00am - 6:00pm</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Tuesday</span>
                  <span>CLOSED</span>
                </li>
                <li className="flex justify-between text-black">
                  <span>Wednesday</span>
                  <span>9:00am - 6:00pm</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Thursday</span>
                  <span>CLOSED</span>
                </li>
                <li className="flex justify-between text-black">
                  <span>Friday</span>
                  <span>9:00am - 6:00pm</span>
                </li>
                <li className="flex justify-between text-black">
                  <span>Saturday</span>
                  <span>9:00am - 2:00pm</span>
                </li>
                <li className="flex justify-between text-black">
                  <span>Sunday</span>
                  <span>9:00am - 2:00pm</span>
                </li>
              </ul>
              
              {/* Contact Details */}

              <h3 className="text-lg font-bold mb-4 text-blue-600">
                Contact Details
              </h3>
              <p className="mb-2 font-semibold text-black">
                <span>Email:</span> dental@mail.com
              </p>
              <p className="font-semibold text-black">
                <span>Phone:</span> (613) 689-9908
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
