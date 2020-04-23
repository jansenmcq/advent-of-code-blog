
function timer(functionToWrap) {
    time0 = Date.now();
    result = functionToWrap();
    time1 = Date.now();
    console.log(time1 - time0);
    return result;
}


module.exports = timer;