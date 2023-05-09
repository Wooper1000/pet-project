export default function(phoneNumber) {
    if (phoneNumber.startsWith('8')) {
        phoneNumber = '+7' + phoneNumber.slice(1);
    }
    if (phoneNumber.startsWith('7')) {
        phoneNumber = '+' + phoneNumber;
    }
    if (phoneNumber.startsWith('9')) {
        phoneNumber = '+7' + phoneNumber;
    }
    return phoneNumber;
} 