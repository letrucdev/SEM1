"use client";
import Image from "next/image";
export default function OurDentistPage() {
  const dentists = Array(9).fill({
    name: "Dr. Essence Page",
    title: "DDS, California - Linda University",
  });
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img
          src="/OurDentist.png" // Replace with your actual image path
          alt="Banner Home"
          width={1200}
          height={600}
          className="object-cover w-full h-full"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center pl-8 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Our Dentist</h1>
          <p className="mt-2 text-sm md:text-lg md:w-1/3">
            Our dedicated team of experienced dentists and friendly staff is
            committed to providing exceptional dental care tailored to your
            unique needs.
          </p>
        </div>
      </div>
      <header className="text-center py-8 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          At Belleville Dental Care, we’re happiest when we’re working.
        </h1>
        <p className="mt-2 text-gray-600">
          Belleville Dental Care is a lively place. When you visit our dentist
          and dental team in Belleville, we want you to have a good time.
        </p>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dentists.map((dentist, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden text-center"
            >
              <img
                src="/doctor.png"
                alt={dentist.name}
                className="w-full h-100 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {dentist.name}
                </h2>
                <p className="text-sm text-gray-500">{dentist.title}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
