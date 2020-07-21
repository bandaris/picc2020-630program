const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
//const VueConf = require('./src/assets/js/libs/vue_config_class')
//const vueConf = new VueConf(process.argv)

//console.log('process.env.NODE_ENV',process.env.NODE_ENV);
//console.log('process.env.VUE_APP_FLAG',process.env.VUE_APP_FLAG);


module.exports = {
    publicPath: '/procmgr', // 根域上下文目录
    outputDir: 'dist/procmgr', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    pwa: {
        iconPaths: {
            favicon32: './favicon.ico',
            favicon16: './favicon.ico',
            appleTouchIcon: './favicon.ico',
            maskIcon: './favicon.ico',
            msTileImage: './favicon.ico'
        }
    },
    // indexPath: 'index.html',
    // lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    // runtimeCompiler: true, // 运行时版本是否需要编译
    // transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    // productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    //     css: { // 配置高于chainWebpack中关于css loader的配置
    //     modules: true, // 是否开启支持‘foo.module.css’样式
    //     extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    //     sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    //     loaderOptions: { // css预设器配置项
    //         sass: {
    //             data: ''//`@import "@/assets/scss/mixin.scss";`
    //         }
    //     }
    // },

    // configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    //     if (debug) { // 开发环境配置
    //         config.devtool = 'cheap-module-eval-source-map' //默认是：source-map
    //         // 取消console打印    
    //         //config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //         // 如果是多环境打包
    //         //if (process.env.NODE_ENV === 'production') {
    //           //config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //         // }

    //     } else { // 生产环境配置
          
    //       //config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //     }
    //      Object.assign(config, 
    //         { 
    //           // 开发生产共同配置，配置别名
    //           resolve: {
    //               alias: {
    //                   '@': path.resolve(__dirname, './src'),
    //                   '@c': path.resolve(__dirname, './src/components'),
    //                   '@a': path.resolve(__dirname, './src/api'),
    //                   '@u': path.resolve(__dirname, './src/utils'),
    //                   'vue$': 'vue/dist/vue.esm.js'
    //               }
    //           },
    //         }
    //      )
    //     //  config["output"] = {
    //     //       libraryExport:'default'
    //     //  };
    //     //  config["externals"] = {
    //     //       vue:'Vue'
    //     //  };

         
    // },
    // chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，
    //     if (debug) {
    //         // 本地开发配置
    //     } else {
    //         // 生产开发配置
    //     }
    // },
    // parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    // pluginOptions: { // 第三方插件配置
    // },
    // pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // },
    

    configureWebpack:{
        output:{
            libraryExport:'default'
        },
        externals:{
            vue:'Vue'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                '@a': path.resolve(__dirname, './src/api'),
                '@u': path.resolve(__dirname, './src/utils'),
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    }
}

// target：要使用url模块解析的url字符串
// forward：要使用url模块解析的url字符串
// agent：要传递给http（s）.request的对象（请参阅Node的https代理和http代理对象）
// ssl：要传递给https.createServer（）的对象
// ws：true / false，是否代理websockets
// xfwd：true / false，添加x-forward标头
// secure：true / false，是否验证SSL Certs
// toProxy：true / false，传递绝对URL作为路径（对代理代理很有用）
// prependPath：true / false，默认值：true - 指定是否要将目标的路径添加到代理路径
// ignorePath：true / false，默认值：false - 指定是否要忽略传入请求的代理路径（注意：如果需要，您必须附加/手动）。
// localAddress：要为传出连接绑定的本地接口字符串
// changeOrigin：true / false，默认值：false - 将主机标头的原点更改为目标URL