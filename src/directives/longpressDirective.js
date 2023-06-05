
export default {
    async mounted(el, binding) {
        const duration = 500; // Продолжительность в миллисекундах (по умолчанию 500)
        let pressTimer = null;

        const start = async () => {
            if (pressTimer === null) {
                pressTimer = setTimeout( () => {
                    if (pressTimer !== null) {
                        binding.value(); // Дождаться выполнения промиса
                    }
                }, duration);
            }
        };

        const end = () => {
            clearTimeout(pressTimer);
            pressTimer = null;
        };

        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);
        el.addEventListener('click', end);
        el.addEventListener('mouseout', end);
        el.addEventListener('touchend', end);
        el.addEventListener('touchcancel', end);

        const cleanup = () => {
            el.removeEventListener('mousedown', start);
            el.removeEventListener('touchstart', start);
            el.removeEventListener('click', end);
            el.removeEventListener('mouseout', end);
            el.removeEventListener('touchend', end);
            el.removeEventListener('touchcancel', end);
        };

        // При уничтожении элемента очищаем обработчики событий
        el._cleanupLongpress = cleanup;
    },

    beforeUnmount(el) {
        const cleanup = el._cleanupLongpress;
        if (cleanup) {
            cleanup();
            delete el._cleanupLongpress;
        }
    },
};