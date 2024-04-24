import globals from 'globals'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: [
      "build/**/*",
      "eslint.config.*",
      "src/reportWebVitals.js",
    ],
  },
  {
    languageOptions: {
      globals: globals.browser,
      sourceType: "module",
    }
  },
  ...compat.extends('airbnb'),
  {
    rules: {
      'react/prop-types': 'off',
    }
  }
]
