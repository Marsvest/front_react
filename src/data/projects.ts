// src/data/projects.ts
import { Project } from '../types/Project';

export const projects: Project[] = [
    {
        id: 1,
        title: 'LimAPI',
        description: 'Легковесный Python веб-фрейморк для создания API',
        technologies: ['Python', 'API'],
        link: 'https://github.com/Marsvest/LimAPI',
    },
    {
        id: 2,
        title: 'Dating Bot',
        description: 'Бот знакомст на платформе Telegram. (Доступ ограничен)',
        technologies: ['Python', 'Telegram'],
        link: 'https://github.com/Marsvest/dating_bot',
    },
    {
        id: 3,
        title: 'Django Cars',
        description: 'Бэкенд для сайта по ремонту авто (Доступ ограничен)',
        technologies: ['Python', 'Django'],
        link: 'https://github.com/Marsvest/django_cars',
    },
    // Добавьте другие проекты
];
