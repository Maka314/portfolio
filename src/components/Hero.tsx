'use client';

import { motion } from 'motion/react';

import { AuroraBackground } from '@/components/ui/aurora_background/AuroraBackground';

export default function Hero() {
  return (
    <AuroraBackground>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.175,
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        id='hero'
      >
        <h1 className='hero_heading'>
          Hello, I&apos;m <span className='font-medium'>Michael Ju</span> <br />{' '}
          A full stack developer
        </h1>
      </motion.section>
    </AuroraBackground>
  );
}
