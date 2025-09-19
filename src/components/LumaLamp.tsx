'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LumaLampProps {
  children: React.ReactNode;
  className?: string;
}

export const LumaLamp: React.FC<LumaLampProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f5f7] ${className}`}>
      {/* Main lamp container */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Lamp base */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), #a0a0a0 0deg, #d4af37 180deg, #8b7355 360deg)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[#8b7355] via-transparent to-[#d4af37] text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-[#f5f5f7] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-40 top-0 bg-[#d4af37] rounded-full blur-2xl"></div>
        </motion.div>

        {/* Lamp glow effect */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), #8b7355 0deg, #d4af37 180deg, #8b7355 360deg)`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#d4af37] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-40 right-0 top-0 bg-[#d4af37] rounded-full blur-2xl"></div>
          <div className="absolute w-[100%] right-0 bg-[#f5f5f7] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Center light beam */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#f5f5f7] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#d4af37] opacity-50 blur-3xl"></div>

        {/* Secondary glow effects */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#8b7355] blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[#d4af37]"
        ></motion.div>

        {/* Ambient light circles */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#f5f5f7]"></div>
      </div>

      {/* Content */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export default LumaLamp;