// function to derive bortle class from sqm values

function getBortle(SQM) {
    let bortleClass;
    
    if (SQM < 18.00) {
        bortleClass = "8-9";
    } else if (SQM >= 18.00 && SQM <= 18.99) {
        bortleClass = 7;
    } else if (SQM >= 19.00 && SQM <= 19.49) {
        bortleClass = 6;
    } else if (SQM >= 19.50 && SQM <= 20.49) {
        bortleClass = 5;
    } else if (SQM >= 20.50 && SQM <= 21.70) {
        bortleClass = 4;
    } else if (SQM >= 21.71 && SQM <= 21.89) {
        bortleClass = 3;
    } else if (SQM >= 21.90 && SQM <= 21.99) {
        bortleClass = 2;
    } else {
        bortleClass = 1;
    }
    
    return bortleClass;
}
