'use strict';

//引用本页CSS
require('./index.css');
//引用通用CSS
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

navSide.init({
    name:'pass-update'
});

