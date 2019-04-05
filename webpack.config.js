'use strict';
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
//提取公共模块,其的依赖
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:{ //main是默认入口,也可以是多入口
        main:'./src/main.js',
        vendors:['vue','vue-router','axios','mint-ui']
    },
    //出口(编译出的文件)
    output:{
        filename:'./build.js', //指定js文件
        path: path.join(__dirname,'dist'),      //最好是绝对路径
        //../,也可以使用，代表当前目录的上一级的dist
        filename: 'js/[name].[hash].js',
    },
    module:{
        //一样的功能rules:   webpack2.x之后新加的
        rules:[       //require('./a.css||./a.js')
            {
                test:/\.css$/,
                /*loaders: ['style-loader', 'css-loader'],*/
                //顺序是反过来的2!1
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
				test:/\.less$/,
				loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
            {
                test:/\.(jpg|png|svg|ttf|eot|woff|woff2|gif)$/,
                loader:'url-loader',
                //[name].[ext]内置提供的，因为本身是先读这个文件
                options:{
                	limit:4096,//4096字节以上生成文件，否则base6
					name:'assets/[name].[ext]',
                    publicPath:'/dist/'
                }
            },
            {//处理ES6的js
                test:/\.js$/,
                loader:'babel-loader',
                 //排除 node_modules下的所有
                exclude:/node_modules/,
                options:{
                    presets:['es2015'],//关键字
                    plugins:['transform-runtime'],//函数
                }
            },
            {//解析vue
                test:/\.vue$/,
                loader:'vue-loader',//vue-template-compiler是代码上的依赖
            }
        ]
    },

    plugins:[
        new ExtractTextPlugin("./css/style.[hash].css"),
        //插件的执行顺序是依次执行的
        new htmlWebpackPlugin({
            template:'./src/index.html',
            }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: "manifest"
        }),
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]
}