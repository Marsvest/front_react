import React, { useState } from 'react';
import { validateName, validateEmail, validateMessage } from '../utils/validation';

const validationMessages = {
    name: 'Имя должно быть не менее 2 символов',
    email: 'Введите корректный email',
    message: 'Сообщение должно быть не менее 10 символов',
};

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            name: validateName(formData.name) ? '' : validationMessages.name,
            email: validateEmail(formData.email) ? '' : validationMessages.email,
            message: validateMessage(formData.message) ? '' : validationMessages.message,
        };
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            message: '',
        });
        setErrors({
            name: '',
            email: '',
            message: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Форма отправлена:', formData);
            resetForm()
        }
    };

    const email = 'bykov.ad@dvfu.ru';
    const tel = '+79143399250';

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Контакты</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Свяжитесь со мной</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Имя:
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ваше имя"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Ваш email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Сообщение:
                            </label>
                            <textarea
                                id="message"
                                placeholder="Ваше сообщение"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                            />
                            {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="hover:text-blue-500 text-grey-700 font-bold py-2 px-4 rounded"
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Контактная информация</h3>
                    <div className="mb-1">
                        <a href={`tel:${tel}`} className="text-blue-500 hover:underline">
                            Телефон: {tel}
                        </a>
                    </div>
                    <div>
                        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
                            E-mail: {email}
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};