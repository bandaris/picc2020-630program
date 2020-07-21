const getters = {
  userinfo: state => state.user.userinfo,
  deptinfo: state => state.user.deptinfo,
  purviews: state => state.user.purviews,
  sumRoleNavName: state => state.seats.sumRoleNavName,
  staticinfo: state=>state.staticinfo.staticinfo,
  cookieinfo:state=>state.cookie.cookieinfo,
}
export default getters
