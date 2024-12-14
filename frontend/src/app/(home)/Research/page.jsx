"use client";
import Image from "next/image";
export default function ResearchPage() {
  const articles = Array(6).fill({
    title: "The Link Between Stress and Oral Health: A Closer Look",
    description:
      "Did you know that chronic stress can take a toll on your oral health and gums? This research dives into the unexpected connection between stress and oral health, exploring key conditions like bruxism (teeth grinding), gum inflammation, and other concerns driven by heightened stress levels. Uncover the science behind this stress-oral health relationship and discover tips to protect your smile in high-pressure times.",
    imgSrc: "/DetailService.png", // Replace with your image path
  });
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src="/Research.png" // Replace with your actual image path
            alt="Banner Home"
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center pl-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">Research</h1>
            <p className="mt-2 text-sm md:text-lg md:w-1/3">
              Here, we provide a comprehensive collection of resources designed
              to support your curiosity and academic pursuits.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Explore Our Research Resources
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Whether you're a student, professional, or enthusiast, our curated
            collection empowers you with the tools and information needed to
            deepen your understanding and drive innovation. Start exploring
            today and uncover the knowledge you need to excel in your field!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={article.imgSrc}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
