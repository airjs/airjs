define(function(require,exports,module){
    
    var show = function (element) {
        //如果样式文件中定义元素的display值为none，那么置为空后，元素仍然不可见
        element.style.display = element.getAttribute('data-private-display') || 'block';
    };
    
    module.exports = show;
});