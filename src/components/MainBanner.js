import React from "react";

import { Carousel } from "flowbite-react";

import Banner from "../assets/Banner-01.jpg";
import Banner2 from "../assets/Banner-02.jpg";
import Banner3 from "../assets/Banner-03.jpg";

const MainBanner = () => {
  return (
    <div className="flex mt-16 md:mt-32 mb-4 md:mb-10 w-full justify-center px-4 items-center">
      <div className="w-[840px] h-[160px] md:w-[1000px] md:h-[180px] rounded-lg overflow-hidden">
      <Carousel indicators={false}>
        <img
          alt="..."
          src={Banner}
        />
        <img
          alt="..."
          src={Banner2}
        />
        <img
          alt="..."
          src={Banner3}
        />
      </Carousel>
      </div>
    </div>
  );
};

export default MainBanner;
