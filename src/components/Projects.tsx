import ProjectCard from '@/components/ui/project_card/ProjectCard';
import { ProjectCardProps } from '@/components/ui/project_card/ProjectCard';

const projectInfo: ProjectCardProps = {
  projectName: 'Project Name',
  projectDescription: 'Project Description',
  projectLink: 'Project Link',
  projectImage: '/images/project_cover.png',
};

export default function Projects() {
  return (
    <div className='flex flex-col justify-center items-center h-auto py-12'>
      <h1 className='text-4xl font-bold'>Projects</h1>
      <div className='flex flex-row justify-center items-center'>
        <ProjectCard {...projectInfo} />
        <ProjectCard {...projectInfo} />
      </div>
    </div>
  );
}
