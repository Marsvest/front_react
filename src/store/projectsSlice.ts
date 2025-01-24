// src/store/projectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';

interface ProjectsState {
  items: Project[];
}

const initialState: ProjectsState = {
  items: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Добавление нового проекта
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload);
    },
    // Установка проектов из localStorage
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addProject, setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
