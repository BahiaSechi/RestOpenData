function getArgs(func) {
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

    return args.split(',').map(function(arg) {
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
        return arg;
    });
}

module.exports = {getArgs};