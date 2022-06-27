import lazy from './modules/lazy'

export default {
  install(app) {
    app.directive('lazys', lazy)
  }
}