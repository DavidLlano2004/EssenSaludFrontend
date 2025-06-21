export const arrayRulesPassword = (password) => [
    {
        text: "Mínimo 12 caracteres",
        valid: password !== undefined && password.length >= 7
    },
    {
        text: "Un número (0-9)",
        valid: password !== undefined && /^(?=.*\d)/.test(password)
    },
    {
        text: "Una mayúscula (A-Z)",
        valid: password !== undefined && /^(?=.*[A-Z])/.test(password)
    },
    {
        text: "Una minúscula (a-z)",
        valid: password !== undefined && /^(?=.*[a-z])/.test(password)
    },
    {
        text: "Un caracter especial o símbolo (%-#)",
        valid: password !== undefined && /^(?=.*[\W_])/.test(password)
    },
]