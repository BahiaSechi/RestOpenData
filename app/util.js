function constrArgs(cla) {
    var args = cla.prototype.constructor.toString().match(/constructor\s*\(([^)]*)\)/)[1];

    return args.split(',').map(function(arg) {
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
        return arg;
    });
}

Object.prototype.copy = function() {
    return JSON.parse(JSON.stringify(this));
};

module.exports = {constrArgs};