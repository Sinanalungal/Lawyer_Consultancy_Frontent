/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.ts
// import withMT from "@material-tailwind/react/utils/withMT";
// import path from 'path';


// const config = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     path.join(__dirname, "../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}"),
//     path.join(__dirname, "../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"),
//     // "../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
//     // "../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default withMT(config);
