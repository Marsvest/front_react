// src/types/Project.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }
  
  // Типизация для состояния формы добавления нового проекта
  export interface NewProjectForm {
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }
  