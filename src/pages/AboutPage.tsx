export const AboutPage = () => {
    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Обо мне</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Моя фотография"
                        className="rounded-full mb-4 mx-auto"
                    />
                    <h2 className="text-2xl font-semibold mb-2 text-center">Артём, студент 3 курса</h2>
                    <div className="px-10">
                        <p className="text-gray-700 mb-10 indent-4 text-center">
                            Привет! Меня зовут Артём, я студент третьего курса ПМИ ДВФУ.
                            Я увлекаюсь программированием и разработкой веб-приложений.
                            Мой опыт включает работу с React, Vue3, Tailwind CSS, Django, FastAPI и др.
                            Также, я программирую на Python, увлекаюсь backend разработкой.
                            В последнее время активно изучаю ИИ, нейросети и анализ данных.
                        </p>
                    </div>

                    <ul className="list-disc list-inside mb-2 indent-4 text-center">
                        <li>Веб-разработка</li>
                        <li>Искусственный интеллект</li>
                        <li>Анализ данных</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};
