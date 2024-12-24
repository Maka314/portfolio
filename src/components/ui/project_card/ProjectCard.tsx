'use client';
import Image from 'next/image';

import { motion } from 'motion/react';

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
  return (
    <motion.div
      className='box'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <a
        href={projectLink}
        className='h-screen-70 max-h-screen rounded-xl m-7 p-2 flex flex-col justify-start items-start bg-slate-200 border border-slate-500'
      >
        <Image
          src={projectImage}
          alt='project cover'
          layout='responsive'
          width={100}
          height={100}
        />
        <h1 className='font-semibold text-2xl'>{projectName}</h1>
        <p>{projectDescription}</p>
      </a>
    </motion.div>
  );
}
