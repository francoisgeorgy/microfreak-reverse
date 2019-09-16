
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

/**
 * Returns the number of bit 0 before the rightmost bit set to 1.
 * @param {*} v
 */
function getRightShift(v) {
    if (!v) return -1;  //means there isn't any 1-bit
    let i = 0;
    while ((v & 1) === 0) {
        i++;
        v = v>>1;
    }
    return i;
}

function matrixValue(MSB, LSB, LSB_msb, mask=0x03) {

    console.log("matrixValue", h(MSB), h(LSB), h(LSB_msb), mask);

    const j = getRightShift(mask);      console.log(`j: ${j}`);
    const k = mask >> j;                console.log(`k: ${b(mask)} --> ${b(k)}`);

    const msb = LSB_msb >> j;

    // const neg = LSB_msb & 0x02;
    const neg = msb & 0x02;
    if (neg) {
        console.log('negative number');
    }

    const high = (MSB & 0x7f) << 8;      console.log(`${h(MSB)} ${b(MSB)} --> ${b(high, 16)}`);    // MSB
    const mid  = LSB & 0x7f;             console.log(`${h(LSB)} ${b(LSB)} --> ${b(mid, 16)}`);     // LSB
    const low = (msb & 0x01) << 7;       console.log(`${h(msb)} ${b(msb)} --> ${b(low, 16)}`);     // msb of LSB
    // const low = (LSB_msb & 0x01) << 7;       console.log(`${h(LSB_msb)} ${b(LSB_msb)} --> ${b(low, 16)}`);     // msb of LSB
    const n = high + mid + low;         console.log(`            --> ${b(n, 16)}`);
                                        // console.log(h(b3), h(b2), h(b1), h(high), h(mid), h(low), h(v));
/*
    let high = (b3 & 0x7f) << 1;      console.log(`${h(b3)} ${b(b3)} --> ${b(high, 16)}`);      // make room for lsb
    high = high + (b1 & 0x01);          console.log(`            --> ${b(high, 16)}`);          // add lsb
    high = high << 7;                   console.log(`            --> ${b(high, 16)}`);
    const mid  = (b2 & 0x7f) ;             console.log(`${h(b2)} ${b(b2)} --> ${b(mid, 16)}`);
    // const low = (b1 & 0x01);       console.log(`${h(b1)} ${b(b1)} --> ${b(low, 16)}`);
    const n = high + mid;         console.log(`            --> ${b(n, 16)}`);
    // console.log(h(b3), h(b2), h(b1), h(high), h(mid), h(low), h(v));
*/

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

console.log(matrixValue(0x4c, 0x40, 0x01));     // 60.0
// console.log(matrixValue(0x00, 0x5f, 0x41));     // 51.1
// console.log(matrixValue(0x02, 0x41, 0x33));     // -60.0
// console.log(matrixValue(0x02, 0x61, 0x01));     // -98.9

console.log(matrixValue(0x7f, 0x7f, 0x20, 0b01100000));     // 100.0
console.log(matrixValue(0x4e, 0x5f, 0x00, 0b01100000));     // 100.0


/*

4C 01001100 --> 01001100 00000000
40 01000000 --> 00000000 01000000
01 00000001 --> 00000000 10000000
            --> 01001100 11000000
            --> 599.609375 5996

4C 01001100 --> 00000000 10011000
            --> 00000000 10011001
            --> 01001100 10000000
40 01000000 --> 00000000 01000000
            --> 01001100 11000000
            --> 599.609375 5996
60


 */