<template>
  <div class="treeContainer" v-show="showNav">
    <div class="broTher"></div>
    <div class="treeNav" v-drag ref="tree">
      <div class="box">
        <div>
          <p>系统管理</p>
          <ul>
            <router-link tag="li" to="/loginUser">用户登录</router-link>
            <router-link tag="li" to="/procmgr/sumUser">坐席管理</router-link>
            <router-link tag="li" to="/procmgr/sumRole">角色权限</router-link>
            <router-link tag="li" to="/procmgr/sumBranch">机构管理</router-link>
            <router-link tag="li" to="/procmgr/sumQuoteInfo">报价信息配置</router-link>
            <router-link tag="li" to="/procmgr/sumBatch">批量人员管理</router-link>
            <router-link tag="li" to="/procmgr/sumStatic">静态数据维护</router-link>
            <router-link tag="li" to="/procmgr/sumMicro">微店链接</router-link>
            <router-link tag="li" to="/procmgr/sumbusiness">渠道绑定</router-link>
            <router-link tag="li" to="/procmgr/sumImport">重点客户维护</router-link>
          </ul>
        </div>
        <div>
          <p>拨打数据管理</p>
          <ul>
            <router-link tag="li" to="/procmgr/sumCust">客户管理</router-link>
          </ul>
        </div>
        <div>
          <p>禁止拨数据管理</p>
          <ul>
            <router-link tag="li" to="/procmgr/sumBlack">禁拨名单维护</router-link>
            <router-link tag="li" to="/procmgr/sumBlackImport">禁拨名单批量导入</router-link>
            <router-link tag="li" to="/procmgr/sumBlackAudit">禁拨名单审核</router-link>
            <router-link tag="li" to="/procmgr/sumBlackTrack">禁拨轨迹查询</router-link>
          </ul>
        </div>
        <div>
          <p>测试页面</p>
          <ul>
            <router-link tag="li" :to="{name:'excelTest'}">excel测试</router-link>
            <router-link tag="li" to="examples/testpage">组件测试</router-link>
            <router-link tag="li" to="examples/checkerTest">校验测试</router-link>
            <router-link tag="li" to="examples/CustomerBaseInfo">客户详情</router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  props: [''],
  data() {
    return {
      l: 0,
      t: 0,
      showNav: false,
      lisns: true
    }
  },

  //  components: {},

  //  computed: {},

  //  beforeMount() {},

  mounted() {
    let dom = document.querySelector('.broTher');
    dom.onclick = function () {
      this.showNav = false;
    }.bind(this)
  },

  methods: {
    close() {
      this.$refs.tree.style.left = this.l;
      this.$refs.tree.style.top = this.t;
      this.showNav = false;
    },
    showV() {
      this.showNav = true;
      this.l = this.$refs.tree.style.left;
      this.t = this.$refs.tree.style.top;
      let h = 41;
      let target = document.querySelector(".treeNav");
      let li = document.querySelectorAll(".box li");
      let box = document.querySelectorAll(".box>div");
      box.forEach((item, index) => {
        if (item.lastElementChild.childNodes.length % 4 == 0) {
          let a = Math.floor(item.lastElementChild.childNodes.length / 4);
          h += a * 31;
        } else {
          let a = Math.floor(item.lastElementChild.childNodes.length / 4);
          h += (a + 1) * 31;
        }
      })
      h += box.length * 31;
      console.log(h);
      target.style.height = h + "px";
    }
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function (el, bindings) {
        let odiv = el;   //获取当前元素
        odiv.onmousedown = (e) => {
          var zw = odiv.offsetWidth;
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            e.preventDefault();
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            // this.istuo=false;
            //绑定元素位置到positionX和positionY上面
            // this.positionX = top;
            // this.positionY = left;

            //移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
          };
          document.onmouseup = (e) => {
            // this.istuo=true;
            //    target.istuo=true;
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  }
}

</script>
<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
}
.treeContainer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .broTher {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
.treeNav {
  padding: 11px;
  .box {
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    padding: 10px;
    div {
      p {
        line-height: 30px;
        border-bottom: 1px solid #fff;
      }
    }
  }
  width: 418px;
  height: 200px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 200px;
  cursor: move;
  span {
    float: right;
    margin-right: 5px;
    cursor: pointer;
  }
  ul {
    overflow: hidden;
    li {
      float: left;
      margin: 5px;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      position: relative;
      width: 66px;
      line-height: 13px;
      padding: 4px;
      &::before {
        content: "";
        transition: all linear 500ms;
        width: 100%;
        height: 0;
        background-color: #e7390e;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
      &::after {
        content: "";
        transition: all linear 300ms;
        width: 100%;
        height: 0;
        background-color: #e7390e;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
      &:hover {
        &::after {
          height: 50%;
        }
        &::before {
          height: 50%;
        }
      }
    }
  }
}
</style>