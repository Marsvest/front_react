import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="bg-gray-800 text-white">
            <nav className="container mx-auto p-4">
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link to="/" className="hover:text-red-400">Главная</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-red-400">Обо мне</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-red-400">Контакты</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="hover:text-red-400">Проекты</Link>
                    </li>
                    <li>
                        <Link to="/skills" className="hover:text-red-400">Навыки</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
