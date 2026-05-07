import { Globe, Plus, User } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 w-full flex justify-center z-50">
      <div className="relative flex items-center justify-around w-11/12 max-w-lg bg-white/1 backdrop-blur-md border border-white/20 rounded-[15px] py-4 shadow-md">
        <Globe
          className="cursor-pointer hover:text-pink-600 transition-all duration-300 ease-out hover:scale-110"
          size={25}
        />

        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <div
            className="
              bg-purple-700 p-2 rounded-full border-[3px] border-black
              flex items-center justify-center
              shadow-[0_0_20px_8px_rgba(168,85,247,0.25)]
              transition-all duration-200 ease-out transform-gpu
              hover:shadow-[0_0_28px_12px_rgba(168,85,247,0.35)]
              hover:scale-105
              active:scale-95
            "
          >
            <Plus
              className="cursor-pointer text-white transition-transform duration-200 ease-out"
              strokeWidth={2.5}
              size={35}
            />
          </div>
        </div>

        <User
          className="cursor-pointer hover:text-pink-600 transition-all duration-200 ease-out hover:scale-110"
          size={25}
        />
      </div>
    </div>
  );
};

export default Navbar;
