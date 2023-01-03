module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    extraFileExtensions: [".svelte"],
  },
  extends: [
    // then, enable whichever type-aware rules you want to use
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  env: {
    es6: true,
    browser: true,
  },
  plugins: ["svelte3", "@typescript-eslint", "pug"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {
    quotes: [0, "double"],
    "space-before-blocks": "off",
    "space-before-function-paren": "off",
    semi: "off",
    "no-extra-semi": "off",
    indent: [
      "warn",
      2,
      {
        ignoredNodes: ["ConditionalExpression"],
        SwitchCase: 1,
      },
    ],
  },
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
}
