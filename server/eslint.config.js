import globals from "globals";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
  },
  eslintConfigPrettier,
];
