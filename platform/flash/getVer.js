define(function(require, exports, module) {
    var version = (function() {
        var ver;
        try {
            ver = navigator.plugins['Shockwave Flash'].description;
        } catch (e) {
            try {
                ver = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
            } catch (e) {

            }
        }
        return (ver || '0 r0').match(/\d+/g);
    })();

    module.exports = version;
});