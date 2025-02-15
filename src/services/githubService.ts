// services/githubService.ts
import apiClient from './apiClient';
import { GitHubRepoResponse } from '../types/GitHubRepoResponse';
import { Project } from '../types/Project';

export async function getPublicRepos(username: string): Promise<Project[]> {
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
        console.error('Ошибка при получении репозиториев:', error);
        throw error;
    }
}