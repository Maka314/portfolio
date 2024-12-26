'use client';

import { motion } from 'motion/react';

import SectionHeading from '@/components/ui/section_heading/SectionHeading';

export default function About() {
  return (
    <motion.section
      className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-28 scroll-mt-28'
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id='about'
    >
      <SectionHeading>About me</SectionHeading>
      <p className='mb-3'>
        I&apos;m a full-stack developer based in Sydney, Australia. With a
        bachelor&apos;s degree in Financial Engineering. Now I&apos;m working on
        the master&apos;s degree in Information Teachnology. <br />
        My thch stack is Rust, React, Next.js, Tailwind CSS, Node.js, Express,
        MongoDB, PostgreSQL, and python.
      </p>
    </motion.section>
  );
}
