/** @type {import('tailwindcss').Config} */
const {Colors} = require("./constants/colors");
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["FunnelDisplay-Light", "ui-sans-serif", "system-ui"],
            },
            colors: Colors,
        },
    },
    plugins: [],
}