export const HomePage = () => {
    const email = 'bykov.ad@dvfu.ru';
    const tel = '+79143399250';

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
            <div className="p-6 min-w-10 text-center">
                <h1 className="text-2xl font-bold mb-2">Артём Быков</h1>
                <p className="text-gray-700 mb-1">Прикладная математика и информатика</p>
                <p className="text-gray-700 mb-4">Системное программирование</p>
                <div className="data-content mb-2">
                    <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
                        e-mail: {email}
                    </a>
                </div>
                <div className="data-content">
                    <a href={`tel:${tel}`} className="text-blue-500 hover:underline">
                        tel: {tel}
                    </a>
                </div>
            </div>
        </main>
    );
};
