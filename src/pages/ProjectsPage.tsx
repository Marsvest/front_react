import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, setProjects } from '../store/projectsSlice';
import { NewProjectForm, Project } from '../types/Project';

export const ProjectsPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state: any) => state.projects.items);
  
    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [newProject, setNewProject] = useState<NewProjectForm>({
      title: '',
      description: '',
      technologies: [],
      link: ''
    });
  
    // Загрузка проектов из localStorage
    useEffect(() => {
      const savedProjects = localStorage.getItem('reduxState');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects).projects.items;
        dispatch(setProjects(parsed));
      }
    }, [dispatch]);
  
    // Сохранение состояния в localStorage
    useEffect(() => {
      localStorage.setItem('reduxState', JSON.stringify({ projects: { items: projects } }));
    }, [projects]);
  
    // Фильтрация проектов по выбранной технологии
    const filteredProjects = projects.filter((project: NewProjectForm) =>
      selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );
  
    // Открытие модального окна с детальной информацией
    const openModal = (project: Project) => {
      setSelectedProject(project);
      setIsModalOpen(true);
    };
  
    // Закрытие модального окна
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedProject(null);
    };
  
    // Форма добавления проекта
    const handleAddProject = (e: React.FormEvent) => {
      e.preventDefault();
      const projectWithId: Project = {
        ...newProject,
        id: Date.now().toString()
      };
      dispatch(addProject(projectWithId)); // Добавляем проект в Redux
      setIsAddFormOpen(false);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        link: ''
      });
    };
  
    return (
      <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
        {/* Кнопка для добавления нового проекта */}
        {!isModalOpen && !isAddFormOpen && (
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Добавить проект
          </button>
        )}
  
        {/* Форма добавления проекта */}
        {isAddFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleAddProject} className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl mb-4">Добавить новый проект</h2>
  
              <input
                type="text"
                placeholder="Название"
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                required
              />
  
              <textarea
                placeholder="Описание"
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
                required
              />
  
              <input
                type="text"
                placeholder="Технологии (через запятую)"
                value={newProject.technologies.join(', ')}
                onChange={e => setNewProject({
                  ...newProject,
                  technologies: e.target.value.split(', ')
                })}
                className="w-full mb-2 p-2 border rounded"
                required
              />
  
              <input
                type="url"
                placeholder="Ссылка на проект"
                value={newProject.link}
                onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
                required
              />
  
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        )}
  
        {/* Основной контент */}
        {!isAddFormOpen && !isModalOpen && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl w-full">
            <h1 className="text-4xl font-bold mb-4 text-center">Мои Проекты</h1>
  
            {/* Фильтр по технологиям */}
            <div className="mb-6 text-center">
              <label className="mr-2">Фильтр по технологиям:</label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="py-2 px-4 rounded bg-white border border-gray-300"
              >
                <option value="All">Все</option>
                <option value="Python">Python</option>
                <option value="Flask">Flask</option>
                <option value="Django">Django</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>
  
            {/* Список проектов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project: Project) => (
                <div
                  key={project.id}
                  className="bg-white p-4 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Посмотреть проект
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Модальное окно с детальной информацией о проекте */}
        {isModalOpen && selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 rounded-lg w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 left-4 text-blue-500 font-semibold text-lg"
              >
                Назад
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-700 mb-4">{selectedProject.description}</p>
              <div className="mb-4">
                <strong>Технологии:</strong>
                <ul className="list-disc ml-5">
                  {selectedProject.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
              <a
                href={selectedProject.link}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти к проекту
              </a>
            </div>
          </div>
        )}
      </main>
    );
  };
  