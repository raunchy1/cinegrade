import React from 'react';
import { motion } from 'framer-motion';

interface ImageSkeletonProps {
  aspectRatio?: string;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  aspectRatio = '4/3',
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#1A1A24] ${className}`}
      style={{ aspectRatio }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default ImageSkeleton;
