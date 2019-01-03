/**
 * Created by chenchen on 2018/12/28.
 */

export default {
  getParamSync(context, Object) {
    setTimeout(() => {
      context.commit('getParam', Object)
    }, 3000)
  }
}