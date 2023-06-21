import React from "react";

const LessonSection = () => {
  return (
    <div className="flex justify-center overflow-hidden bg-white px-6 py-24">
      <div className="flex flex-col container w-1/3 gap-y-2">
        <div className="order-1">
            <p className="text-base text-left font-semibold leading-7 text-violet-600">
            Struktur Perulangan Java
            </p>
        </div>

        <div className="order-2">
            <h1 className="title mt-2 text-xl text-left font-bold tracking-tight text-stone-900 sm:text-4xl">
            Pengantar Perulangan
            </h1>
        </div>
        
        <div className="order-3 ">
            <p className="mt-6 text-sm text-left leading-8 text-gray-700">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas.
            </p>
        </div>

        <div className="order-4 flex justify-center mt-6">
            <div className="container w-full p-10 h-48 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
        </div>
        
      </div>
    </div>
  );
};

export default LessonSection;
