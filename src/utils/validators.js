export const email = [
    v => !!v || 'E-mail необходим',
    v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Неверный формат'
];
export const text =[
    v=> !!v  && v.length > 1 || 'Поле не должно быть пустым',
]
export const phone = [
    v => !!v || 'Телефон необходим.',
    v => /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v) || 'Неверный формат телефона'
];

export const password = [
    v => !!v || 'Введите пароль',
    v => /[a-z]/.test(v) || 'Нужна маленькая буква',
    v => /[A-Z]/.test(v) || 'Нужна заглавная буква',
    v => /\d/.test(v) || 'Нужна цифра',
    v => v.length >= 8 || 'Не короче 8 символов',
];

export const firstName = [
    v => !!v || 'Введите имя',
    v => (v && v.length <= 30) || 'Слишком длинное имя',
    v => (v && v.length >= 2) || 'Слишком короткое имя',
    v => (/^\D+$/i.test(v)) || 'Имя не может содержать цифры',
];

export const confirmCode = [
    v => !!v || 'Введите код',
    v => {
        if (!v ) return true;
        const pattern = /^\d{4}$/;
        return pattern.test(v) || 'Введите 4 цифры';
    }
];

export const lastName = [
    v => !!v || 'Введите фамилию',
    v => (v && v.length <= 30) || 'Слишком длинная фамилия',
    v => (v && v.length >= 2) || 'Слишком короткая фамилия',
    v => (/^\D+$/i.test(v)) || 'Фамилия не может содержать цифры',
];

export const birthday = [
    v => !!v || 'Введите дату рождения',

    v => {
        if(v.length < 10) return  true;
        let dateParts = v.split('.');
        let dateFormated = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const today = new Date()
        const birthDate = new Date(dateFormated)
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

    return age>=18 || 'Вы должны быть старше 18'
    }
];

export const genderSelected = [
    v => v!=='Пол' || 'Выберите пол',
];
export const agreementCheck = [
    v => v || 'Вы должны согласиться с правилами'
];

