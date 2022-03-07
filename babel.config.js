module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.20',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-typescript'],
};
