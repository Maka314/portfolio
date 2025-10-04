import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className='flex h-16 justify-between items-center'>
      <p className='text-center w-full'>© 2025 Mingchen Ju</p>
      <div className='flex space-x-4 absolute right-10'>
        <a
          href='https://www.linkedin.com/in/mingchen-ju/'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedin className='text-2xl' />
        </a>
        <a href='https://github.com/Maka314' target='_blank' rel='noreferrer'>
          <FaGithub className='text-2xl' />
        </a>
        <a
          href='mailto:traveller31415@gmail.com'
          target='_blank'
          rel='noreferrer'
        >
          <MdEmail className='text-2xl' />
        </a>
      </div>
    </footer>
  );
}
