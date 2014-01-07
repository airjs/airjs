define(function(require,exports,module){

    /**
     * ECMAScript 5 Reference: 15.9.5.43
     * @returns {string}
     */
    Date.prototype.toISOString || (Date.prototype.toISOString = (function(){
        
        var str = function(n, l) {
            var str = String(n),
                len = l || 2;
            while( str.length < len )
                str = '0' + str;
            return str;
        };
        
        return function(){
                return isFinite( this.getTime() )
                    ? String(this.getUTCFullYear()).concat( '-', 
                        str(this.getUTCMonth() + 1), "-",
                        str(this.getUTCDate()), "T",
                        str(this.getUTCHours()), ":",
                        str(this.getUTCMinutes()), ":",
                        str(this.getUTCSeconds()), ".",
                                str(this.getUTCMilliseconds(),3), "Z" )
                            : 'Invalid Date';
            };
        
    })() );

});