export const ProjectsPage = () => {
    const projects = [
        {
            title: "LimAPI",
            description: "Легковесный Python веб-фрейморк для создания API",
            link: "https://github.com/Marsvest/LimAPI",
        },
        {
            title: "Dating Bot",
            description: "Бот знакомст на платформе Telegram. (Доступ ограничен)",
            link: "https://github.com/Marsvest/dating_bot",
        },
        {
            title: "Django Cars",
            description: "Бэкенд для сайта по ремонту авто (Доступ ограничен)",
            link: "https://github.com/Marsvest/django_cars",
        },
    ];

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Мои Проекты</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
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
        </main>
    );
};
