'use client';

import { motion } from 'motion/react';

import { AuroraBackground } from '@/components/ui/aurora_background/AuroraBackground';

export default function Hero() {
  return (
    <AuroraBackground>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        id='hero'
      >
        <h1 className='hero_heading'>
          Welcome to my new portfolio!
          <br />
          This page is still under construction.
        </h1>
      </motion.section>
    </AuroraBackground>
  );
}
