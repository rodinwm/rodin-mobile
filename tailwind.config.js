/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            /*
            fontFamily: {
                sans: ["FunnelDisplay", "ui-sans-serif", "system-ui"],
                serif: ["FunnelDisplay", "ui-serif", "Georgia"],
                mono: ["FunnelDisplay", "ui-monospace", "SFMono-Regular"],
            },
             */
        },
    },
    plugins: [],
}