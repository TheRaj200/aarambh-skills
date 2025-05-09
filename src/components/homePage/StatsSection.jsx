const StatsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-hidden px-4 py-16">
      <h1 className="text-[#020A47] text-4xl font-bold text-center mb-16">
        Why Arambh Skills?
      </h1>
      <div className="flex flex-col md:flex-row ml-48 md:ml-0 justify-center  md:justify-evenly  items-center gap-12 md:gap-5 xl:ml-32 w-[100%]  ">
        <div className="relative border-r-2  border-[#0000001a] lg:mx-6 xl:mx-8 w-[100%]">
          <h1 className="absolute ml-5 md:ml-0 bg-gradient-to-r from-[#60F2FF] to-white  rotate-[25deg] h-[10vh] w-[26vw] md:h-[5vh] md:w-[8vw] rounded-xl  md:mt-8 lg:-left-12"></h1>
          <h1 className="relative text-7xl ml-10 md:ml-0 ">8+</h1>
          <h1 className=" relative mt-10 md:mt-4 text-2xl md:text-lg font-semibold">
            Happy Student
          </h1>
        </div>
        <div className="relative border-r-2 border-[#0000001a] lg:mx-6 xl:mx-8  w-[100%]">
          <h1 className="absolute ml-5 md:ml-0 bg-gradient-to-r from-[#FF60C5] to-white  rotate-[25deg] h-[10vh] w-[26vw] md:h-[5vh] md:w-[8vw] rounded-xl  md:mt-8 lg:-left-12"></h1>
          <h1 className="relative ml-10 md:ml-0 text-7xl ">6+</h1>
          <h1 className=" relative mt-10 md:mt-4 text-2xl md:text-lg font-semibold">
            Quality Trainers
          </h1>
        </div>
        <div className="relative border-r-2 border-[#0000001a] lg:mx-6 xl:mx-8  w-[100%]">
          <h1 className="absolute ml-5 md:ml-0 bg-gradient-to-r from-[#EFFF60] to-white  rotate-[25deg] h-[10vh] w-[26vw] md:h-[5vh] md:w-[8vw] rounded-xl  md:mt-8 lg:-left-12"></h1>
          <h1 className="relative text-7xl ml-10 md:ml-0 ">11+</h1>
          <h1 className=" relative mt-10 md:mt-4 text-2xl md:text-lg font-semibold">
            Premium Courses
          </h1>
        </div>
        <div className="relative  lg:mx-6 xl:mx-4  w-[100%]">
          <h1 className="absolute ml-5 md:ml-0 bg-gradient-to-r from-[#60FF68] to-white  rotate-[25deg] h-[10vh] w-[20vw] md:h-[5vh] md:w-[8vw] rounded-xl md:mt-8 lg:-left-12"></h1>
          <h1 className="relative text-7xl ml-10 md:ml-0 ">5+</h1>
          <h1 className=" relative mt-10 md:mt-4 text-2xl md:text-lg font-semibold">
            Cost-free Courses
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
