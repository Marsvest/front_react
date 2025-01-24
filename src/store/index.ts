// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';

// Загрузка состояния из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    return undefined;
  }
};

// Сохранение состояния в localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error('Could not save state to localStorage', e);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
  preloadedState,
});

// Подписка на изменения store
store.subscribe(() => {
  saveState(store.getState());
});
