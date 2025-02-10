import './output.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Provider
import { store } from './store'; // Импортируем созданный store
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Оборачиваем App в Provider и передаем store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);