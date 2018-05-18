module.exports = () => {
  return {
      devServer: {
          stats: 'errors-only', // в консоли увидим только ошибки
          port: 9000
      }
  }
};