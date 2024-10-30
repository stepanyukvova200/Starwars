import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true, // Додай цю опцію
        environment: 'jsdom', // Використовуй jsdom для браузерних тестів
    },
})
