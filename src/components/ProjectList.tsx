import React from 'react';
import { Project } from '../types/Project';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../features/projectsSlice';
import { Loading } from './Loading';


interface ProjectsListProps {
  isLoading: boolean;
  error: string | null;
  projects: Project[];
  selectedTech: string[];
  selectedCategory: string;
  dispatchLocal: React.Dispatch<any>;
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  isLoading,
  error,
  projects,
  selectedTech,
  selectedCategory,
  dispatchLocal
}) => {
  const dispatch = useDispatch();

  const filteredProjects = React.useMemo(() => {
    if (!Array.isArray(projects)) {
      console.error('projects is not an array:', projects);
      return [];
    }
    return projects.filter((project) => {
      const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => project.technologies.includes(tech));
      const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
      return matchesTech && matchesCategory;
    });
  }, [projects, selectedTech, selectedCategory]);

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-4 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer relative"
              onClick={() => {
                dispatchLocal({ type: 'SET_SELECTED_PROJECT', payload: project });
                dispatchLocal({ type: 'TOGGLE_DETAIL_MODAL', payload: true });
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProject(project.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m-9-5h12m-6 4h.01M9 15h.01M12 15h.01" />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <p className="text-gray-500 mb-4"><strong>Категория:</strong> {project.category}</p>
              <p className="text-gray-500 mb-4"><strong>Язык:</strong> {project.technologies.join(', ')}</p>
              <a
                href={project.link}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Посмотреть проект
              </a>
            </div>
          ))
        ) : (
          <p className="text-center">Нет проектов</p>
        )
      )}
    </div>
  );
};

export default ProjectsList;