// tailwind.config.js
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#444cf7',
                secondary: '#13006c',
                highlight: '#7f84e4',
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
                    "--highlight": theme("colors.highlight"),
                },
            });
        },],
};
