// @ts-check
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      //"@typescript-eslint/indent": ["error", 2],
      "space-before-blocks": ["error", "always"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "object-curly-spacing": ["error", "always"],
      "sort-imports": ["warn", { "ignoreCase": false, "ignoreDeclarationSort": true }],
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variableLike",
          "format": ["camelCase"]
        }
      ],
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  eslintConfigPrettier,
);
