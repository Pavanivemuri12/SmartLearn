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
    rules: {
      // Allow object types using `object` instead of `{}`
      "@typescript-eslint/no-empty-object-type": ["warn", { allowObjectTypes: true }],
      
      // Optional: warn instead of error for using `any`
      "@typescript-eslint/no-explicit-any": "warn",

      // Optional: allow `{} = {}` in generic places like reducers etc.
      // "@typescript-eslint/ban-types": ["warn", { types: { "{}": false } }],
    },
  },
];

export default eslintConfig;
