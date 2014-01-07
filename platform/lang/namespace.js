define(function(require, exports, module) {
    var global = require('../../driver/global');
    var namespace = function(name, module, owner) {
        var packages = name.split('.'),
            len = packages.length - 1,
            packageName, i = 0;

        // 如果没有owner，找当前作用域，如果当前作用域没有此变量，在window创建
        if (!owner) {
            try {
                if (!(new RegExp('^[a-zA-Z_$][a-zA-Z0-9_$]*$')).test(packages[0])) {
                    throw '';
                }
                owner = (new Function("return " + packages[0]))();
                i = 1;
            } catch (e) {
                owner = global;
            }
        }

        for (; i < len; i++) {
            packageName = packages[i];
            if (!owner[packageName]) {
                owner[packageName] = {};
            }
            owner = owner[packageName];
        }

        if (!owner[packages[len]]) {
            owner[packages[len]] = module;
        }
    };

    module.exports = namespace;
    
});