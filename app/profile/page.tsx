"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Page = () => {
  const sectionRef = useRef(null);

  // 1. track scroll ONLY in section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // 2. raw movement
  const rawX = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);

  // 3. smooth it (THIS is the magic)
  const smoothX = useSpring(rawX, {
    stiffness: 80,
    damping: 30,
    mass: 1.2
  });

  return (
    <div className="bg-black text-white">

      {/* intro */}
      <div className="h-screen flex items-center justify-center text-2xl">
        Scroll ↓
      </div>

      {/* BIG SCROLL SECTION */}
      <section ref={sectionRef} className="relative h-[500vh]">

        {/* sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-gray-900">

          <motion.div
            style={{ x: smoothX }}
            className="flex w-[400vw] h-full"
          >

            <div className="min-w-screen h-full flex items-center justify-center bg-red-500 text-5xl">
              Flow
            </div>

            <div className="min-w-screen h-full flex items-center justify-center bg-blue-500 text-5xl">
              Motion
            </div>

            <div className="min-w-screen h-full flex items-center justify-center bg-green-500 text-5xl">
              Depth
            </div>

            <div className="min-w-screen h-full flex items-center justify-center bg-purple-500 text-5xl">
              Smooth
            </div>

          </motion.div>

        </div>

      </section>

      {/* end */}
      <div className="h-screen flex items-center justify-center text-xl opacity-60">
        End
      </div>

    </div>
  );
};

export default Page;
