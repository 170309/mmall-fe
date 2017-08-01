
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPligin = require('html-webpack-plugin');

//环境变量的配置 dev/ online

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//获取htmlwebpackplugin参数
var getHtmlConfig=function (name) {
    return {
        template:'./src/view/'+ name+'.html',
        filename:'view/'+ name+'.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}
var config ={
    entry:{
        'common':['./src/page/common/index.js'],
        'index' :['./src/page/index/index.js'],
        'login' :['./src/page/login/index.js']
    },
    //输出配置
    output: {
        path      : './dist',
        publicPath:'/dist',
        filename  : 'js/[name].js'
    },
    //全局模块设置
    externals:{
        'jquery':'window.$'
    },
    //css 单独打包
    module:{
        loaders:[
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(png|jpg|gif|ttf|woff|svg|eot)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'},
        ]
    },

    resolve:{
        alias:{
            node_modules   : __dirname +'/node_modules',
            util           : __dirname +'/src/util',
            page           : __dirname +'/src/page',
            service        : __dirname +'/src/service',
            view           : __dirname +'/src/view',
        }
    },
    //通用模块儿配置
    plugins:[
        //通用模块设置,到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name    :'common',
            filename:'js/base.js'
        }),
        //转换loader，实现css单独配置
        new ExtractTextPlugin("css/[name].css"),
        //
        new HtmlWebpackPligin(getHtmlConfig('index')),
        new HtmlWebpackPligin(getHtmlConfig('login'))
    ]

}

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports=config;