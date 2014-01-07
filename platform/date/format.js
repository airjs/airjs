define(function(require,exports,module){

    var pad = require('../number/pad');

    var format = function(date,pattern){
        if ('string' != typeof pattern) {
            return date.toString();
        }

        function replacer(patternPart, result) {
            pattern = pattern.replace(patternPart, result);
        }
        
        var year    = date.getFullYear(),
            month   = date.getMonth() + 1,
            date2   = date.getDate(),
            hours   = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        replacer(/yyyy/g, pad(year, 4));
        replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
        replacer(/MM/g, pad(month, 2));
        replacer(/M/g, month);
        replacer(/dd/g, pad(date2, 2));
        replacer(/d/g, date2);

        replacer(/HH/g, pad(hours, 2));
        replacer(/H/g, hours);
        replacer(/hh/g, pad(hours % 12, 2));
        replacer(/h/g, hours % 12);
        replacer(/mm/g, pad(minutes, 2));
        replacer(/m/g, minutes);
        replacer(/ss/g, pad(seconds, 2));
        replacer(/s/g, seconds);

        return pattern;
    };

    module.exports = format;
});