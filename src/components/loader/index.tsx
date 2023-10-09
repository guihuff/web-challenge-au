"use client"

import { motion, Variants } from 'framer-motion';

const loaderVariants: Variants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5
      },
      y: {
        yoyo: Infinity,
        duration: 0.25
      },
    }
  }
}

export function Loader () {
  return (
      <motion.div
        className="rounded-full border-t-4 border-white border-solid animate-spin w-7 h-7 relative"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
  )
}