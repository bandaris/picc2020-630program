import loading from '@c/loading'
export default {
  data () {
    return {
    };
  },
  methods: {
    confirm(txt,title,handleCancel){
        return new Promise((resolve,reject)=>{
           this.$confirm(txt, title, {
            dangerouslyUseHTMLString: true, // 必填
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            roundButton: true, // 必填
            type: 'warning', // 必填
            customClass: 'picc-message-box', //必填
            center: true,
            showClose: false
          }).then(()=>{
            resolve()
          },()=>{
            handleCancel?reject():null
          })
        })
    },
    alert(txt,title,type){
      let styleinfo={
        dangerouslyUseHTMLString: true, // 必填
        confirmButtonText: "确定",
        roundButton: true, // 必填
        customClass: "picc-message-box", //必填
        center: true,
        showClose: false
        }
      if(title)
        styleinfo.type=type?type:'error' // error-错误  success-成功
      
      return new Promise((resolve,reject)=>{
        this.$alert(txt, title, styleinfo).then(()=>{
            resolve();
          });
      })
    },
    success(txt){
      let styleinfo={
        dangerouslyUseHTMLString: true, // 必填
        confirmButtonText: "确定",
        roundButton: true, // 必填
        customClass: "picc-message-box", //必填
        type:'success',
        center: true,
        showClose: false
        }
      return new Promise((resolve,reject)=>{
        this.$alert(txt, '信息', styleinfo).then(()=>{
            resolve();
          });
      })
    },
    fail(txt){
      let styleinfo={
        dangerouslyUseHTMLString: true, // 必填
        confirmButtonText: "确定",
        roundButton: true, // 必填
        customClass: "picc-message-box", //必填
        type:'error',
        center: true,
        showClose: false
        }
      return new Promise((resolve,reject)=>{
        this.$alert(txt, '错误', styleinfo).then(()=>{
            resolve();
          });
      })
    },
    unique(arr,name) {
      let hash = {};
      return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
      }, []);
    }

  },
  components: {
    'v-loading':loading
  }
}