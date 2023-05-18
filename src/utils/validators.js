import i18n from "../i18n";
const { t } = i18n.global;

export const email = [
    v => !!v || t('email-required'),
    v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || t('format-error')
];
export const text =[
    v=> !!v  && v.length > 1 || t('epmty-field-error')
]
export const phone = [
    v => !!v || t('phone-field-error'), 
    v => /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(v) || t('phone-format-error')
];

export const password = [
    v => !!v || t('enter-password'),
    v => /[a-z]/.test(v) || t('nedd-low-case-letter'),
    v => /[A-Z]/.test(v) || t('need-upper-case-letter'),
    v => /\d/.test(v) || t('need-digit'),
    v => v.length >= 8 || t('short-password-error'),
];

export const firstName = [
    v => !!v || t('enter-first-name'),
    v => (v && v.length <= 30) || t('first-name-too-long'),
    v => (v && v.length >= 2) || t('first-name-too-short'),
    v => (/^\D+$/i.test(v)) || t('first-name-digit-error'),
];

export const confirmCode = [
    v => !!v || t('enter-code'),
    v => {
        if (!v ) return true;
        const pattern = /^\d{4}$/;
        return pattern.test(v) || t('enter-4-digits');
    }
];

export const lastName = [
    v => !!v || t('enter-last-name'),
    v => (v && v.length <= 30) || t('last-name-too-long'),
    v => (v && v.length >= 2) || t('last-name-too-short'),
    v => (/^\D+$/i.test(v)) || t('last-name-digit-error'),
];

export const birthday = [
    v => !!v ||  t('enter-birthday'),

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
        console.log(age)
    if(isNaN(age)) return t('date-format-error')
    return age>=18 || t('you-should-be-older')
    }
];

export const genderSelected = [
    v => v || t('select-gender'),
];
export const agreementCheck = [
    v => v || t('you-should-accept-rules')
];
export const ageCheck = [
    v => v || ''
];

