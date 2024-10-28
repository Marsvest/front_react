export const Footer = () => {
    return (
        <footer className="bg-white">
            <div id="social_div" className="max-w-sm mx-auto flex justify-center gap-x-4">
                <a href="https://vk.com/miroslavonelove" target="_blank" rel="noopener noreferrer">
                    <img className="w-10 h-10 hover:opacity-80 transition-opacity" src="../src/assets/vk.png" alt="vk icon" id="vk_btn" />
                </a>
                <a href="https://t.me/mars_vest" target="_blank" rel="noopener noreferrer">
                    <img className="w-10 h-10 hover:opacity-80 transition-opacity" src="../src/assets/telegram.png" alt="tg icon" id="tg_btn" />
                </a>
                <a href="https://github.com/marsvest" target="_blank" rel="noopener noreferrer">
                    <img className="w-10 h-10 hover:opacity-80 transition-opacity" src="../src/assets/github.png" alt="git icon" id="git_btn" />
                </a>
            </div>
        </footer>
    );
}
