import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Background image */}
      <img
        src={assets.bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-indigo-800/50 to-indigo-950/80 -z-10"></div>

      {/* Left side : Branding */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-32 text-white z-10">
        {/* Logo */}
        <img src={assets.logo} alt="logo" className="h-12 object-contain" />

        {/* Branding text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6 max-md:mt-10">
            <img src={assets.group_users} alt="" className="h-10" />
            <div>
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 text-transparent fill-amber-400"
                    />
                  ))}
              </div>
              <p className="text-sm opacity-80">Used By 10k+ Developers</p>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent drop-shadow-lg">
            Not Just Making Friends,
            <br /> But Also Connections
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-80 max-w-md">
            Join our global community and build valuable connections 🚀
          </p>
        </motion.div>

        <span className="md:h-12"></span>
      </div>

      {/* Right side : Login Card */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 flex items-center justify-center p-6 md:p-10"
      >
        <SignIn />
      </motion.div>
    </div>
  );
};

export default Login;
