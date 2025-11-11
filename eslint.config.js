import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  // File patterns
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  // Ignore patterns
  {
    ignores: ["node_modules/", "dist/", "build/", "*.config.js"]
  },

  // Language options
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  },

  // Base configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Custom rules
  {
    rules: {
      "no-unused-vars": "off", // Disabled in favor of TypeScript's own check
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },

  // Prettier integration (must be last)
  eslintPluginPrettier,
];
