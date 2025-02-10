import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addProject, loadProjects, setFilter } from '../features/projectsSlice';
import { Project } from '../types/Project';
import { v4 as uuidv4 } from 'uuid';

export const ProjectsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector((state: RootState) => state.projects.projects);
    
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
        title: '',
        description: '',
        technologies: [],
        link: ''
    });

    useEffect(() => {
        dispatch(loadProjects());
    }, [dispatch]);

    const filteredProjects = useMemo(() => {
        if (!Array.isArray(projects)) {
            console.error('projects is not an array:', projects);
            return [];
        }
        return projects.filter((project) => {
            if (selectedTech.length === 0) return true;
            return selectedTech.some(tech => project.technologies.includes(tech));
        });
    }, [projects, selectedTech]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        });
    };

    const handleTechSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions);
        const technologies = options.map(option => option.value);
        setSelectedTech(technologies);
        dispatch(setFilter(technologies)); // Обновляем состояние Redux
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const projectWithId: Project = {
            ...newProject,
            id: uuidv4()
        };
        dispatch(addProject(projectWithId));
        setIsAddModalOpen(false);
        setNewProject({
            title: '',
            description: '',
            technologies: [],
            link: ''
        });
    };

    useEffect(() => {
        if (isDetailModalOpen || isAddModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isDetailModalOpen, isAddModalOpen]);

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
            {/* Main Content */}
            {!isDetailModalOpen && !isAddModalOpen && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-center">Мои Проекты</h1>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Добавить проект
                        </button>
                    </div>

                    {/* Technology Filter */}
                    <div className="mb-6 text-center">
                        <label className="mr-2">Фильтр по технологиям:</label>
                        <select
                            multiple
                            value={selectedTech}
                            onChange={handleTechSelect}
                            className="py-2 px-4 rounded bg-white border border-gray-300"
                        >
                            <option value="Python">Python</option>
                            <option value="Flask">Flask</option>
                            <option value="Django">Django</option>
                            <option value="Telegram">Telegram</option>
                        </select>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white p-4 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setIsDetailModalOpen(true);
                                }}
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

            {/* Project Detail Modal */}
            {isDetailModalOpen && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-3xl relative">
                        <button
                            onClick={() => setIsDetailModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-700 text-lg"
                        >
                            ×
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

            {/* Add Project Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-700 text-lg"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Добавить новый проект</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label>Название:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newProject.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Описание:</label>
                                <textarea
                                    name="description"
                                    value={newProject.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Ссылка:</label>
                                <input
                                    type="url"
                                    name="link"
                                    value={newProject.link}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Технологии:</label>
                                <select
                                    multiple
                                    value={newProject.technologies}
                                    onChange={handleTechSelect}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="Python">Python</option>
                                    <option value="Flask">Flask</option>
                                    <option value="Django">Django</option>
                                    <option value="Telegram">Telegram</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Добавить проект
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};