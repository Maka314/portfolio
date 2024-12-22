import Image from 'next/image';

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
    <a
      href={projectLink}
      className='h-screen-70 max-h-screen- w-2/5 rounded-xl m-7 p-2 flex flex-col justify-start items-start bg-slate-200 border border-slate-500'
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
  );
}
