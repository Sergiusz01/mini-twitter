"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ListItemAnimationProps {
  children: ReactNode;
  index: number;
}

const ListItemAnimation = ({ children, index }: ListItemAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ListItemAnimation; 