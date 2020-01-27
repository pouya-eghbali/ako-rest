import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.js",
    external: ["abab/lib/btoa"],
    output: {
      file: "dist/index.js",
      format: "cjs"
    }
  },
  {
    input: "src/netsuite.js",
    plugins: [commonjs(), resolve(), babel({ runtimeHelpers: true })],
    output: [
      {
        file: "dist/netsuite.js",
        format: "amd"
      }
    ]
  },
  {
    input: "src/browser.js",
    external: ["abab/lib/btoa"],
    output: [
      {
        file: "dist/browser.js",
        format: "iife",
        name: "AkoRest",
        globals: {
          "abab/lib/btoa": "btoa"
        }
      }
    ]
  }
];
