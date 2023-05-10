import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'ru', // Устанавливаем русский язык в качестве языка по умолчанию
    messages: {
        ru: {
            'User is not approve his email {email}': 'Пользователь не подтвердил свою электронную почту {email}',
            'User with email {email} is not found': 'Пользователь с email {email} не найден',
            'Check email to confirm your account': 'Проверьте почту {email} для подтверждения аккаунта',
            'User with email {email} is already exists':'Пользователь с почтой {email} уже зарегистрирован',
            'Username or password is not correct':'Имя или пароль введены неверно'
            // Добавьте здесь другие переводы
        },
    },
})

export default i18n