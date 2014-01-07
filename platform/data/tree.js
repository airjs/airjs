define(function(require,exports,module){

    var Class = require('../class');

    var TreeNode = Class('Tree',{
        construct:function(options){
            options = options || {};
            this._root = options.tree;
            this._parent = options.parent;
            this._data = options.data;
            this._childs = [];
            this._level = 0;
        },
        methods:{
            append:function(node){
                this._root.append(this,node);
            },
            parent:function(){
                return this._parent;
            },
            getData:function(){
                return this._data;
            }
        }
    });

    var Tree = Class('Tree',{
        construct:function(){
            this._node = new TreeNode({tree:this,parent:null});
            this._node._level = 1;
        },
        methods:{
            createNode:function(options){
                return new TreeNode(options);
            },
            append:function(parent,child){
                if(arguments.length == 1){
                    child = parent;
                    parent = this._node;
                }
                child._root = this;
                child._parent = parent;
                child._level = parent._level + 1;
                var exists = false;
                parent._childs.forEach(function(node){
                    if(child == node){
                        exists = true;
                    }
                });
                if(!exists){
                    parent._childs.push(child);
                }
                return parent;
            },
            forEach:function(callback){
                var iterate = function(node){
                    callback(node._data,node._level);
                    node._childs.forEach(function(child){
                        iterate(child);
                    });
                };
                iterate(this._node);
            }
        }
    });

    module.exports = Tree;
});