import tseslint from 'typescript-eslint';   
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import js from "@eslint/js"
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
    {
        ignores: ['**/dist/**'],
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    importPlugin.flatConfigs.typescript,
    {
        plugins: {
            '@stylistic/js': stylisticJs,
            '@stylistic/ts': stylisticTs,
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/prefer-for-of": "off",
            "@typescript-eslint/no-empty-function": "off"
        }
    },
    {
        files: ["**/*.ts", "**/*.js"],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 5,
            sourceType: "script",
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
            },

            "import/resolver": {
                node: {
                    extensions: [".mjs", ".js", ".json", ".ts", ".d.ts"],
                },
            },

            "import/extensions": [".js", ".mjs", ".jsx", ".ts", ".tsx", ".d.ts"],
            "import/external-module-folders": ["node_modules", "node_modules/@types"],
        },
        rules: {
            "@stylistic/js/max-len": ["error", {
                code: 100,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            }],

            "@stylistic/js/lines-between-class-members": ["error", "always", {
                exceptAfterSingleLine: true,
            }],

            "@typescript-eslint/comma-dangle": "off",
            "@typescript-eslint/no-redeclare": ["error"],
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-use-before-define": "off",
            "no-restricted-imports": ["error", {
                "patterns": [{
                    "group": ["**/dist/*"],
                    "message": "Do not import compiled sources directly"
                }]
            }]
        },
    }, 
    {
        files: ["**/*.spec.{js,ts}"],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.browser,
                expect: true,
                spy: true,
                fail: true,
            },
        },
        rules: {
            "@stylistic/ts/semi": ["error", "never"],
            "@typescript-eslint/no-unused-expressions": "off",
            "import/no-extraneous-dependencies": "off",
        },
    }
);