import variables from '@/styles/variables.module.scss'
export default {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  variables: () => variables,
  sidebarOpened: state => state.app.sidebarOpened
}
