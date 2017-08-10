/**
 * Created by lucifer on 17-8-9.
 */
'use strict';
require('./index.css');
var templete = require('./index.string');
var hogan = require('hogan.js');


var Pagination = function () {
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };

    $(document).on('click','.pg-item',function () {
        var $this = $(this);
        if( $this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }

        typeof $this.option.onSelectPage === 'function' ?
            $this.option.onSelectPage($this.data('value')) : 'null';
        
    })
};

Pagination.prototype.render = function (userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);
    //判断容器是否为一个合法的jquery对象
    if (!(option.container instanceof jQuery)){
        return;
    }

    //判断是否只有一页
    if (this.option.pages <= 1) {
        return;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml())
};

Pagination.prototype.getPaginationHtml = function () {
    var html_ = '',
        pageArray = [],
        option= this.option,
        start = option.pageNum - option.pageRange > 0 ?
            option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages ?
            option.pages : option.pageNum + option.pageRange;
    // 上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: option.prePage,
        disable: !option.hasPreviousPage
    });

//    数字按钮的处理
    for(var i = start;i <= end ;i++){
        pageArray.push({
            name: i,
            value: option.prePage,
            active:(i=== option.pageNum)
        });
    }
    //下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disable: !option.hasNextPage
    });

    html_ = this.renderHtml(templete,{
        pageArray:pageArray,
        pageNum:option.pageNum,
        pages:option.pages
    });
    return html_;

};
Pagination.prototype.renderHtml= function (templete,data) {
    var templet = hogan.compile(htmltemple),
        result = templet.render(data);
    return result;

};

module.exports = Pagination;