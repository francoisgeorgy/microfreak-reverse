
function padZero(str, len, char) {
    let s = '';
    let c = char || '0';
    let n = (len || 2) - str.length;
    while (s.length < n) s += c;
    return s + str;
}

function b(v, n=8) {
    return (v === null || v === undefined) ? "" : padZero(v.toString(2).toUpperCase(), n);
}

function h(v, n=2) {
    return (v === null || v === undefined) ? "" : padZero(v.toString(16).toUpperCase(), 2);
}

console.log(matrixValue(0x01, 0x40, 0x4c));     // 60.0
console.log(matrixValue(0x00, 0x5f, 0x41));     // 51.1
console.log(matrixValue(0x02, 0x41, 0x33));     // -60.0
console.log(matrixValue(0x02, 0x61, 0x01));     // -98.9
