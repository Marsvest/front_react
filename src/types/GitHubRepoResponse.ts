export interface GitHubRepoResponse {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
  }