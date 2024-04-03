// function to derive bortle class from sqm values

function getBortle(SQM) {
    let bortleClass;
    
    if ( SQM < 17.99 ) {
        bortleClass = 9;
    } else if (SQM >= 18.00 && SQM <= 18.37) {
        bortleClass = 8;
    } else if (SQM >= 18.38 && SQM <= 18.93) {
        bortleClass = 7;
    } else if (SQM >= 18.94 && SQM <= 19.49) {
        bortleClass = 6;
    } else if (SQM >= 19.50 && SQM <= 20.48) {
        bortleClass = 5;
    } else if (SQM >= 20.49 && SQM <= 21.69) {
        bortleClass = 4;
    } else if (SQM >= 21.70 && SQM <= 21.88) {
        bortleClass = 3;
    } else if (SQM >= 21.99 && SQM <= 21.89) {
        bortleClass = 2;
    } else {
        bortleClass = 1;
    }
    
    return bortleClass;
}
