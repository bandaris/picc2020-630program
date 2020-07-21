import lu from '@/utils/loginUser'
import sumBlackRouter from '@/router/modules/blackmgr/sumBlack'
//这个混入对象负责excel功能组件的各种固定方法              ！
export default {
  data() {
    return {
      pageinfo: {}
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 10
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 10m in size.',
        type: 'warning'
      })
      return false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getJsonKeys(jsonData) {
      let keys = [];
      for (let key in jsonData) {
        keys.push(key);
      }
      return keys;
    },
    getJsonVals(jsonData) {
      let vals = [];
      for (let key in jsonData) {
        vals.push(jsonData[key]);
      }
      return vals;
    },
    transJsonkeys(jsonData, jsonMap) {
      let ret = {};
      for (let key in jsonData) {
        let val = jsonData[key];
        let nk = jsonMap[key];
        ret[nk] = val;
      }
      return ret;
    },
    getRouterPathInfo(name) {
      if (!name) return;
      let rl = sumBlackRouter.children;
      if (!rl) return;
      for (let i = 0; i < rl.length; i++) {
        let r = rl[i];
        if (name != r.name) continue;
        return r;
      }
    },
    openPage(name, params, title) {
      let ro = this.getRouterPathInfo(name);
      if (!ro) return false;
      let po = {};
      po.path = ro.path;
      //如果需要自定义title，那么需要将title作为params参数的一项（默认id为:_$title)
      if (params)
        po.query = params;

      if (title) {
        if (!po.query)
          po.query = {};
        po.query['_$title'] = title;
      }

      this.$router.push(po)
    },
    closePage() {
      this.$parent.close(this.pageinfo.name);
    }
  },

  destroyed() {
    this.$parent.clearc();
  },
  // mounted () {},
  activated() {
    console.log(sumBlackRouter);
    let pname = this.$options.name;
    let ro = this.getRouterPathInfo(pname);
    if (!ro) return;
    //自定义title
    let qy = this.$route.query;
    if (qy && qy['_$title'])
      ro.title = qy['_$title']
    //this.$parent.addnav(ro);
    this.$parent.isActive(ro.name);
    this.pageinfo = ro;
    console.log('this.pageinfo:', this.pageinfo);
  },
  // deactivated () {},
  beforeRouteLeave(to, from, next) {
    // console.log('to',to);
    // console.log('from',from);
    let existed = this.$parent.isPageOpen(from.name);
    //如果navlist中不存在，说明此页面为关闭，需要销毁
    if (!existed && this.$vnode.parent && this.$vnode.parent.componentInstance.cache) {
      //let key = this.$vnode.key   // 当前关闭的组件名
      let key = this.$vnode.key == null
        ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
        : this.$vnode.key;
      let cache = this.$vnode.parent.componentInstance.cache  // 缓存的组件
      let keys = this.$vnode.parent.componentInstance.keys  // 缓存的组件名
      if (cache[key] != null) {
        delete cache[key]
        let index = keys.indexOf(key)
        if (index > -1) {
          keys.splice(index, 1)
        }
      }
    }
    next();
  }
}