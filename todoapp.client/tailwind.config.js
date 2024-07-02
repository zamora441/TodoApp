/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.jsx",
        "./src/components/**/*.jsx",
        "./src/pages/**/*.jsx",
        "./src/layouts/**/*.jsx",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "bright-blue": "hsl(220, 98%, 61%)",
                //light theme
                "very-light-gray": "hsl(0, 0%, 98%)",
                "very-light-gravish": "hsl(236, 33%, 92%)",
                "light-gravish-blue": "hsl(233, 11%, 84%)",
                "dark-gravish-blue": "hsl(236, 9%, 61%)",
                "very-dark-gravish-blue": "hsl(235, 19%, 35%)",
                //dark theme
                "very-dark-blue": "hsl(235, 21%, 11%)",
                "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
                "light-grayish-blue": "hsl(234, 39%, 85%)",
                "dark-grayish-blue": "hsl(234, 11%, 52%)",
                "very-dark-grayish-blue-1": "hsl(233, 14%, 35%)",
                "very-dark-grayish-blue-2": "hsl(237, 14%, 26%)",
            },
            backgroundImage: {
                "hero-image-light-desktop":
                    "url(/assets/images/bg-desktop-light.jpg)",
                "hero-image-light-mobile":
                    "url(/assets/images/bg-mobile-light.jpg)",
                "hero-image-dark-desktop":
                    "url(/assets/images/bg-desktop-dark.jpg)",
                "hero-image-dark-mobile":
                    "url(/assets/images/bg-mobile-dark.jpg)",
                "light-gradient":
                    "linear-gradient(to top right, #06b6d4, #7e22ce)",
                "dark-gradient":
                    "linear-gradient(to top right, #321ace, #6D1C7C)",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    plugins: [],
};
