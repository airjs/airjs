define(function(require,exports,module){

    /**
     * ECMAScript 5 Reference: 15.9.5.44
     */
    Date.prototype.toJSON || (Date.prototype.toJSON = function(key){ 
        if( !isFinite(this) ) 
            return null;
        if( !this.toISOString || typeof this.toISOString !== 'function' )
            throw new TypeError( "Date.prototype.toJSON called on incompatible " + (typeof this) );
        
        return this.toISOString();
    });

});