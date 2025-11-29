'use client';

import { motion } from 'motion/react';
import RotatingText from '@/components/ui/rotating_text/RotatingText';

import { AuroraBackground } from '@/components/ui/aurora_background/AuroraBackground';

const title_list = [
  'Software Engineer',
  'Web Developer',
  'Project Manager',
  'Tech Enthusiast',
];

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
          Hi! I&apos;m <span className='font-medium'>Mingchen Ju</span> <br />{' '}
          And I&apos;m a
          <RotatingText
            texts={title_list}
            mainClassName="px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            elementLevelClassName='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h1>
      </motion.section>
    </AuroraBackground>
  );
}
