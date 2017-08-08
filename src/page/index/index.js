'use strict';

//引用本页CSS
require('./index.css');
//引用通用CSS
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/unslider/index.js');
var _mm = require('util/mm.js');
var templete = require('util/unslider/banner.string');

var navSide = require('page/common/nav-side/index.js');

var render = {
    data: {
        href: './list.html?keyword=',
        keyword: [
            ['手机', '数码'],
            ['电脑', '办公配件'],
            ['电视', '空调', '冰箱', '洗衣机'],
            ['家居', '家装', '家具'],
            ['厨卫家电', '小家电'],
            ['个性化妆', '清洁用品', '纸品'],
            ['母婴用品', '儿童玩具', '童装童鞋'],
            ['鞋靴', '箱包', '钟表', '珠宝'],
            ['图书', '音像', '电子书'],
            ['男装', '女装', '孕妇装']
        ]
    },
    floordata: {
        floortitle: ['家用电器', '数码3C', '服装箱包', '食品生鲜', '酒水饮料'],
        floortext: [
            ['双开门冰箱', '电视', '洗衣机', '空调', '热水器'],
            ['笔记本电脑', '手机', '平板电脑', '数码相机', '3C配件'],
            ['女装', '帽子', '旅行箱', '手提包', '保暖内衣'],
            ['零食', '生鲜', '半成品菜', '速冻专区', '进口牛奶'],
            ['白酒', '红酒', '饮料', '调制鸡尾酒', '进口洋酒']
        ],
        img: [
            [
                require('../../image/floor/floor1-1.jpg'),
                require('../../image/floor/floor1-2.jpg'),
                require('../../image/floor/floor1-3.jpg'),
                require('../../image/floor/floor1-4.jpg'),
                require('../../image/floor/floor1-5.jpg')
            ], [
                require('../../image/floor/floor2-1.jpg'),
                require('../../image/floor/floor2-2.jpg'),
                require('../../image/floor/floor2-3.jpg'),
                require('../../image/floor/floor2-4.jpg'),
                require('../../image/floor/floor2-5.jpg')
            ], [
                require('../../image/floor/floor3-1.jpg'),
                require('../../image/floor/floor3-2.jpg'),
                require('../../image/floor/floor3-3.jpg'),
                require('../../image/floor/floor3-4.jpg'),
                require('../../image/floor/floor3-5.jpg')
            ], [
                require('../../image/floor/floor4-1.jpg'),
                require('../../image/floor/floor4-2.jpg'),
                require('../../image/floor/floor4-3.jpg'),
                require('../../image/floor/floor4-4.jpg'),
                require('../../image/floor/floor4-5.jpg')
            ], [
                require('../../image/floor/floor4-5.jpg'),
                require('../../image/floor/floor5-1.jpg'),
                require('../../image/floor/floor5-2.jpg'),
                require('../../image/floor/floor5-3.jpg'),
                require('../../image/floor/floor5-4.jpg')
            ]
        ],
    },
    banner:[
        require('../../image/banner/banner1.jpg'),
        require('../../image/banner/banner2.jpg'),
        require('../../image/banner/banner3.jpg'),
        require('../../image/banner/banner4.jpg'),
        require('../../image/banner/banner5.jpg'),
    ],
    categoryId:[
        100021,
        100030,
        100020,
        100025,
        100027,
    ],
    init: function () {
        this.renderBanner();
        this.renderKeywordList(this.data);
        this.renderFloorList(this.floordata);
    },
    renderKeywordList: function (data) {
        var keyword_ = data.keyword;
        var $list = $('.keyword-list');

        for (var i = 0, len = keyword_.length; i < len; i++) {
            var html_ = '<li class="keyword-item">';
            for (var j = 0, len_ = keyword_[i].length; j < len_; j++) {
                html_ += '<a  target="_blank" class="link" href="'
                    + data.href + keyword_[i][j]
                    + '">' + keyword_[i][j] + '</a>';
            }
            html_ += '</li>';
            $(html_).appendTo($list);
        }

    },
    renderFloorList: function (data) {
        var $list = $('#floor');
        var title = data.floortitle;
        var data_ = data.floortext;
        var img = data.img;
        var id = 6;
        for (var i = 0, len = title.length; i < len; i++) {
            var html_ = '<div class="floor-wrap"> ' +
                '<h1 class="floor-title">F' + (i+1) +' &nbsp;&nbsp;'+ title[i] + '</h1><ul class="floor-list">';
            for (var k = 0, len_ = data_[i].length; k < len_; k++) {
                if (id < 10) {
                    id = '0' + id;
                }
                html_ +='<li class="floor-item"> ' +
                    '<a href="./list.html?categoryId=1000' + id + '">' +
                    '<span class="floor-text">' + data_[i][k] +
                    '</span> <img class="floor-img" src="' + img[i][k] + '" alt="' + data_[i][k] + '"/> ' +
                    '</a> </li>';
                id =parseInt(id) + 1;
            }
            html_ += '</ul>';
            html_ += '</div>';
            $(html_).appendTo($list);
        }

    },
    renderBanner:function () {
        var bannerHtml = _mm.renderHtml(templete,this.banner);
        $('.banner-con').html(bannerHtml);
        var data = {
            img:this.banner,
            cId:this.categoryId
        };
        this.renderBannerCon(data);
        $('.automatic-slider').unslider({
            autoplay: true,
            dots:true
        });
    },
    renderBannerCon:function (data) {
        var html_ = '<div class="automatic-slider"> <ul>'
        for(var i = 0 , len = data.img.length;i<len;i++){
            html_ += ' <li> <a href="./list.html?cetegoryId='+ data.cId[i]+'"><img class="banner-img" src="'+ data.img[i]+'" alt=""></a> </li>';
        }
        html_ += '</ul></div>';
        $(html_).appendTo($('.automatic-slider'));
    }

};

navSide.init({
    name: 'pass-update'
});
render.init();
