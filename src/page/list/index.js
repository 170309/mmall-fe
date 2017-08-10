/**
 * Created by lucifer on 17-8-9.
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _produce = require('service/product-service.js');
var templete = require('./index.string');
var Pagenation = require('util/pagination/index.js');


var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 排序事件
        $('.sort-item').click(function () {
            var $this = $(this);
            _this.listParam.pageNum = 1;
            // 默认排序
            if($(this).data('type')==='dafault'){

                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.listParam.orderBy = 'default';
                }
            //    价格排序
            }else if($this.data('type')==='price'){
                $this.addClass('active')
                    .siblings('.sort-item').removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.listParam.orderBy = 'price_asc';
                }else {
                    $this.addClass('desc').removeClass('asc');
                    _this.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    onLoad: function () {
        this.loadList();
    },
    loadList: function () {
        var _this = this,
            $list = $('.p-list-con'),
            loading_ = '<div class="loading"></div>',
            html_ = '',
            listParam = this.data.listParam;
        listParam.categoryId
            ? (delete listParam.keyword):(delete listParam.categoryId);
        $list.html(loading_);
        _produce.getProductList(listParam, function (res) {
            html_ = _mm.renderHtml(templete, {
                list: res.list,
            });

            $list.html(html_);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage : res.prePage,
                hasNextPage : res.hasNextPage,
                nextPage : res.nextPage,
                pageNum : res.pageNum,
                pages : pages
            });
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadPagination: function (pageinfo) {
        var _this = this;
        this.pagination ? '' :(this.pagination = new Pagination());
        this.pagination.render($.extend({},pageinfo,{
            container:$('pagination'),
            onSelectPage:function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }))
    }

};

$(function () {
    page.init();
});

