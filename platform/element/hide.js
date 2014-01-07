define(function(require,exports,module){
    
    var hide = function (element) {
        var display = element.style.display || '';
        if(display != 'none')element.setAttribute('data-private-display',display);
        element.style.display = 'none';
    };
    
    module.exports = hide;
});