<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { Project } from '../types/Project';

export const ProjectsPage = () => {
    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Фильтрация проектов по выбранной технологии
    const filteredProjects = projects.filter((project) =>
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

    // Блокируем прокрутку страницы, когда открыто модальное окно
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
        } else {
            document.body.style.overflow = 'auto'; // Включаем прокрутку страницы
        }
    }, [isModalOpen]);
=======
import React, { useMemo } from 'react';
import { useModal } from '../components/useModal';

export const ProjectsPage = () => {
    const projects = [
        {
            title: "LimAPI",
            description: "Легковесный Python веб-фрейморк для создания API",
            link: "https://github.com/Marsvest/LimAPI",
        },
        {
            title: "Dating Bot",
            description: "Бот знакомства на платформе Telegram. (Доступ ограничен)",
            link: "https://github.com/Marsvest/dating_bot",
        },
        {
            title: "Django Cars",
            description: "Бэкенд для сайта по ремонту авто (Доступ ограничен)",
            link: "https://github.com/Marsvest/django_cars",
        },
    ];
>>>>>>> master

    const filteredProjects = useMemo(() => {
        return projects;
    }, [projects]);

    const { isOpen, openModal, closeModal } = useModal();

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
<<<<<<< HEAD
            {/* Основной контент скрывается при открытии модалки */}
            {!isModalOpen && (
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
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white p-4 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default link behavior
                                    openModal(project); // Open modal on project click
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

            {/* Модальное окно с детальной информацией о проекте */}
            {isModalOpen && selectedProject && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal} // Close modal if clicked outside
                >
                    <div
                        className="bg-white p-8 rounded-lg w-full max-w-3xl relative"
                        onClick={(e) => e.stopPropagation()} // Prevent close if clicked inside the modal
                    >
                        {/* Кнопка "Назад" */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 left-4 text-gray-700 font-semibold text-lg"
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
=======
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Мои Проекты</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
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
                            <button
                                onClick={openModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                Info
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Дополнительная информация</h2>
                        <p className="text-gray-700 mb-4">Здесь может быть дополнительная информация о проекте.</p>
                        <button
                            onClick={closeModal}
                            className="text-blue-500 hover:underline"
                        >
                            Закрыть
                        </button>
>>>>>>> master
                    </div>
                </div>
            )}
        </main>
    );
};