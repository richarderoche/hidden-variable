const preset = require('@sanity/eslint-config-studio')

module.exports = {
  ...preset,
  plugins: [...preset.plugins, '@ianvs/prettier-plugin-sort-imports'],
}
