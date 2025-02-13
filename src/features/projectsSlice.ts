import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';
import { Middleware } from 'redux';

type ProjectState = {
    projects: Project[];
    filteredProjects: Project[];
};

const initialState: ProjectState = {
    projects: [],
    filteredProjects: [],
};

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    // После добавления или удаления проекта сохраняем состояние в localStorage
    if (action.type === 'projects/addProject' || action.type === 'projects/deleteProject') {
        const state = store.getState() as { projects: ProjectState };
        localStorage.setItem('projects', JSON.stringify(state.projects.projects));
    }
    return result;
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        loadProjects: (state) => {
            const saved = localStorage.getItem('projects');
            if (saved) {
                try {
                    state.projects = JSON.parse(saved);
                } catch (e) {
                    console.error('Error parsing projects from localStorage', e);
                    state.projects = [];
                }
            }
            state.filteredProjects = state.projects;
        },
        setFilter: (state, action: PayloadAction<string[]>) => {
            const selectedTech = action.payload;
            if (selectedTech.length === 0) {
                state.filteredProjects = state.projects;
            } else {
                state.filteredProjects = state.projects.filter((project) =>
                    selectedTech.some((tech) => project.technologies.includes(tech))
                );
            }
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            // Удаляем проект из массива проектов и фильтрованных проектов
            state.projects = state.projects.filter((project) => project.id !== action.payload);
            state.filteredProjects = state.filteredProjects.filter(
                (project) => project.id !== action.payload
            );
        }
    }
});

export const { addProject, loadProjects, setFilter, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
