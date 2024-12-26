import SectionHeading from '@/components/ui/section_heading/SectionHeading';

import ProjectCard from '@/components/ui/project_card/ProjectCard';
import { ProjectCardProps } from '@/components/ui/project_card/ProjectCard';

const projectInfo: ProjectCardProps = {
  projectName: 'Project Name',
  projectDescription: 'Project Description',
  projectLink: 'Project Link',
  projectImage: '/images/project_cover.png',
};

const projectInfo2: ProjectCardProps = {
  projectName: 'Project Name2',
  projectDescription: 'A parking space time-sharing rental system, addressing urban parking challenges and increasing income for parking space owners.',
  projectLink: 'Project Link2',
};

export default function Projects() {
  return (
    <div className='flex flex-col justify-center items-center h-auto py-12'>
      <SectionHeading>Projects</SectionHeading  >
      <div className='flex flex-row justify-center items-start flex-wrap'>
        <ProjectCard {...projectInfo} />
        <ProjectCard {...projectInfo2} />
        <ProjectCard {...projectInfo2} />
        <ProjectCard {...projectInfo2} />
        <ProjectCard {...projectInfo2} />
        <ProjectCard {...projectInfo2} />
      </div>
    </div>
  );
}
