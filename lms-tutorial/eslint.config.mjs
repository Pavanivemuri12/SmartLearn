import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // for type-aware linting
      },
    },
    rules: {
      // Fix no-empty-object-type issue with correct option key
      "@typescript-eslint/no-empty-object-type": [
        "warn",
        { allowObjectTypes: true }
      ],

      // Warn (not error) on using `any`
      "@typescript-eslint/no-explicit-any": "warn",

      // Allow unused variables if prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        }
      ],
    },
  },
];

export default eslintConfig;
