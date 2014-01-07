define(function(require,exports,module){

    /**
     *  ECMAScript 5 Reference: 15.4.3.2
     *  Tests if passed object is an Array
     *  @since 1.0.1, revision 9 (thanks to dudleyflanders)
     *  @param obj object to be tested
     *  @returns {boolean} true if input parameter is an object false in any other case
     *  @example Array.isArray([]) === true;
     */
    Array.isArray || (Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]" || (obj instanceof Array);
    }); 

});