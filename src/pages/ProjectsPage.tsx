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

    const filteredProjects = useMemo(() => {
        return projects;
    }, [projects]);

    const { isOpen, openModal, closeModal } = useModal();

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
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
                    </div>
                </div>
            )}
        </main>
    );
};