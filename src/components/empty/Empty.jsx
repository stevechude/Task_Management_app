import Image from "next/image";
import React from "react";

const Empty = ({ click }) => {
  return (
    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 max-w-[408px] mx-auto mt-4 md:mt-5">
      <div className="flex flex-col gap-2">
        <div>
          <Image
            src={"/organsation-login.svg"}
            width={500}
            height={500}
            alt="Empty Page"
          />
        </div>
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-lg">No Projects created</p>
          <p className="text-[#464665] text-sm max-w-[240px] mx-auto">
            Click the button below to create a new project.
          </p>
          <button
            onClick={click}
            className="flex items-center gap-2 text-white bg-[#0096c4] rounded-xl py-1.5 px-4 font-semibold"
          >
            <p>Create project</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
