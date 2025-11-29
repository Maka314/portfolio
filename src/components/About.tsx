'use client';

import SectionHeading from '@/components/ui/section_heading/SectionHeading';

export default function About() {
  return (
    <div className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-28 scroll-mt-28'>
      <SectionHeading>About me</SectionHeading>
      <p className='mb-3'>
        I&apos;m a full-stack developer based in Sydney, Australia. With a
        bachelor&apos;s degree in Financial Engineering. Now I&apos;m working on
        the master&apos;s degree in Information Technology. <br />
        My tech stack is Rust, React, Next.js, Tailwind CSS, Node.js, Express,
        MongoDB, PostgreSQL, and Python.
      </p>
    </div>
  );
}
