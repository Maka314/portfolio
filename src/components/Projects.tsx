import SectionHeading from '@/components/ui/section_heading/SectionHeading';
import ProjectCard from '@/components/ui/project_card/ProjectCard';

import fs from 'fs';
import path from 'path';

function getProjects() {
  const filePath = path.join(process.cwd(), 'config', 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(fileContents);

  return projects;
}

export default function Projects() {
  const projectsData = getProjects();
  return (
    <div className='flex flex-col justify-center items-center h-auto py-12'>
      <SectionHeading>Projects</SectionHeading>
      <div className='flex flex-row justify-center items-start flex-wrap'>
        {Object.keys(projectsData).map((key) => (
          <ProjectCard 
            key={key}
            projectName={projectsData[key].projectName}
            projectDescription={projectsData[key].description}
            projectLink={projectsData[key].projectLink}
            projectImage={projectsData[key].projectImage}
          />
        ))}
      </div>
    </div>
  );
}
