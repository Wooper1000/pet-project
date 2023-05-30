import { createI18n } from 'vue-i18n'

const i18n = new createI18n({
    locale: 'ru',
    legacy: false,
    messages: {
        ru: {
            'home': 'Главная',
            'add-mark': 'Добавить метку',
            'change-priority': 'Изменить приоритет',
            'show-on-map': 'Показать на карте',
            'set-signal': 'Установить сигнал',
            'paste': 'Вставить',
            'copy': 'Копировать',
            'edit': 'Редактировать',
            'setup': 'Настроить',
            'cancel': 'Отмена',
            'generate-title': 'Генерация',
            'generate-floors': 'Попататься сформировать этажи и подъезды автоматически',
            'enter-floor': 'Введите этаж',
            'enter-lounge': 'Введите подъезд',
            'join': 'Объединить',
            'join-floors-lounge': 'Объединить в этаж и подъезд',
            'lounge-title': 'Подъезд',
            'floor-title': 'Этаж',
            'subtask-title': 'Квартира',
            'floor': 'эт',
            'kv': 'кв',
            'tasks-list': 'Список задач',
            'new-task-create-title': 'Создание нового адреса',
            'enter-address': 'Введите адрес ',
            'address': 'Адрес',
            'enter-apartment': 'Введите количество квартир',
            'from': 'От',
            'to': 'До',
            'add-task': 'Добавьте первую задачу',
            'add-task-description': 'Сюда нужен текст на 2-3 строки',
            'search': 'Поиск',
            'create': 'Создать',
            'select': 'Выделить',
            'personal': 'Персональные',
            'your-position': 'Ваша должность',
            'your-position-changed': 'Ваша должность изменена',
            'your-phone': 'Ваш телефон',
            'enter-your-phone': 'Введите Ваш актуальный номер. На него мы отправим код для подтверждения',
            'your-phone-changed': 'Ваш номер телефона изменен',
            'your-password': 'Ваш пароль',
            'enter-your-password': 'Чтобы продолжить введите Ваш актуальный пароль',
            'your-password-changed': 'Ваш пароль изменен',
            'your-email': 'Ваша почта',
            'enter-email-for-code': 'Введите Ваш актуальный e-mail. На него мы отправим код для подтверждения',
            'save': 'Сохранить',
            'enter-code-sended-to': 'Введите код, отправленный на',
            'continue': 'Продолжить',
            'your-email-changed': 'Ваш e-mail изменен',
            'sign-in-success': 'Вход выполнен',
            'new-password': 'Новый пароль',
            'enter-new-password': 'Введите новый пароль',
            'change-password': 'Изменить пароль',
            'enter-registration-email': 'Введите e-mail, указанный при регистрации. На почту придет код для восстановления пароля',
            'get-code': 'Получить код',
            'format-error': 'Неверный формат',
            'epmty-field-error': 'Поле не должно быть пустым',
            'phone-field-error': 'Телефон необходим.',
            'phone-format-error': 'Неверный формат телефона',
            'nedd-low-case-letter': 'Нужна маленькая буква',
            'need-upper-case-letter': 'Нужна заглавная буква',
            'need-digit': 'Нужна цифра',
            'short-password-error': 'Не короче 8 символов',
            'enter-first-name': 'Введите имя',
            'first-name-too-long': 'Слишком длинное имя',
            'first-name-too-short': 'Слишком короткое имя',
            'first-name-digit-error': 'Имя не может содержать цифры',
            'enter-code': 'Введите код',
            'enter-4-digits': 'Введите 4 цифры',
            'enter-last-name': 'Введите фамилию',
            'last-name-too-long': 'Слишком длинная фамилия',
            'last-name-too-short': 'Слишком короткая фамилия',
            'last-name-digit-error': 'Фамилия не может содержать цифры',
            'enter-birthday': 'Введите дату рождения',
            'date-format-error': 'Неверный формат даты',
            'you-should-be-older': 'Вы должны быть старше 18',
            'select-gender': 'Выберите пол',
            'you-should-accept-rules': 'Вы должны согласиться с правилами',
            'email-required': 'E-mail необходим',
            'password-recovery': 'Восстановление пароля',
            'enter-email-code': 'Введите код, отправленный на e-mail',
            'code': 'Код',
            'ready': 'Готово',
            'u-didnt-receive-a-code': 'Не пришел код?',
            'send-again': 'Отправить повторно',
            'registration-title': 'Регистрация',
            'registration-subtitle': 'Зарегистрируйтесь, чтобы рабочий процесс стал комфортным',
            'first-name': 'Имя',
            'last-name': 'Фамилия',
            'birthday': 'Дата рождения',
            'gender': 'Пол',
            'phone-hint': 'Номер с кодом города, например +7 999 432 32 32',
            'email-hint': 'На почту придет ссылка для подтверждения аккаунта',
            'password-hint': 'от 8 символов, только латинские буквы и цифры',
            'password-again': 'Введите пароль еще раз',
            'enter-password': 'Введите пароль',
            'passwords-match-reject': 'Пароли не совпадают',
            'i-agree': 'Я согласен',
            'with-conditions': 'с условиями обработки персональных данных',
            'profile-exist': 'У вас уже есть профиль?',
            'gender-male': 'Мужской',
            'gender-female': 'Женский',
            'registration-error': 'Произошла ошибка при регистрации',
            'im-18-years-old': 'Мне есть 18 лет',
            'settings': 'Настройки',
            'tasks': 'Задачи',
            'profile': 'Профиль',
            'user': 'Пользователь',
            'position': 'Должность',
            'phone': 'Телефон',
            'company': 'Компания',
            'greeting': 'Добро пожаловать в Электрон',
            'app-description': 'Приложение для [описание на две-три строки]',
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
            'share-geo-external': 'Доступ геоданных внешним приложениям и агрегаторам',
            'notifications': 'Уведомления',
            'new-notifications': 'Новые',
            'old-notifications': 'Прочитанные'
        },
        en: {
            'today': 'Today',
            'new-task-create-title': 'Creating a new address',
            'enter-address': 'Enter an address ',
            'address': 'Address',
            'enter-apartment': 'Enter number of apartments',
            'from': 'From',
            'to': 'To',
            'add-task': 'Add first task',
            'add-task-description': 'We need 2-3 lines of text here',
            'search': 'Search',
            'create': 'Create',
            'select': 'Select',
            'personal': 'Personal',
            'your-position': 'Your position',
            'your-position-changed': 'Your position has changed',
            'your-phone': 'Your phone',
            'enter-your-phone': 'Enter your current number. We will send a confirmation code to it',
            'your-phone-changed': 'Your phone number has changed',
            'your-password': 'Your password',
            'enter-your-password': 'Enter your current password to continue',
            'your-password-changed': 'Your password has changed',
            'your-email': 'Your email',
            'enter-email-for-code': 'Enter your current e-mail. We will send a confirmation code to it',
            'save': 'Save',
            'enter-code-sended-to': 'Enter code sent to',
            'continue': 'Continue',
            'your-email-changed': 'Your email has changed',
            'sign-in-success': 'Signed in',
            'new-password': 'New password',
            'enter-new-password': 'Enter new password',
            'change-password': 'Change password',
            'enter-registration-email': 'Enter the e-mail provided during registration. A password recovery code will be sent to your email',
            'get-code': 'Get code',
            'format-error': 'Invalid format',
            'epmty-field-error': 'Field must not be empty',
            'phone-field-error': 'Phone is required.',
            'phone-format-error': 'Invalid phone format',
            'nedd-low-case-letter': 'Nedd-low-case-letter',
            'need-upper-case-letter': 'Need an uppercase letter',
            'need-digit': 'Need a number',
            'short-password-error': 'At least 8 characters',
            'enter-first-name': 'Enter a name',
            'first-name-too-long': 'Name too long',
            'first-name-too-short': 'Name too short',
            'first-name-digit-error': 'Name cannot contain numbers',
            'enter-code': 'Enter code',
            'enter-4-digits': 'Enter 4 digits',
            'enter-last-name': 'Enter last name',
            'last-name-too-long': 'Last name too long',
            'last-name-too-short': 'Last name too short',
            'last-name-digit-error': 'Last name cannot contain numbers',
            'enter-birthday': 'Enter date of birth',
            'date-format-error': 'Invalid date format',
            'you-should-be-older': 'You must be over 18',
            'select-gender': 'Select gender',
            'you-should-accept-rules': 'You must agree to the rules',
            'email-required': 'Email required',
            'password-recovery': 'Password recovery',
            'enter-email-code': 'Enter the code sent to your email',
            'code': 'Code',
            'ready': 'Ready',
            'u-didnt-receive-a-code': 'Didn\'t receive a code?',
            'send-again': 'Resend',
            'registration-title': 'Registration',
            'registration-subtitle': 'Register for a better workflow',
            'first-name': 'Name',
            'last-name': 'Last name',
            'birthday': 'Date of birth',
            'gender': 'Gender',
            'phone-hint': 'Number with area code, e.g. +7 999 432 32 32',
            'email-hint': 'A link to verify your account will be sent to your email',
            'password-hint': '8 characters or more, latin letters and numbers only',
            'password-again': 'Enter password again',
            'enter-password': 'Enter password',
            'passwords-match-reject': 'Passwords don\'t match',
            'i-agree': 'I agree',
            'with-conditions': 'with conditions for processing personal data',
            'profile-exist': 'Do you already have a profile?',
            'gender-male': 'Male',
            'gender-female': 'Female',
            'registration-error': 'An error occurred while registering',
            'im-18-years-old': 'I am 18 years old',
            'settings': 'Settings',
            'tasks': 'Tasks',
            'profile': 'Profile',
            'user': 'User',
            'position': 'Position',
            'phone': 'Phone',
            'company': 'Company',
            'greeting': 'Welcome to Electron',
            'app-description': 'App for [2-3 line description]',
            'btn-sign-in': 'Sign in',
            'log-if-u-can': 'Log in to your account if you already have an account',
            'sign-in-title': 'Login to your account',
            'password': 'Password',
            'forgot-password': 'Forgot your password?',
            'no-profile': 'Don\'t have a profile?',
            'signup': 'Sign up',
            'language': 'Language',
            'about-app': 'About app',
            'feedback': 'Feedback',
            'privacy-police': 'Privacy Policy',
            'terms-of-use': 'Terms of Use',
            'version': 'Version',
            'geo': 'Geolocation',
            'accept-geo': 'Accept device geolocation',
            'share-geo': 'Share geodata to task executors',
            'share-geo-admin': 'Share geodata to admin',
            'share-geo-external': 'Geodata access for external applications and aggregators',
            'notifications': 'Notifications',
            'new-notifications': 'New',
            'old-notifications': 'Read'
        },
        by: {
            'today': 'Сёння',
            'new-task-create-title': 'Стварэнне новага адраса',
            'enter-address': 'Увядзіце адрас ',
            'address': 'Адрас',
            'enter-apartment': 'Увядзіце колькасць кватэр',
            'from': 'Ад',
            'to': 'Да',
            'add-task': 'Дадайце першую задачу',
            'add-task-description': 'Сюды патрэбен тэкст на 2-3 радкі',
            'search': 'Пошук',
            'create': 'Стварыць',
            'select': 'Вылучыць',
            'personal': 'Персанальныя',
            'your-position': 'Ваша пасада',
            'your-position-changed': 'Ваша пасада зменена',
            'your-phone': 'Ваш тэлефон',
            'enter-your-phone': 'Увядзіце Ваш актуальны нумар. На яго мы адправім код для пацверджання',
            'your-phone-changed': 'Ваш нумар тэлефона зменены',
            'your-password': 'Ваш пароль',
            'enter-your-password': 'Каб працягнуць увядзіце Ваш актуальны пароль',
            'your-password-changed': 'Ваш пароль зьменены',
            'your-email': 'Ваша пошта',
            'enter-email-for-code': 'Увядзіце Ваш актуальны e-mail. На яго мы адправім код для пацверджання',
            'save': 'Захаваць',
            'enter-code-sended-to': 'Увядзіце код, дасланы на',
            'continue': 'Працягнуць',
            'your-email-changed': 'Ваш e-mail зменены',
            'sign-in-success': 'Уваход выкананы',
            'new-password': 'Новы пароль',
            'enter-new-password': 'Увядзіце новы пароль',
            'change-password': 'Змяніць пароль',
            'enter-registration-email': 'Увядзіце e-mail, указаны пры рэгістрацыі. На пошту прыйдзе код для аднаўлення пароля',
            'get-code': 'Атрымаць код',
            'format-error': 'Няслушны фармат',
            'epmty-field-error': 'Поле не павінна быць пустым',
            'phone-field-error': 'Тэлефон неабходны.',
            'phone-format-error': 'Няслушны фармат тэлефона',
            'nedd-low-case-letter': 'Патрэбна маленькая літара',
            'need-upper-case-letter': 'Патрэбна загалоўная літара',
            'need-digit': 'Патрэбная лічба',
            'short-password-error': 'Не карацей за 8 сімвалаў',
            'enter-first-name': 'Увядзіце імя',
            'first-name-too-long': 'Занадта доўгае імя',
            'first-name-too-short': 'Занадта кароткае імя',
            'first-name-digit-error': 'Імя не можа змяшчаць лічбы',
            'enter-code': 'Увядзіце код',
            'enter-4-digits': 'Увядзіце 4 лічбы',
            'enter-last-name': 'Увядзіце прозвішча',
            'last-name-too-long': 'Занадта доўгае прозвішча',
            'last-name-too-short': 'Занадта кароткае прозвішча',
            'last-name-digit-error': 'Прозвішча не можа змяшчаць лічбы',
            'enter-birthday': 'Увядзіце дату нараджэння',
            'date-format-error': 'Няслушны фармат даты',
            'you-should-be-older': 'Вы павінны быць старэйшыя за 18',
            'select-gender': 'Абярыце падлогу',
            'you-should-accept-rules': 'Вы павінны пагадзіцца з правіламі',
            'email-required': 'E-mail неабходны',
            'password-recovery': 'Аднаўленне пароля',
            'enter-email-code': 'Увядзіце код, дасланы на e-mail',
            'code': 'Код',
            'ready': 'Гатова',
            'u-didnt-receive-a-code': 'Не прыйшоў код?',
            'send-again': 'Даслаць паўторна',
            'registration-title': 'Рэгістрацыя',
            'registration-subtitle': 'Зарэгіструйцеся, каб працоўны працэс стаў камфортным',
            'first-name': 'Імя',
            'last-name': 'Прозвішча',
            'birthday': 'Дата нараджэння',
            'gender': 'Пол',
            'phone-hint': 'Нумар з кодам горада, напрыклад +7 999 432 32 32',
            'email-hint': 'На пошту прыйдзе спасылка для пацверджання акаўнта',
            'password-hint': 'ад 8 сімвалаў, толькі лацінскія літары і лічбы',
            'password-again': 'Увядзіце пароль яшчэ раз',
            'enter-password': 'Увядзіце пароль',
            'passwords-match-reject': 'Паролі не супадаюць',
            'i-agree': 'Я згодзен',
            'with-conditions': 'з умовамі апрацоўкі персанальных дадзеных',
            'profile-exist': 'У вас ужо ёсць профіль?',
            'gender-male': 'Мужчынскі',
            'gender-female': 'Жаночы',
            'registration-error': 'Адбылася памылка пры рэгістрацыі',
            'im-18-years-old': 'Мне ёсць 18 гадоў',
            'settings': 'Налады',
            'tasks': 'Задачы',
            'profile': 'Профіль',
            'user': 'Карыстальнік',
            'position': 'Пасада',
            'phone': 'Тэлефон',
            'company': 'Кампанія',
            'greeting': 'Сардэчна запрашаем у Электрон',
            'app-description': 'Дадатак для [апісанне на два-тры радкі]',
            'btn-sign-in': 'Увайсці',
            'log-if-u-can': 'Увайдзіце ў асабісты кабінет, калі ў вас ужо ёсць рахунак',
            'sign-in-title': 'Уваход у асабісты кабінет',
            'password': 'Пароль',
            'forgot-password': 'Забылі пароль?',
            'no-profile': 'У вас няма профіля?',
            'signup': 'Зарэгістравацца',
            'language': 'Мова',
            'about-app': 'Пра прыкладанне',
            'feedback': 'Зваротная сувязь',
            'privacy-police': 'Палітыка канфідэнцыйнасці',
            'terms-of-use': 'Умовы выкарыстання',
            'version': 'Версія',
            'geo': 'Геалакацыя',
            'accept-geo': 'Доступ да геапазіцыі прылады',
            'share-geo': 'Перадача геададзеных выканаўцам задач',
            'share-geo-admin': 'Перадача геададзеных адміністратару',
            'share-geo-external': 'Доступ геададзеных вонкавым прыкладанням і агрэгатарам',
            'notifications': 'Апавяшчэнні',
            'new-notifications': 'Новыя',
            'old-notifications': 'Прачытаныя'
        },
        ua:{
            'today': 'Сьогодні',
            'new-task-create-title': 'Створення нової адреси',
            'enter-address': 'Введіть адресу',
            'address': 'Адреса',
            'enter-apartment': 'Введіть кількість квартир',
            'from': 'Від',
            'to': 'До',
            'add-task': 'Додайте перше завдання',
            'add-task-description': 'Сюди потрібен текст на 2-3 рядки',
            'search': 'Пошук',
            'create': 'Створити',
            'select': 'Виділити',
            'personal': 'Персональні',
            'your-position': 'Ваша посада',
            'your-position-changed': 'Ваша посада змінена',
            'your-phone': 'Ваш телефон',
            'enter-your-phone': 'Введіть свій актуальний номер. На нього ми надішлемо код для підтвердження',
            'your-phone-changed': 'Ваш номер телефону змінено',
            'your-password': 'Ваш пароль',
            'enter-your-password': 'Щоб продовжити, введіть свій актуальний пароль',
            'your-password-changed': 'Ваш пароль змінено',
            'your-email': 'Ваша пошта',
            'enter-email-for-code': 'Введіть свій актуальний e-mail. На нього ми надішлемо код для підтвердження',
            'save': 'Зберегти',
            'enter-code-sended-to': 'Введіть код, надісланий на',
            'continue': 'Продовжити',
            'your-email-changed': 'Ваш e-mail змінений',
            'sign-in-success': 'Вхід виконано',
            'new-password': 'Новий пароль',
            'enter-new-password': 'Введіть новий пароль',
            'change-password': 'Змінити пароль',
            'enter-registration-email': 'Введіть e-mail, вказаний під час реєстрації. На пошту прийде код відновлення пароля',
            'get-code': 'Отримати код',
            'format-error': 'Неправильний формат',
            'epmty-field-error': 'Поле не повинно бути порожнім',
            'phone-field-error': 'Телефон необхідний.',
            'phone-format-error': 'Неправильний формат телефону',
            'nedd-low-case-letter': 'Потрібна маленька буква',
            'need-upper-case-letter': 'Потрібна велика літера',
            'need-digit': 'Потрібна цифра',
            'short-password-error': 'Не коротше 8 символів',
            'enter-first-name': 'Введіть ім\'я',
            'first-name-too-long': 'Занадто довге ім\'я',
            'first-name-too-short': 'Занадто коротке ім\'я',
            'first-name-digit-error': 'Ім\'я не може містити цифри',
            'enter-code': 'Введіть код',
            'enter-4-digits': 'Введіть 4 цифри',
            'enter-last-name': 'Введіть прізвище',
            'last-name-too-long': 'Занадто довге прізвище',
            'last-name-too-short': 'Занадто коротке прізвище',
            'last-name-digit-error': 'Прізвище не може містити цифри',
            'enter-birthday': 'Введіть дату народження',
            'date-format-error': 'Неправильний формат дати',
            'you-should-be-older': 'Ви повинні бути старше 18',
            'select-gender': 'Виберіть підлогу',
            'you-should-accept-rules': 'Ви повинні погодитися з правилами',
            'email-required': 'E-mail необхідний',
            'password-recovery': 'Відновлення пароля',
            'enter-email-code': 'Введіть код, надісланий на e-mail',
            'code': 'Код',
            'ready': 'Готово',
            'u-didnt-receive-a-code': 'Не надійшов код?',
            'send-again': 'Надіслати повторно',
            'registration-title': 'Реєстрація',
            'registration-subtitle': 'Зареєструйтесь, щоб робочий процес став комфортним',
            'first-name': 'Ім\'я',
            'last-name': 'Прізвище',
            'birthday': 'Дата народження',
            'gender': 'Пол',
            'phone-hint': 'Номер з кодом міста, наприклад +7 999 432 32 32',
            'email-hint': 'На пошту прийде посилання для підтвердження облікового запису',
            'password-hint': 'від 8 символів, тільки латинські літери та цифри',
            'password-again': 'Введіть пароль ще раз',
            'enter-password': 'Введіть пароль',
            'passwords-match-reject': 'Паролі не збігаються',
            'i-agree': 'Я згоден',
            'with-conditions': 'з умовами обробки персональних даних',
            'profile-exist': 'У вас вже є профіль?',
            'gender-male': 'Чоловічий',
            'gender-female': 'Жіночий',
            'registration-error': 'Відбулася помилка під час реєстрації',
            'im-18-years-old': 'Мені є 18 років',
            'settings': 'Налаштування',
            'tasks': 'Завдання',
            'profile': 'Профіль',
            'user': 'Користувач',
            'position': 'Посада',
            'phone': 'Телефон',
            'company': 'Компанія',
            'greeting': 'Ласкаво просимо до Електрону',
            'app-description': 'Додаток для [опис на два-три рядки]',
            'btn-sign-in': 'Увійти',
            'log-if-u-can': 'Увійдіть до особистого кабінету, якщо у вас вже є обліковий запис',
            'sign-in-title': 'Вхід до особистого кабінету',
            'password': 'Пароль',
            'forgot-password': 'Забули пароль?',
            'no-profile': 'У вас немає профілю?',
            'signup': 'Зареєструватися',
            'language': 'Мова',
            'about-app': 'Про програму',
            'feedback': 'Зворотний зв\'язок',
            'privacy-police': 'Політика конфіденційності',
            'terms-of-use': 'Умови використання',
            'version': 'Версія',
            'geo': 'Геолокація',
            'accept-geo': 'Доступ до геопозиції пристрою',
            'share-geo': 'Передача геоданих виконавцям завдань',
            'share-geo-admin': 'Передача геоданих адміністратору',
            'share-geo-external': 'Доступ геоданих зовнішніх додатків та агрегаторів',
            'notifications': 'Сповіщення',
            'new-notifications': 'Нові',
            'old-notifications': 'Прочитані'
        }
    }
})

export default i18n