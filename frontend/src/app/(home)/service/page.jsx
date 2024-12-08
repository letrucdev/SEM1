"use client";
import Image from "next/image";
export default function ServicePage() {
  const services = [
    {
      title: "Dental Bonding for Small Chips or Cracks",
      description:
        "Dental bonding is a cosmetic procedure designed to repair small chips, cracks, or other imperfections in teeth.",
      image: "/path-to-dental-bonding-image.jpg", // Replace with your image path
    },
    {
      title: "Crowns & Bridgework",
      description:
        "To replace large amounts of lost tooth structure and/or missing teeth.",
      image: "/path-to-crowns-image.jpg",
    },
    {
      title: "Dental Implants",
      description:
        "Dental implants are a highly effective and long-lasting solution for replacing missing teeth.",
      image: "/path-to-implants-image.jpg",
    },
    {
      title: "Dental Fillings: Restoring Tooth Health and Function",
      description:
        "Dental fillings are a common and effective treatment used to restore teeth damaged by cavities, decay, or minor fractures.",
      image: "/path-to-fillings-image.jpg",
    },
    {
      title: "Oral Cancer Screenings",
      description:
        "Oral cancer screenings are quick, non-invasive exams performed during routine dental check-ups to detect early signs of cancer in the mouth and throat.",
      image: "/path-to-screenings-image.jpg",
    },
    {
      title: "Orthodontic Treatment: Aligning Your Smile",
      description:
        "Orthodontic treatment corrects misaligned teeth and jaws to improve appearance, functionality, and oral health.",
      image: "/path-to-orthodontic-image.jpg",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img
          src="/OurServiceBanner.png" // Replace with your actual image path
          alt="Banner Home"
          width={1200}
          height={600}
          className="object-cover w-full h-full"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center pl-8 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Our Services</h1>
          <p className="mt-2 text-sm md:text-lg">
            Browse the services we offer below
          </p>
        </div>
      </div>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            We’ve got you covered
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Regular dental visits are essential to make sure oral health
            problems — from tooth decay to oral cancer — are detected and
            treated in a timely manner. At our office, your oral health is our
            paramount concern. We want to make sure your teeth stay healthy,
            function well and look great! From regular cleanings and exams to
            advanced restorative treatments, all of your routine dental needs
            can be met right here.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src="/DetailService.png"
                  width={300}
                  height={100}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-950 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
