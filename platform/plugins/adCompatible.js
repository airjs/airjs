define(function(require,exports,module){
    var global = require('../../driver/global');
    var _ua = require('../browser/ua');
    var _extend = require('../object/extend');

    global.lib = global.lib || {};
    global.lib.swf = global.lib.swf || {};

    global.lib.swf.openAdPostWindow = function (url, data, name, debugTime) {
        if (debugTime != undefined) {
            var cTime = new Date();
            data = data.replace('"ib":"' + debugTime + '"', '"ib":"' + String(cTime.getTime() + Number(debugTime)) + '"');
        }
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm";
        tempForm.method = "post";
        tempForm.action = url;
        tempForm.target = "_blank";
        var hideInput = document.createElement("input");
        hideInput.type = "hidden";
        hideInput.name = 'data';
        hideInput.value = data;
        tempForm.appendChild(hideInput);
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
    };

    global.lib.Mac = _ua.Mac;

    global.lib.box = global.lib.box || {
        version: "1.0.0",
        toString: function () {
            return "[Object lib.box(version " + this.version + ")]";
        }
    };

    _extend(global.lib.box,{
        /**
        * @public
        * 获取文档的高度
        * @method getDocumentHeight
        * @return {Int} The height of the actual document (which includes the body and its margin).
        */
        getDocumentHeight: function (context) {
            context = context || window;
            var doc = context.document;
            var scrollHeight = (doc.compatMode != 'CSS1Compat') ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
            var h = Math.max(scrollHeight, this.getViewportHeight(context));
            return h;
        },
        /**
        * @public
        * 获取文档的宽度
        * @method getDocumentWidth
        * @return {Int} The width of the actual document (which includes the body and its margin). 
        */
        getDocumentWidth: function (context) {
            context = context || window;
            var doc = context.document;
            var scrollWidth = (doc.compatMode != 'CSS1Compat') ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
            var w = Math.max(scrollWidth, this.getViewportWidth(context));
            return w;
        },
        /**
        * @public
        * 获取当前窗口可视区域高度
        * @method getViewportHeight
        * @return {Int} The height of the viewable area of the page (excludes scrollbars).
        */
        getViewportHeight: function (context) {

            context = context || window;
            var doc = context.document;

            // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
            var de = doc.documentElement;

            // If the innerHeight of the browser is available, use that
            return context.innerHeight ||
            // Otherwise, try to get the height off of the root node
            (de && de.clientHeight+(de.style.borderTopWidth=='' ?0 : de.style.borderTopWidth)
                    +(de.style.borderBottomWidth=='' ?0 : de.style.borderBottomWidth)) ||
            // Finally, try to get the height off of the body element
            doc.body.clientHeight;

        },

        /**
        * @public
        * 获取当前窗口可视区域宽度
        * @return {Int} The width of the viewable area of the page (excludes scrollbars).
        */
        getViewportWidth: function (context) {
            context = context || window;
            var doc = context.document;

            // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
            var de = doc.documentElement;
            // If the innerWidth of the browser is available, use that
            return context.innerWidth ||
            // Otherwise, try to get the width off of the root node
            (de && de.clientWidth+(de.style.borderLeftWidth=='' ?0 : de.style.borderLeftWidth)
                    +(de.style.borderRightWidth=='' ?0 : de.style.borderRightWidth)) ||
            // Finally, try to get the width off of the body element
            doc.body.clientWidth;
        },
        /**
        * 获取页面滚动高度
        * @public
        * @return {Int} 页面滚动的高度
        */
        getPageScrollTop: function (context) {
            context = context || window;
            var doc = context.document;
            // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
            var de = doc.documentElement;
            // If the pageYOffset of the browser is available, use that
            return context.pageYOffset ||
            // Otherwise, try to get the scroll top off of the root node
            (de && de.scrollTop) ||
            // Finally, try to get the scroll top off of the body element
            doc.body.scrollTop;
        },
        /**
        * 
        * 获取页面的水平滚动
        * @public
        * @return 页面水平滚动
        */
        getPageScrollLeft: function (context) {
            context = context || window;
            var doc = context.document;
            // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
            var de = doc.documentElement;
            // If the pageXOffset of the browser is available, use that
            return context.pageXOffset ||
            // Otherwise, try to get the scroll left off of the root node
            (de && de.scrollLeft) ||
            // Finally, try to get the scroll left off of the body element
            doc.body.scrollLeft;
        },
        /**
        * 获取元素在页面中的位置，相对于页面
        * @public
        */
        getPosition: function (el) {
            try{
                var box = el.getBoundingClientRect();
            }
            catch(e){
                lib.log('getPosition failed.');
                return {top:9999,left:9999};
            }
            var doc = el.ownerDocument,
                body = doc.body,
                html = doc.documentElement,
                clientTop = html.clientTop || body.clientTop || 0,
                clientLeft = html.clientLeft || body.clientLeft || 0,
                top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop,
                left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;

            return { 'top': top, 'left': left };
        }
    });

});