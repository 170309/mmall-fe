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
        productId: _mm.getUrlParam('productId') || '',
        datainfo: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 排序事件
        $(document).on('mouseenter', '.sub-img-item', function () {
            var imageUrl = $(this).find('.sub-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        $(document).on('click', '.sub-img-item', function () {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $countinput = $('.count-input'),
                currcount = parseInt($countinput.val()),
                minNum = 1,
                maxNum = _this.data.datainfo.stock || 1;
            if(type === 'plus'){
                $countinput.val(currcount<maxNum? currcount+1:maxNum);
            }else if(type === 'minus'){
                $countinput.val(currcount>minNum? currcount-1:maxNum);
            }
        });
        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.count-input').val()
            },function (res) {
                window.location.href = 'result.html?type=cart-add'
            },function (err) {
                _mm.errorTips(err)
            })
        });

    },
    onLoad: function () {
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    loadDetail: function () {
        var _this = this,
            loading_ = '<div class="loading"></div>',
            html_ = '',
            $detailcon = $('.page-wrap');
        $detailcon.html(loading_);

        _mm.getProductDetail(_this.data.productId, function (res) {
            _this.filter(res);
            //保存获取到的数据
            _this.data.datainfo = res;
            html_ = _mm.renderHtml(templete, res);
            $detailcon.html(html_)
        }, function (err) {
            $detailcon.html('<p class="error-tip">此商品流落在时空的裂缝儿中了！！</p>')
        });
    },
    filter: function (data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function () {
    page.init();
});

