import SectionHeading from '@/components/ui/section_heading/SectionHeading';
import ProjectCard from '@/components/ui/project_card/ProjectCard';

// 项目数据类型定义
interface ProjectData {
  projectName: string;
  projectImage: string;
  description: string;
  projectLink: string;
}

// 项目数据直接定义在组件中
const projectsData: ProjectData[] = [
  {
    projectName: "FX Risk Control System",
    projectImage: "/images/project2_cover.png",
    description: "Monitoring of foreign exchange trading behavior using machine learning methods",
    projectLink: "/projects/fx-risk-control-system"
  },
  {
    projectName: "LLM Industry Application",
    projectImage: "/images/project2_cover.png",
    description: "LLM deployed in actual production environments is used to simplify customer service processes and intelligent services on the business side.",
    projectLink: "/projects/llm-industry-application"
  },
  {
    projectName: "First Place in Neara Hackathon",
    projectImage: "/images/project3_cover.png",
    description: "First place in the hackathon competition held by UNSW in collaboration with Neara, out of more than 30 teams. Development language is kotlin",
    projectLink: "/projects/first-place-in-neara-hackathon"
  }
];

export default function Projects() {
  return (
    <div className='flex flex-col justify-center items-center h-auto py-12'>
      <SectionHeading>Projects</SectionHeading>
      <div className='flex flex-row justify-center items-start flex-wrap'>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            projectName={project.projectName}
            projectDescription={project.description}
            projectLink={project.projectLink}
            projectImage={project.projectImage}
          />
        ))}
      </div>
    </div>
  );
}
