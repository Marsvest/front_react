import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '../types/Project';
import { Middleware } from 'redux';
import { getPublicRepos } from '../services/githubService';

type ProjectState = {
    projects: Project[];
    filteredProjects: Project[];
    isLoading: boolean;
    error: string | null; 
};

const initialState: ProjectState = {
    projects: [],
    filteredProjects: [],
    isLoading: false,
    error: null,
};

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (username: string, { rejectWithValue }) => {
        try {
            const projects = await getPublicRepos(username); 
            return projects;
        } catch (error) {
            return rejectWithValue('Не удалось загрузить проекты');
        }
    }
);

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
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
            state.filteredProjects = state.projects;
        },
        loadProjects: (state) => {
            const saved = localStorage.getItem('projects');
            if (saved) {
                try {
                    state.projects = JSON.parse(saved);
                    state.filteredProjects = state.projects;
                } catch (e) {
                    console.error('Error parsing projects from localStorage', e);
                    state.projects = [];
                    state.filteredProjects = [];
                }
            }
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
            state.projects = state.projects.filter((project) => project.id !== action.payload);
            state.filteredProjects = state.filteredProjects.filter(
                (project) => project.id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
                state.isLoading = false;
                state.projects = action.payload; 
                state.filteredProjects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { addProject, loadProjects, setFilter, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;