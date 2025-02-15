import apiClient from './apiClient';
import { GitHubRepoResponse } from '../types/GitHubRepoResponse';
import { Project } from '../types/Project';

const MAX_RETRIES = 3; // Максимальное количество повторных попыток
const RETRY_DELAY_MS = 2000; // Задержка между попытками (в миллисекундах)

export async function getPublicRepos(
    username: string,
    retriesLeft: number = MAX_RETRIES
): Promise<Project[]> {
    try {
        const response = await apiClient.get<GitHubRepoResponse[]>(`/users/${username}/repos`, {
            params: {
                type: 'public',
            },
        });

        const projects: Project[] = response.data.map((repo) => ({
            id: repo.id.toString(),
            title: repo.name,
            description: repo.description || 'Описание отсутствует',
            technologies: repo.language ? [repo.language] : [],
            link: repo.html_url,
            category: 'Общая Категория',
        }));

        return projects;
    } catch (error) {
        if (retriesLeft > 0) {
            console.warn(
                `Ошибка при получении репозиториев. Осталось попыток: ${retriesLeft - 1}`
            );
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));

            return getPublicRepos(username, retriesLeft - 1);
        }

        console.error('Превышено максимальное количество попыток:', error);
        throw error; // Передаем ошибку дальше, если все попытки исчерпаны
    }
}