import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: [".next/", ".cache/", "public/", ".config/*", "puppeteer.config.cjs"],
  },
  ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "next/core-web-vitals",
  )), {
    plugins: {
      import: fixupPluginRules(_import),
      react: fixupPluginRules(react),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      tailwindcss: fixupPluginRules(tailwindcss),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      },

      react: {
        version: "detect",
      },
    },

    rules: {
      "accessor-pairs": 0,
      "array-callback-return": 2,
      "block-scoped-var": 2,

      "consistent-return": 2,
      curly: [2, "multi-line"],

      "default-case": [2, {
        commentPattern: "^no default$",
      }],

      "dot-notation": [1, {
        allowKeywords: true,
      }],

      "dot-location": [2, "property"],
      eqeqeq: [2],
      "guard-for-in": 2,
      "no-alert": 1,
      "no-case-declarations": 2,
      "no-div-regex": 0,
      "no-else-return": 2,

      "no-empty-function": [2, {
        allow: ["arrowFunctions", "functions", "methods"],
      }],

      "no-empty-pattern": 2,
      "no-eval": 2,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-fallthrough": 2,
      "no-floating-decimal": 2,
      "no-implicit-coercion": 0,
      "no-implicit-globals": 2,
      "no-implied-eval": 2,
      "no-iterator": 2,
      "no-extra-label": 2,

      "no-labels": [2, {
        allowLoop: false,
        allowSwitch: false,
      }],

      "no-lone-blocks": 2,
      "no-loop-func": 2,

      "no-multi-spaces": 2,
      "no-multi-str": 2,
      "no-new": 2,
      "no-new-func": 2,
      "no-new-wrappers": 2,
      "no-octal": 2,
      "no-octal-escape": 2,

      "no-param-reassign": [2, {
        props: false,
      }],

      "no-proto": 2,
      "no-redeclare": 2,
      "no-return-assign": 2,
      "no-script-url": 2,
      "no-self-assign": 2,
      "no-self-compare": 2,
      "no-sequences": 2,
      "no-throw-literal": 2,
      "no-unmodified-loop-condition": 0,
      "no-unused-expressions": 2,
      "no-unused-labels": 2,
      "no-useless-concat": 2,
      "no-useless-escape": 'warn',
      "no-void": 0,

      "no-warning-comments": [1, {
        terms: ["todo", "fixme", "xxx"],
        location: "start",
      }],

      "no-with": 2,
      "vars-on-top": 2,
      "wrap-iife": [2, "any"],
      yoda: 2,
      "comma-dangle": [2, "always-multiline"],
      "no-cond-assign": [2, "always"],
      "no-console": 1,
      "no-debugger": 1,
      "no-constant-condition": 2,
      "no-control-regex": 2,
      "no-dupe-args": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty": 2,
      "no-empty-character-class": 2,
      "no-ex-assign": 2,
      "no-extra-boolean-cast": 0,

      "no-extra-parens": [0, "all", {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
      }],

      "no-extra-semi": 2,
      "no-func-assign": 2,
      "no-inner-declarations": 2,
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 2,
      "no-negated-in-lhs": 2,
      "no-obj-calls": 2,
      "no-regex-spaces": 2,
      "no-sparse-arrays": 2,
      "no-unreachable": 2,
      "no-unsafe-finally": 2,
      "use-isnan": 2,
      "valid-typeof": 2,
      "arrow-body-style": [2, "as-needed"],
      "arrow-parens": 0,

      "arrow-spacing": [2, {
        before: true,
        after: true,
      }],

      "constructor-super": 0,

      "generator-star-spacing": [2, {
        before: true,
        after: false,
      }],

      "no-class-assign": 2,

      "no-confusing-arrow": [2, {
        allowParens: true,
      }],

      "no-const-assign": 2,
      "no-dupe-class-members": 2,
      "no-duplicate-imports": 2,
      "no-new-symbol": 2,
      "no-restricted-imports": 0,
      "no-this-before-super": 0,
      "no-useless-computed-key": 2,
      "no-useless-constructor": 2,
      "no-var": 2,

      "object-shorthand": [2, "always", {
        ignoreConstructors: false,
        avoidQuotes: true,
      }],

      "prefer-arrow-callback": [2, {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      }],

      "prefer-const": [2, {
        destructuring: "any",
        ignoreReadBeforeAssign: true,
      }],

      "prefer-rest-params": 2,
      "prefer-spread": 2,
      "prefer-template": 2,
      "require-yield": 2,
      "sort-imports": 0,
      "template-curly-spacing": 2,
      "yield-star-spacing": [2, "before"],
      "import/no-unresolved": [0],
      "import/named": 0,
      "import/default": 0,
      "import/namespace": 0,
      "import/export": 2,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
      "import/no-duplicates": 2,
      "import/extensions": [0, "never"],

      "import/order": ["error", {
        pathGroups: [{
          pattern: "@/**",
          group: "internal",
        }],

        groups: [["builtin", "external"], "internal", ["parent", "sibling"], "index"],
        "newlines-between": "always",

        alphabetize: {
          order: "asc",
        },
      }],

      "import/newline-after-import": 2,
      "import/no-default-export": 0,
      "array-bracket-spacing": [2, "never"],
      "block-spacing": [2, "always"],

      "brace-style": [2, "1tbs", {
        allowSingleLine: true,
      }],

      camelcase: [2, {
        properties: "always",
      }],

      "comma-spacing": [2, {
        before: false,
        after: true,
      }],

      "comma-style": [2, "last"],
      "computed-property-spacing": [2, "never"],
      "consistent-this": [2, "self"],
      "eol-last": 2,
      "func-names": 0,
      "func-style": [2, "declaration"],
      indent: [2, 2],
      "jsx-a11y/alt-text": [2],
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/aria-role": [2],

      "react/jsx-filename-extension": [1, {
        extensions: [".tsx"],
      }],

      "@typescript-eslint/no-unused-vars": ["error"],
      "no-use-before-define": 2,

      "tailwindcss/no-custom-classname": ["warn", {
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
          "!**/vendor",
        ],
      }],

      "space-infix-ops": ["error", { "int32Hint": false }],
      "operator-assignment": ["error", "always"],
    },
  }, {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
      "no-undef": "off",
      "import/no-default-export": "off",
    },
  }];
