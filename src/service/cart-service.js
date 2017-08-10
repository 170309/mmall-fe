'use strict';
var _mm = require('util/mm.js');
var _cart = {
    getCartCount:function (resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/get_cart_product_count.do'),
            success:resolve,
            error:reject
        });
    },
    addToCart:function (productInfo,resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/add.do'),
            data:productInfo,
            success:resolve,
            error:reject
        });
    },

};

module.exports = _cart;