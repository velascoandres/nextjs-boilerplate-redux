'use-client'

import React from 'react'
import { motion } from 'framer-motion'

interface IAnimationWrapperProps {
  children: React.ReactNode;
  className?: string 
}

export const AnimationWrapper: React.FC<IAnimationWrapperProps> = (props) => {
  const { children, className } = props

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={
        {
          hidden: { opacity: 0, x: -200, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: -100 },
        }
      }
      transition={{ type: 'linear' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
