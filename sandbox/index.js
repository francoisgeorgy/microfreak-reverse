
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

function matrixValue(b1, b2, b3) {

    // console.log(b3, b2, b1, (b3*256+b2+128*b1)*100/32767);

    const neg = b1 & 0x02;
    if (neg) {
        console.log('negative number');
    }

    const high = (b3 & 0x7f) << 8;      console.log(`${h(b3)} ${b(b3)} --> ${b(high, 16)}`);
    const mid  = b2 & 0x7f;             console.log(`${h(b2)} ${b(b2)} --> ${b(mid, 16)}`);
    const low = (b1 & 0x01) << 7;       console.log(`${h(b1)} ${b(b1)} --> ${b(low, 16)}`);
    const n = high + mid + low;         console.log(`            --> ${b(n, 16)}`);
                                        // console.log(h(b3), h(b2), h(b1), h(high), h(mid), h(low), h(v));

    let f;
    if (neg) {
        const c2 = ((~n) & 0x7fff) + 1;       console.log(`            --> ${b(c2, 16)}`, c2);
        f = - (c2 * 1000 / 32768);
    } else {
        f = n * 1000 / 32768;
    }
    console.log(`            --> ${f}`, Math.round(f*10));

    return Math.round(f) / 10;
}

console.log(matrixValue(0x01, 0x40, 0x4c));     // 60.0
console.log(matrixValue(0x00, 0x5f, 0x41));     // 51.1
console.log(matrixValue(0x02, 0x41, 0x33));     // -60.0
console.log(matrixValue(0x02, 0x61, 0x01));     // -98.9
