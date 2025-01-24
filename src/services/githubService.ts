// src/services/githubService.ts
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Получение списка репозиториев пользователя с GitHub
export const getUserProjects = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      params: {
        sort: 'updated', // Сортируем по дате последнего обновления
        per_page: 10,    // Ограничиваем до 10 репозиториев
      },
    });

    // Форматируем данные
    return response.data.map((repo: any) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || 'Нет описания',
      technologies: repo.language ? [repo.language] : [],
      link: repo.html_url,
    }));
  } catch (error) {
    console.error('Ошибка при загрузке проектов с GitHub:', error);
    return [];
  }
};
