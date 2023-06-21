import React from "react";

import { Carousel } from "flowbite-react";

import Banner from "../Banner-01.jpg";
import Banner2 from "../Banner-02.jpg";
import Banner3 from "../Banner-03.jpg";

const MainBanner = () => {
  return (
    <div className="flex mt-32 mb-10 w-full justify-center items-center">
      <div className="w-[1000px] h-[180px] rounded-lg overflow-hidden">
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
