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
    getCartList:function (resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/list.do'),
            success:resolve,
            error:reject
        });
    },
    selectProduct:function (productId,resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/select.do'),
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        });
    },
    unSelectProduct:function (productId,resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/un_select.do'),
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        });
    },
    selectAllProduct:function (resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/select_all.do'),
            success:resolve,
            error:reject
        });
    },
    unSelectAllProduct:function (resolve,reject) {
        _mm.request({
            url : _mm.getURL('/cart/un_select_all.do'),
            success:resolve,
            error:reject
        });
    },
    updateProduct:function(productInfo,resolve,reject){
        _mm.request({
            url : _mm.getURL('/cart/update.do'),
            data:productInfo,
            success:resolve,
            error:reject
        });
    }

};

module.exports = _cart;