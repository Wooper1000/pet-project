export const emailRules = [
    v => !!v || 'E-mail необходим.',
    v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Неверный формат.'
];

export const phoneRules = [
    v => !!v || 'Телефон необходим.',
    v => /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v) || 'Неверный формат телефона.'
];

export const passwordRules = [
    v => !!v || 'Введите пароль',
    v => /[a-z]/.test(v) || 'Нужна маленькая буква',
    v => /[A-Z]/.test(v) || 'Нужна заглавная буква',
    v => /\d/.test(v) || 'Нужна цифра',
    v => v.length >= 8 || 'Не короче  символов',
];

export const firstNameRules = [
    v => !!v || 'Введите имя',
    v => (v && v.length <= 30) || 'Слишком длинное имя',
    v => (v && v.length >= 2) || 'Слишком короткое имя',
    v => (/^\D+$/i.test(v)) || 'Имя не может содержать цифры',
];

export const confirmCodeRules = [
    v => !!v || 'Введите код',
    v => {
        if (!v ) return true;
        const pattern = /^\d{4}$/;
        return pattern.test(v) || 'Введите 4 цифры.';
    }
];

export const lastNameRules = [
    v => !!v || 'Введите фамилию',
    v => (v && v.length <= 30) || 'Слишком длинная фамилия',
    v => (v && v.length >= 2) || 'Слишком короткая фамилия',
    v => (/^\D+$/i.test(v)) || 'Фамилия не может содержать цифры',
];

export const birthdayRules = [
    v => !!v || 'Введите дату рождения',

    v => {
        const today = new Date()
        const birthDate = new Date(v)
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

    return age>=18 || 'Вы должны быть старше 18'
    }
];

export const genderSelectedRules = [
    v => !!v || 'Выберите пол',
    v => v==='Мужской' || 'Вы должны быть мужчиной'
];
export const agreementCheckRules = [
    v => v!=='checked' || 'Вы должны согласиться с правилами'
];
export const watcher = {
    'form.items': {
        handler() {
            this.isFormDisabled=this.form.items.some(item => !item.isValid)
        },
        deep: true
    },
}
