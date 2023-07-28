const utils = require("./tailwind.utils");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  darkMode: "class",
  theme: {
    boxShadow: {
      "0dp": "",
      "1dp": utils.createShadow(false, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "2dp": utils.createShadow(false, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "3dp": utils.createShadow(false, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      "4dp": utils.createShadow(false, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      "6dp": utils.createShadow(false, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      "8dp": utils.createShadow(false, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      "12dp": utils.createShadow(false, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      "16dp": utils.createShadow(false, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      "24dp": utils.createShadow(false, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
      "inset-0dp": "",
      "inset-1dp": utils.createShadow(true, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "inset-2dp": utils.createShadow(true, 0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      "inset-3dp": utils.createShadow(true, 0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      "inset-4dp": utils.createShadow(true, 0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      "inset-6dp": utils.createShadow(true, 0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      "inset-8dp": utils.createShadow(true, 0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      "inset-12dp": utils.createShadow(true, 0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      "inset-16dp": utils.createShadow(true, 0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      "inset-24dp": utils.createShadow(true, 0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    },
  },
  plugins: [utils.flexGapPlugin, utils.scrollBarPlugin],
};
