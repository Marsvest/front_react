import axios from 'axios';
import { Project } from '../types/Project'; // Импортируем тип Project

const GITHUB_API_URL = 'https://api.github.com'

// Функция для получения публичных репозиториев пользователя и преобразования их в тип Project
export async function getPublicRepos(username: string): Promise<Project[]> {
    try {
        // Выполняем запрос к GitHub API
        const response = await axios.get<any[]>(`${GITHUB_API_URL}/users/${username}/repos`, {
            params: {
                type: 'public', // Получаем только публичные репозитории
            },
        });

        // Преобразуем данные GitHub API в массив проектов
        const projects: Project[] = response.data.map((repo) => ({
            id: repo.id.toString(), // Преобразуем число в строку
            title: repo.name, // Используем имя репозитория как заголовок
            description: repo.description || 'Описание отсутствует', // Если описание null, используем fallback
            technologies: repo.language ? [repo.language] : [], // Язык программирования как технология
            link: repo.html_url, // Ссылка на репозиторий
            category: 'Public Repository', // Категория (можете изменить на что-то более подходящее)
        }));

        return projects;
    } catch (error) {
        console.error('Ошибка при получении репозиториев:', error);
        throw error;
    }
}