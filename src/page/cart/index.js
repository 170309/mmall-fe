/**
 * Created by lucifer on 17-8-9.
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _produce = require('service/product-service.js');
var _cart = require('service/cart-service.js');

var templete = require('./index.string');


var page = {
    data: {
        cartInfo: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 排序事件
        $(document).on('click', '.cart-select', function () {
            var $this = $(this);
            productid = $this.parent('.cart-table').data('product-id');
            //选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productid, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _mm.errorTips(err);
                })
            } else {
                _cart.unSelectProduct(productid, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _mm.errorTips(err);
                })
            }
        });
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            //选中
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _mm.errorTips(err);
                })
            } else {
                _cart.unSelectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _mm.errorTips(err);
                })
            }
        });
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pcount = $this.siblings('.count-input'),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                currcount = parseInt($pcount.val()),
                mincount = 1,
                maxcount = parseInt($pcount.data('max')),
                newcount = 0;

            if (type === 'plus') {
                if (currcount >= maxcount) {
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newcount = currcount +1;
            }else if(type === 'minus'){
                if (currcount <= mincount) {
                    return;
                }
                newcount = currcount -1;
            }

            _cart.updateProduct({
                productId:productId,
                count:newcount
            },function (res) {
                _this.renderCart(res);
            },function (err) {
                _this.showCartErrors(err);
            })
        });

        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                // 循环查找选中的productIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds
                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _this.showCartError();
                }
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });

    },
    // 删除指定商品，支持批量，productId用逗号分割
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    onLoad: function () {
        // $('.page-wrap').html('<div class="loading"></div>')
        this.loadCart();
    },
    loadCart: function () {
        var _this = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (err) {
            _mm.showCartError();
        })
    },
    renderCart: function (data) {
        this.filter(data);
        this.data.cartInfo = data;
        var carthtml = _mm.renderHtml(templete, data);
        $('.page-wrap').html(carthtml);
    },
    //数据匹配
    filter: function (data) {
        //    缓存购物车信息
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }

};

$(function () {
    page.init();
});

