import { motion } from 'framer-motion';

interface StarFloatProps {
  color: string;
  delay?: number;
  size?: number;
}

export default function StarFloat({ color, delay = 0, size = 24 }: StarFloatProps) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      className="flex items-center justify-center"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className="drop-shadow-lg"
      >
        <polygon points="12,2 15.09,10.26 24,10.26 17.55,15.74 19.64,24 12,19.52 4.36,24 6.45,15.74 0,10.26 8.91,10.26" />
      </svg>
    </motion.div>
  );
}
