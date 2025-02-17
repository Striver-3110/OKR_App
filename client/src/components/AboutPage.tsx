
const AboutPage = () => {

  return (
    <>
      <style>
      </style>
      <div className="font-inter">
      <section className="py-14 lg:py-24 relative z-0 bg-gray-200">
        <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1
            className="  max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl md:leading-normal">
            Manage Your Objectives with Our <span className=" text-indigo-600 ">OKR Tool</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9 ">
            Set, track, and achieve your key results with ease.
            Our OKR tool helps you align your team, track progress, and drive strategic growth.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <img
                src="https://elements-resized.envatousercontent.com/elements-cover-images/b4642d30-0553-494d-8027-7c307359593d?w=710&cf_fit=scale-down&q=85&format=auto&s=0ce47464f6b5bae4c34f6d50dcfd76364d5506568bb68deb9813d9277b0d07e7" // Replace with your image
                alt="About Our OKR Tool"
                className="max-lg:mx-auto object-cover"
              />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  About Our OKR Tool
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  We're passionate about helping teams achieve their goals. Our OKR tool is designed to empower you to define, track, and manage your objectives and key results effectively.  We aim to simplify the OKR process and provide a user-friendly platform that drives results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <img
                  src="https://elements-resized.envatousercontent.com/elements-cover-images/433479fb-7694-40cc-9b60-a7ad149b3f3b?w=710&cf_fit=scale-down&q=85&format=auto&s=ef948f29bc3fb5054f221a2979ab87aa743f929dd20eee682ef0724b08ea6cfb"
                  alt="Our Approach to OKRs"
                  className="block lg:hidden mb-9 mx-auto object-cover"
                />
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                  Our Approach to OKRs
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  We believe in a practical and results-oriented approach to OKRs. Our tool emphasizes:
                  <ul className="list-disc ml-6 mt-4">
                    <li><b>Clarity:</b>  Clearly defined objectives and measurable key results.</li>
                    <li><b>Alignment:</b> Connecting team goals to overall company strategy.</li>
                    <li><b>Transparency:</b>  Open visibility of OKRs and progress for all team members.</li>
                    <li><b>Flexibility:</b>  Adapting and adjusting OKRs as needed.</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="img-box">
              <img
                src="https://pagedone.io/asset/uploads/1702034785.png" // Replace with your image
                alt="Our Approach to OKRs"
                className="hidden lg:block object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">Our Impact</h2>
          <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  {/* Replace with actual data */}
                  85%
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">Improved Goal Clarity</h4>
                  <p className="text-xs text-gray-500 leading-5">Teams report a significant increase in understanding their goals and how they contribute to the bigger picture.</p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  {/* Replace with actual data */}
                  70%
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">Increased Productivity</h4>
                  <p className="text-xs text-gray-500 leading-5">Users experience a boost in productivity by focusing on the most important tasks and tracking progress effectively.</p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  {/* Replace with actual data */}
                  55%
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">Enhanced Team Alignment</h4>
                  <p className="text-xs text-gray-500 leading-5">Our tool facilitates better communication and collaboration, leading to stronger team alignment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

    </>
)
}
export default AboutPage
