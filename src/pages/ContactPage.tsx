export const ContactPage = () => {
    const email = 'bykov.ad@dvfu.ru';
    const tel = '+79143399250';
    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Контакты</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Свяжитесь со мной</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Имя:
                            </label>
                            <br />
                            <input
                                type="text"
                                id="name"
                                placeholder="Ваше имя"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                placeholder="Ваш email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Сообщение:
                            </label>
                            <br />
                            <textarea
                                id="message"
                                placeholder="Ваше сообщение"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="hover:text-blue-500 text-grey-700 font-bold py-2 px-4 rounded "
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
