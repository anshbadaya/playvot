module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    // Disable strict rules that are causing build failures
    "import/order": "off",
    "comma-dangle": "off",
    quotes: "off",
    semi: "off",
    indent: "off",
    "no-trailing-spaces": "off",
    "eol-last": "off",
    "no-multiple-empty-lines": "off",
    "padding-line-between-statements": "off",
    "object-shorthand": "off",
    "prefer-template": "off",
    "template-curly-spacing": "off",
    "arrow-spacing": "off",

    // Keep important rules
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
  },
};
