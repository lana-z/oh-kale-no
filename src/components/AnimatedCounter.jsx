import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedCounter({ value }) {
  const ref = useRef(null);
  
  const motionValue = useSpring(0, {
    damping: 60,
    stiffness: 100,
  });

  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return (
    <motion.span
      ref={ref}
      className="text-sm md:text-base font-semibold"
    >
      {rounded}
    </motion.span>
  );
}
