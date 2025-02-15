import { useReducer, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addProject, deleteProject, fetchProjects } from '../features/projectsSlice';
import { Project } from '../types/Project';
import { v4 as uuidv4 } from 'uuid';
import bgImage from '/bg.jpg';


type SetSelectedTechAction = {
  type: 'SET_SELECTED_TECH';
  payload: string[];
};

type SetSelectedCategoryAction = {
  type: 'SET_SELECTED_CATEGORY';
  payload: string;
};

type ToggleDetailModalAction = {
  type: 'TOGGLE_DETAIL_MODAL';
  payload: boolean;
};

type ToggleAddModalAction = {
  type: 'TOGGLE_ADD_MODAL';
  payload: boolean;
};

type SetSelectedProjectAction = {
  type: 'SET_SELECTED_PROJECT';
  payload: Project | null;
};

type SetNewProjectAction = {
  type: 'SET_NEW_PROJECT';
  payload: { name: keyof Project; value: string | string[] };
};

type Action =
  | SetSelectedTechAction
  | SetSelectedCategoryAction
  | ToggleDetailModalAction
  | ToggleAddModalAction
  | SetSelectedProjectAction
  | SetNewProjectAction;

const initialState = {
  selectedTech: [] as string[],
  selectedCategory: '',
  isDetailModalOpen: false,
  isAddModalOpen: false,
  selectedProject: null as Project | null,
  newProject: {
    title: '',
    description: '',
    technologies: [] as string[],
    link: '',
    category: '' 
  }
};

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_SELECTED_TECH':
      return { ...state, selectedTech: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'TOGGLE_DETAIL_MODAL':
      return { ...state, isDetailModalOpen: action.payload };
    case 'TOGGLE_ADD_MODAL':
      return { ...state, isAddModalOpen: action.payload };
    case 'SET_SELECTED_PROJECT':
      return { ...state, selectedProject: action.payload };
    case 'SET_NEW_PROJECT':
      return { ...state, newProject: { ...state.newProject, [action.payload.name]: action.payload.value } };
    default:
      return state;
  }
};

export const ProjectsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);
  const error = useSelector((state: RootState) => state.projects.error);
  const [state, dispatchLocal] = useReducer(reducer, initialState);

  const username: string | undefined = (process.env.REACT_APP_GITHUB_USERNAME as string)

  useEffect(() => {
    dispatch(fetchProjects(username));
  }, [dispatch, username]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTech = state.selectedTech.length === 0 || state.selectedTech.some(tech => project.technologies.includes(tech));
      const matchesCategory = state.selectedCategory ? project.category === state.selectedCategory : true;
      return matchesTech && matchesCategory;
    });
  }, [projects, state.selectedTech, state.selectedCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatchLocal({
      type: 'SET_NEW_PROJECT',
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  const handleTechSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    const technologies = options.map(option => option.value);
    dispatchLocal({ type: 'SET_SELECTED_TECH', payload: technologies });
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchLocal({ type: 'SET_SELECTED_CATEGORY', payload: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectWithId: Project = { ...state.newProject, id: uuidv4() };
    dispatch(addProject(projectWithId));
    dispatchLocal({ type: 'TOGGLE_ADD_MODAL', payload: false });
    dispatchLocal({
      type: 'SET_NEW_PROJECT',
      payload: { name: 'title', value: '' }
    });
  };

  const handleRefreshProjects = () => {
    dispatch(fetchProjects(username));
  };

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  useEffect(() => {
    if (state.isDetailModalOpen || state.isAddModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [state.isDetailModalOpen, state.isAddModalOpen]);

  return (
    <main className="bg-cover bg-center min-h-screen flex justify-center items-center" style={{ backgroundImage: `url(${bgImage})` }}>
      {!state.isDetailModalOpen && !state.isAddModalOpen && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-center">Мои Проекты</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => dispatchLocal({ type: 'TOGGLE_ADD_MODAL', payload: true })}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Добавить проект
              </button>
              <button
                onClick={handleRefreshProjects}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Обновить проекты
              </button>
            </div>
          </div>
          <div className="mb-6 text-center">
            <label className="mr-2">Фильтр по категориям:</label>
            <select
              value={state.selectedCategory}
              onChange={handleCategorySelect}
              className="py-2 px-4 rounded bg-white border border-gray-300"
            >
              <option value="">Все категории</option>
              <option value="Web Applications">Веб-приложения</option>
              <option value="Mobile Applications">Мобильные приложения</option>
              <option value="Desktop">Десктоп</option>
              <option value="Other">Другое</option>
            </select>
          </div>
          <div className="mb-6 text-center">
            <label className="mr-2">Фильтр по технологиям:</label>
            <select
              multiple
              value={state.selectedTech}
              onChange={handleTechSelect}
              className="py-2 px-4 rounded bg-white border border-gray-300"
            >
              <option value="Python">Python</option>
              <option value="Flask">Flask</option>
              <option value="Django">Django</option>
              <option value="Telegram">Telegram</option>
            </select>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.length > 0 ? (
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
              )}
            </div>
          )}
        </div>
      )}

      {state.isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Добавить новый проект</h2>
              <button
                onClick={() => dispatchLocal({ type: 'TOGGLE_ADD_MODAL', payload: false })}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Название проекта:</label>
                <input
                  type="text"
                  name="title"
                  value={state.newProject.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Описание:</label>
                <textarea
                  name="description"
                  value={state.newProject.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Категория:</label>
                <select
                  name="category"
                  value={state.newProject.category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="Web Applications">Веб-приложения</option>
                  <option value="Mobile Applications">Мобильные приложения</option>
                  <option value="Desktop">Десктоп</option>
                  <option value="Other">Другое</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Технологии:</label>
                <select
                  multiple
                  name="technologies"
                  value={state.newProject.technologies}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions);
                    const technologies = options.map(option => option.value);
                    dispatchLocal({ type: 'SET_NEW_PROJECT', payload: { name: 'technologies', value: technologies } });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Python">Python</option>
                  <option value="Flask">Flask</option>
                  <option value="Django">Django</option>
                  <option value="Telegram">Telegram</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ссылка:</label>
                <input
                  type="text"
                  name="link"
                  value={state.newProject.link}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => dispatchLocal({ type: 'TOGGLE_ADD_MODAL', payload: false })}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно деталей проекта */}
      {state.isDetailModalOpen && state.selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{state.selectedProject.title}</h2>
              <button
                onClick={() => dispatchLocal({ type: 'TOGGLE_DETAIL_MODAL', payload: false })}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-4">{state.selectedProject.description}</p>
            <p className="text-gray-500 mb-4"><strong>Категория:</strong> {state.selectedProject.category}</p>
            <p className="text-gray-500 mb-4"><strong>Технологии:</strong> {state.selectedProject.technologies.join(', ')}</p>
            <a
              href={state.selectedProject.link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть проект
            </a>
          </div>
        </div>
      )}
    </main>
  );
};