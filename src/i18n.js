import { createI18n } from 'vue-i18n'

const i18n = new createI18n({
    locale: 'ru',
    legacy: false,
    messages: {
        ru: {
            'btn-sign-in': 'Войти',
            'log-if-u-can': 'Войдите в личный кабинет, если у вас уже есть аккаунт',
            'sign-in-title': 'Вход в личный кабинет',
            'password': 'Пароль',
            'forgot-password': 'Забыли пароль?',
            'no-profile': 'У вас нет профиля?',
            'signup': 'Зарегистрироваться',
            'language': 'Язык',
            'about-app': 'О приложении',
            'feedback': 'Обратная связь',
            'privacy-police': 'Политика конфиденциальности',
            'terms-of-use': 'Условия использования',
            'version': 'Версия',
            'geo': 'Геолокация',
            'accept-geo': 'Доступ к геопозиции устройства',
            'share-geo': 'Передача геоданных исполнителям задач',
            'share-geo-admin': 'Передача геоданных администратору',
            'share-geo-external': 'Доступ геоданных внешним приложениям и агрегаторам'
        },
        en: {
            'btn-sign-in': 'Sign In',
            'sign-in-title': 'login to personal account',
            'log-if-u-can': 'Log in to your personal account if you already have an account',
            'password': 'Password',
            'forgot-password': 'Forgot your password?',
            'no-profile': 'Don\'t have a profile?',
            'signup': 'Sign up',
            'language': 'Language',
            'about-app': 'О About app',
            'feedback': 'Feedback',
            'privacy-police': 'Privacy police',
            'terms-of-use': 'Terms-of-use',
            'version': 'Version',
            'geo': 'Gelocation',
            'accept-geo': 'Access to device location',
            'share-geo': 'Transferring geodata to task performers',
            'share-geo-admin': 'Transferring geodata to the administrator',
            'share-geo-external': 'Geodata access to external applications and aggregators'
        }
    },
})

export default i18n