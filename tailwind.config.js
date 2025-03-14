// tailwind.config.js
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#d9d9da',
                secondary: '#ffc86b',
                third: '#717275'
            },
        },
    },
    plugins: [
        function ({ addBase, theme }) {
            // for allowing => var(--property)
            addBase({
                ":root": {
                    "--primary": theme("colors.primary"),
                    "--secondary": theme("colors.secondary"),
                    "--third": theme("colors.third")
                },
            });
        },],
};
