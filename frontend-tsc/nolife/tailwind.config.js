/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
        quickSand: ["Quicksand", "sans-serif"],
        montserat: ["Montserrat", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        alata: ["Alata", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      backgroundImage: {
        cool: "url('/cool-background.svg')",
        cool2: "url('/bg2.svg')",
        bg3: "url('/bg3.gif')",
        bg4: "url('/bg4.gif')",
        bg5: "url('/bg5.gif')",
      },
    },
  },
  plugins: [],
};
