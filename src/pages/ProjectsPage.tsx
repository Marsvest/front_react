import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects, addProject } from '../store/projectsSlice';
import { Project, NewProjectForm } from '../types/Project';
import { getUserProjects } from '../services/githubService';

export const ProjectsPage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: any) => state.projects.items);

  const [isLoading, setIsLoading] = useState<boolean>(false); // Индикатор загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false); // Открытие формы добавления проекта
  const [newProject, setNewProject] = useState<NewProjectForm>({
    title: '',
    description: '',
    technologies: [],
    link: ''
  });

  // Загрузка проектов (локальных + GitHub)
  const fetchProjects = async () => {
    setIsLoading(true); // Включаем индикатор загрузки
    setError(null); // Сбрасываем ошибку перед запросом

    try {
      // Загрузка проектов с GitHub
      const githubProjects = await getUserProjects('marsvest');

      // Обновляем Redux состояние (кэшируем данные)
      dispatch(setProjects(githubProjects));

      // Сохраняем в localStorage
      localStorage.setItem(
        'reduxState',
        JSON.stringify({ projects: { items: githubProjects } })
      );
    } catch (err) {
      console.error('Ошибка загрузки проектов:', err);
      setError('Не удалось загрузить проекты. Попробуйте снова.');
    } finally {
      setIsLoading(false); // Отключаем индикатор загрузки
    }
  };

  // Первый запрос при монтировании компонента
  useEffect(() => {
    if (projects.length === 0) fetchProjects(); // Загружаем только если данные не кэшированы
  }, [projects.length]);

  // Фильтрация проектов по выбранной технологии
  const filteredProjects = projects.filter((project: Project) =>
    selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
  );

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
    <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Мои Проекты</h1>

      {/* Кнопка обновления */}
      <button
        onClick={fetchProjects}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={isLoading} // Блокируем кнопку во время загрузки
      >
        {isLoading ? 'Обновление...' : 'Обновить проекты'}
      </button>

      {/* Кнопка "Добавить проект" */}
      <button
        onClick={() => setIsAddFormOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Добавить проект
      </button>

      {/* Форма добавления проекта */}
      {isAddFormOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" // Убедитесь, что z-50 перекрывает остальные элементы
        >
          <form
            onSubmit={handleAddProject}
            className="bg-white p-6 rounded-lg w-96 shadow-lg z-60" // Модальное окно с дополнительной тенью и z-index
          >
            <h2 className="text-2xl mb-4">Добавить новый проект</h2>

            <input
              type="text"
              placeholder="Название"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />

            <textarea
              placeholder="Описание"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />

            <input
              type="text"
              placeholder="Технологии (через запятую)"
              value={newProject.technologies.join(', ')}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  technologies: e.target.value.split(', ')
                })
              }
              className="w-full mb-2 p-2 border rounded"
              required
            />

            <input
              type="url"
              placeholder="Ссылка на проект"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
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


      {/* Фильтр по технологиям */}
      <div className="mb-6">
        <label className="mr-2">Фильтр по технологиям:</label>
        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="py-2 px-4 rounded bg-white border border-gray-300"
        >
          <option value="All">Все</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="HTML">HTML</option>
          <option value="C++">C++</option>
        </select>
      </div>

      {/* Индикатор загрузки */}
      {isLoading && <p className="text-lg font-semibold">Загрузка...</p>}

      {/* Ошибка */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Список проектов */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white p-4 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">
                {project.description || 'Нет описания'}
              </p>
              <p className="text-sm mb-2">
                <strong>Технологии:</strong>{' '}
                {project.technologies.length > 0
                  ? project.technologies.join(', ')
                  : 'Не указаны'}
              </p>
              <a
                href={project.link}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти к репозиторию
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
