export const HeroSection = ({ imageUrl, heroTitle, heroDescription }) => {
  return (
    <div className="relative h-[85vh] bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl}')` }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white p-4 pb-16">
        <h1 className="text-4xl sm:text-6xl font-bold mb-2 font-sans">{heroTitle}</h1>
        <p className="text-base sm:text-xl font-light font-sans max-w-2xl">{heroDescription}</p>
      </div>
    </div>
  );
};

// About Text Section Component
export const AboutTextSection = ({ aboutText }) => {
  return (
    <div className=" py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <p className="text-xl leading-relaxed text-gray-800 font-normal">
            {aboutText}
          </p>
        </div>
      </div>
    </div>
  );
};