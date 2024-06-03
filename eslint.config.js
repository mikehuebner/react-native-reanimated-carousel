import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import jestEslint from "eslint-plugin-jest";
import eslintPluginReactNative from "eslint-plugin-react-native";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      jest: jestEslint,
      "react-refresh": reactRefresh,
      "react-native": eslintPluginReactNative,
    },
  },
  { ignores: ["lib", "node_modules"] },
  {
    settings: {
      react: { version: "detect" },
      "import/external-module-folders": ["node_modules"],
      "import/ignore": ["node_modules/react-native/index\\.js$"],
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
      "import/resolver": { typescript: true, node: true },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-use-before-define": "off",
      quotes: "off",
      "operator-linebreak": "off",
    },
  }
);
