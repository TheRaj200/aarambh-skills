import React from 'react'

const stats = [
  { value: '3.5', label: 'Years Experience' },
  { value: '23', label: 'Global Course' },
  { value: '830+', label: 'Positive Reviews' },
  { value: '100K', label: 'Trusted Students' }
]

export default function Content() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between flex-col lg:flex-row items-center gap-8">
        {/* Left Column */}
        <div className="space-y-8   lg:w-1/2">
          {/* Hero Section */}
          <div className="bg-white h-full lg:w-full shadow-inner hover:shadow-2xl drop-shadow-2xl flex gap-5 flex-col rounded-lg p-8 lg:py-24">
            <h3 className="text-lg font-semibold text-[#020A47]">How it Started</h3>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Our Dream is Global Learning Transformation
            </h2>
            <p className="mt-4 text-gray-600">
             Lorem ipsum dolor sit amet consectetur  aliquam? Earum labore quibusdam harum voluptatem ipsam ipsa distinctio!  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

        
         
        </div>

        {/* Right Column - Image */}
        <div className="relative lg:w-[45%]">
          <img
            src="./images/WebDevelopment1.png"
            alt="Web Development Illustration"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className='shadow-2xl  '>
          <div className="grid grid-cols-2 shadow-inner  drop-shadow-lg p-5 md:p-10 gap-10">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl p-6">
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="flex flex-col md:flex-row justify-evenly gap-12 mt-12">
        <div className="bg-white rounded-lg shadow-inner hover:shadow-2xl drop-shadow-2xl p-8">
          <h3 className="text-xl font-bold text-[#020A47] mb-4">Our Vision</h3>
          <p className="text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-inner hover:shadow-2xl drop-shadow-2xl p-8">
          <h3 className="text-xl font-bold text-[#020A47] mb-4">Our Mission</h3>
          <p className="text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  )
}

