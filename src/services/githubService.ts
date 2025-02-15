import axios from 'axios';
import { Project } from '../types/Project';

const GITHUB_API_URL = 'https://api.github.com'

export async function getPublicRepos(username: string): Promise<Project[]> {
    try {
        const response = await axios.get<any[]>(`${GITHUB_API_URL}/users/${username}/repos`, {
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
        console.error('Ошибка при получении репозиториев:', error);
        throw error;
    }
}