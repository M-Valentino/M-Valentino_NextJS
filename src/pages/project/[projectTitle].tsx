import React from "react";
import { MainWrapper } from "../../components/layout/MainWrapper";
import ProjectPage from "../../components/ProjectPage";
import { CustomHead } from "../../components/layout/CustomHead";
import { PROJECT_CONTENT } from "../../consts/projectContent";

// Function to get all possible paths for individual project pages
export const getStaticPaths = async () => {
  const paths = PROJECT_CONTENT.map((key) => {
    return { params: { projectTitle: key.title } };
  });

  return { paths, fallback: false };
};

// Function to get all possible data for individual project pages (except for projectExtraContent components)
export const getStaticProps = async (context: { params: { projectTitle: string; }; }) => {
  const project = PROJECT_CONTENT.find(
    (obj) => obj.title === context.params.projectTitle
  );
  return { props: { project: project } };
};

type projectObject = {
  description: string;
  title: string;
  languages: string;
};

interface ProjectTemplateProps {
  project: projectObject;
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ project }) => {
  return (
    <>
      <CustomHead
        descriptionText={project.description}
        title={`Mark Valentino - ${project.title}`}
        keywords={project.languages}
      />
      <MainWrapper>
        <ProjectPage data={project} />
      </MainWrapper>
    </>
  );
};

export default ProjectTemplate;
