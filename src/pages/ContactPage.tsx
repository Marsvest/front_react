import { useState } from 'react';

// Функция для проверки email
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

export const ContactPage = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;
        const newErrors: { name?: string; email?: string; message?: string } = {};

        // Проверка обязательных полей
        if (!name) {
            isValid = false;
            newErrors.name = 'Поле имя обязательно для заполнения';
        }
        if (!email) {
            isValid = false;
            newErrors.email = 'Поле email обязательно для заполнения';
        } else if (!isValidEmail(email)) {
            isValid = false;
            newErrors.email = 'Введите корректный email';
        }
        if (!message) {
            isValid = false;
            newErrors.message = 'Поле сообщение обязательно для заполнения';
        }

        setErrors(newErrors);

        if (isValid) {
            setIsSubmitted(true);
            // Очистка полей после успешной отправки
            setName('');
            setEmail('');
            setMessage('');
        } else {
            setIsSubmitted(false);
        }
    };

    return (
        <div className="min-h-screen bg-[url('../public/bg.jpg')] bg-cover bg-center flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-4xl font-bold mb-4 text-center">Контакты</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Имя:<br />
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ваше имя"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:<br />
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ваш email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Сообщение:<br />
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ваше сообщение"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows={4}
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="hover:text-blue-500 text-gray-700 font-bold py-2 px-4 rounded"
                        >
                            Отправить
                        </button>
                    </div>

                    {isSubmitted && (
                        <div className="mt-4 text-green-500 text-center">
                            Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
