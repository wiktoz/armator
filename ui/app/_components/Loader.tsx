import React from "react"
import { motion } from "framer-motion"

const spinTransition = {
  repeatType: "Infinity",
  ease: "linear",
  duration: 4
};

export default function Loader() {
  return (
    <motion.span
    className="rounded-full w-20 h-20 block border-2 border-gray-200 border-t-gray-600"
    animate={{ rotate: 360 }}
    transition={{spinTransition}}
  />
  );
}