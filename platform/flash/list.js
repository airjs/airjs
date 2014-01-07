define(function(require,exports,module){
    var list = {};
    module.exports = {
        set:function(id){
            if(!(id in list)){
                list[id] = document.getElementById(id);
            }
            else{
                throw 'flash对象id有重复！' 
            }
        },
        get:function(id){
            return list[id]
        },
        getAll:function(){
            return list;
        },
        remove:function(id){
            list[id] = null;
            delete list[id];
        }
    }
});