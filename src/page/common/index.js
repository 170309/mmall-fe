'use strict';

require('page/common/layout.css');
require('node_modules/font-awesome/css/font-awesome.min.css');
require('./footer/index.css');

$(function () {
   $('.logo').click(function () {
       window.location.href='./index.html';
   })
});