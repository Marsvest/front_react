export const SkillsPage = () => {
    const skills = [
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Python", level: 75 },
        { name: "Django", level: 70 },
        { name: "CSS", level: 85 },
        { name: "Tailwind CSS", level: 80 },
        { name: "Git", level: 75 },
    ];

    return (
        <main className="bg-[url('../public/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-4">Мои Навыки</h1>
                <div>
                    {skills.map((skill, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between mb-10">
                                <span className="font-semibold">{skill.name}: {skill.level}%</span>
                            </div>
                            <div className="bg-gray-300 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
