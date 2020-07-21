                               
export default {
  beforeRouteLeave(to, from, next) {
    // console.log('to',to);
    // console.log('from',from);
    // console.log('routers',this.$parent.$parent.$parent.$parent.$parent.routers)
    if(from.redirectedFrom){
      let [,,name]=from.redirectedFrom.split('/')
      let existed=this.$parent.$parent.$parent.$parent.$parent.isexist(name).is;
      //如果navlist中不存在，说明此页面为关闭，需要销毁
      if(!existed && this.$vnode.parent && this.$vnode.parent.componentInstance.cache){
        //let key = this.$vnode.key   // 当前关闭的组件名
        let key = this.$vnode.key == null
          ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
          : this.$vnode.key;

        let cache = this.$vnode.parent.componentInstance.cache  // 缓存的组件
        let keys = this.$vnode.parent.componentInstance.keys  // 缓存的组件名
        if(cache[key] != null) {
          delete cache[key]
          let index = keys.indexOf(key)
          if(index > -1) {
            keys.splice(index, 1)
          }
        }
      }
    }
    next();
  }
  
}