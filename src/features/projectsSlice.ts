import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';

type ProjectState = {
    projects: Project[];
    filteredProjects: Project[]; // Для хранения отфильтрованных проектов
};

const initialState: ProjectState = {
    projects: [],
    filteredProjects: [],
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        loadProjects: (state) => {
            const saved = localStorage.getItem('projects');
            if (saved) {
                state.projects = JSON.parse(saved);
            }
            state.filteredProjects = state.projects; // Изначально показываем все проекты
        },
        setFilter: (state, action: PayloadAction<string[]>) => {
            const selectedTech = action.payload;
            // Фильтруем проекты по выбранным технологиям
            if (selectedTech.length === 0) {
                state.filteredProjects = state.projects; // Если нет выбранных технологий, показываем все проекты
            } else {
                state.filteredProjects = state.projects.filter((project) =>
                    selectedTech.some((tech) => project.technologies.includes(tech))
                );
            }
        }
    }
});

export const { addProject, loadProjects, setFilter } = projectsSlice.actions;
export default projectsSlice.reducer;
