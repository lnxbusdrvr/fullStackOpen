import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginVitestGlobals from "eslint-plugin-vitest-globals";

const sanitizedGlobals = Object.fromEntries(
  Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
);

export default [
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...sanitizedGlobals,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
      "vitest-globals": pluginVitestGlobals,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "always"],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off"
    },
  },
  {
    files: ["**/*.{test,spec}.{js,mjs,cjs,jsx,ts,tsx}"], // Vitest-testitiedostot
    plugins: {
    },
    rules: {
      // Lisää Vitest-spesifisiä sääntöjä (jos haluat, esim.):
    },
    languageOptions: {
      globals: {
        ...sanitizedGlobals,
        ...pluginVitestGlobals.environments.env.globals, // Lisää Vitestin globaalit muuttujat
      },
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "eslint.config.js",
      "vite.config.js"
    ],
  },
];

