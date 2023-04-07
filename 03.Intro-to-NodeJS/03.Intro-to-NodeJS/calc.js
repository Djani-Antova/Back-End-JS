function calc(a, b) {
    return a + b;
}
console.log('In calc');


//Default Export
//module.exports = calc;

// Named export
exports.calc = calc;
exports.multiply = (a, b) => a * b;