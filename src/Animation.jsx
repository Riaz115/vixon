export const pageVariants = {
  initial: {
    opacity: 0,
    y: 70,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: 70,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};
