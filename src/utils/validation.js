export const validateName = (name) => {
    if (!name || name.trim() === '') {
        return 'Имя обязательно для заполнения';
    }
    return '';
};

export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return 'Email обязателен для заполнения';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Некорректный формат email';
    }
    return '';
};

export const validateMessage = (message) => {
    if (!message || message.trim() === '') {
        return 'Сообщение обязательно для заполнения';
    }
    return '';
};