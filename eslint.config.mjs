import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import angularEslintEslintPlugin from "@angular-eslint/eslint-plugin";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import noOnlyTests from "eslint-plugin-no-only-tests";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    files: ["**/*.ts"],
    extends: compat.extends("plugin:@angular-eslint/template/process-inline-templates"),

    plugins: {
        "@stylistic": stylistic,
        "@angular-eslint": angularEslintEslintPlugin,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "@angular-eslint/component-class-suffix": "error",

        "@angular-eslint/component-selector": ["error", {
            type: ["element", "attribute"],
            prefix: "bq",
            style: "kebab-case",
        }],

        "@angular-eslint/directive-class-suffix": "error",

        "@angular-eslint/directive-selector": ["error", {
            type: ["element", "attribute"],
            prefix: "bq",
            style: "camelCase",
        }],

        "@angular-eslint/no-input-rename": "off",
        "@angular-eslint/no-inputs-metadata-property": "off",
        "@angular-eslint/no-output-rename": "error",
        "@angular-eslint/no-outputs-metadata-property": "error",
        "@angular-eslint/use-lifecycle-interface": "error",
        "@angular-eslint/use-pipe-transform-interface": "error",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "error",

        "@typescript-eslint/explicit-member-accessibility": ["off", {
            accessibility: "explicit",
        }],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "enumMember",
            format: ["PascalCase"],
        }, {
            selector: "classProperty",
            modifiers: ["private", "static", "readonly"],
            format: null,
        }, {
            selector: "classProperty",
            modifiers: ["static", "readonly"],
            format: ["PascalCase"],
        }, {
            selector: "objectLiteralProperty",
            format: null,
        }],

        "@typescript-eslint/member-ordering": ["error", {
            default: ["static-field", "field", "static-method", "constructor", "method"],
        }],

        "@stylistic/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },
        }],

        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-for-in-array": "error",

        "@typescript-eslint/no-inferrable-types": ["error", {
            ignoreParameters: true,
        }],

        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",

        "@typescript-eslint/no-shadow": ["error", {
            hoist: "all",
        }],

        "@typescript-eslint/no-this-alias": "error",

        "@typescript-eslint/no-unused-expressions": ["error", {
            allowShortCircuit: false,
        }],

        "@typescript-eslint/no-unused-vars": ["error", {
            args: "none",
            varsIgnorePattern: "^_.*",
        }],

        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-readonly": "error",

        "@stylistic/quotes": ["error", "single", {
            avoidEscape: true,
            allowTemplateLiterals: "always",
        }],

        "@stylistic/semi": ["error", "always"],
        "@stylistic/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        "prefer-arrow/prefer-arrow-functions": "off",
        "arrow-parens": ["off", "always"],

        "no-restricted-imports": ["error", {
            patterns: ["@blueriq-ux/*"],
        }],

        "max-len": ["error", 140, {
            ignoreComments: true,
            ignoreUrls: true,
            ignoreTemplateLiterals: true,
            ignoreStrings: true,
        }],

        "no-underscore-dangle": "off",
        "arrow-body-style": ["error", "as-needed"],
    },
}, {
    files: ["**/*.html"],
    extends: compat.extends("plugin:@angular-eslint/template/recommended"),
    rules: {},
}, {
    files: ["**/*.spec.ts", "**/*.cy.ts"],

    plugins: {
        "no-only-tests": noOnlyTests,
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-only-tests/no-only-tests": "error",
    },
}, {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
}]);
