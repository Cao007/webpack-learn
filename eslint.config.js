import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // 自定义规则
      "no-unused-vars": "off", // 关闭未使用变量
      "no-var": "warn", // 使用let和const代替var
    },
  },
];
