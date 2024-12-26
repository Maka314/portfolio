'use client';
import Image from 'next/image';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { transform } from 'next/dist/build/swc/generated-native';

export interface ProjectCardProps {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  projectImage: string;
}

export default function ProjectCard({
  projectName,
  projectDescription,
  projectLink,
  projectImage,
}: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMoce = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPercent = mouseX / width - 0.5;
    const yPercent = mouseY / height - 0.5;

    x.set(xPercent);
    y.set(yPercent);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className='box'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ transformStyle: 'preserve-3d', transform:'perspective(1000px) scale3d(1, 1, 1)', rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onMouseMove={handleMouseMoce}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={projectLink}
        className='h-screen-70 max-h-screen rounded-xl m-7 p-2 flex flex-col justify-start items-start bg-slate-200 border border-slate-500'
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Image
          src={projectImage}
          alt='project cover'
          layout='responsive'
          width={100}
          height={100}
          className='rounded-xl'
          style={{
            transform: 'translateZ(25px)',
            transformStyle: 'preserve-3d',
          }}
        />
        <h1
          style={{
            transform: 'translateZ(25px)',
            transformStyle: 'preserve-3d',
          }}
          className='font-semibold text-2xl'
        >
          {projectName}
        </h1>
        <p
          style={{
            transform: 'translateZ(25px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {projectDescription}
        </p>
      </a>
    </motion.div>
  );
}
