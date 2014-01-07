define(function(require,exports,module){
    
    var _top = require('./top');
    var _left = require('./left');
    var _width = require('./width');
    var _height = require('./height');
    var _viewHeight = require('../page/getViewHeight');
    var _viewWidth = require('../page/getViewWidth');
    var _scrollTop = require('../page/getScrollTop');
    var _scrollLeft = require('../page/getScrollLeft');
    
    var isInScreen = function(elem){
        var top = _top(elem);
        var left = _left(elem);
        var width = _width(elem);
        var height = _height(elem);
        var bottom = top + height;
        var right = left + width;
        var viewTop = _scrollTop();
        var viewLeft = _scrollLeft();
        var viewRight = viewLeft + _viewWidth();
        var viewBottom = viewTop + _viewHeight();
        //左上角可见
        if(top >= viewTop && top <= viewBottom && left >= viewLeft && left <= viewRight){
            return true;
        }
        //右上角可见
        if(top >= viewTop && top <= viewBottom && right >= viewLeft && right <= viewRight){
            return true;
        }
        //左下角可见
        if(bottom >= viewTop && bottom <= viewBottom && left >= viewLeft && left <= viewRight){
            return true;
        }
        //右下角可见
        if(bottom >= viewTop && bottom <= viewBottom && right >= viewLeft && right <= viewRight){
            return true;
        }
        return false;
    }
    
    module.exports = isInScreen;
});