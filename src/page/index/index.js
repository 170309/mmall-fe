'use strict';

//引用本页CSS
require('./index.css');
//引用通用CSS
require('page/common/layout.css');

require('node_modules/font-awesome/css/font-awesome.min.css');


var _mm = require('util/mm.js');

var html = '<div>{{data}}</div>';
var data = {
    data:123
};

console.log(_mm.renderHtml(html,data));