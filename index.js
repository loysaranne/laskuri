const submit = document.getElementById('submit');
const input = document.getElementById('input');

function isHetu(value) {
    const checkValue = `${value.slice(0,6)}${value.slice(7,10)}`;
    const checkChar = value.slice(-1);

    return /^(\d){6}[+-YXWVUABCDEF]([\d\w]){4}$/.test(value) 
        && compareCharacter(checkValue, checkChar);
}

function compareCharacter(val, char) {
    switch (val % 31) {
        case 0:
            return char === '0' ? true : false;
        case 1:
            return char === '1' ? true : false;
        case 2:
            return char === '2' ? true : false;
        case 3:
            return char === '3' ? true : false;
        case 4:
            return char === '4' ? true : false;
        case 5:
            return char === '5' ? true : false;
        case 6:
            return char === '6' ? true : false;
        case 7:
            return char === '7' ? true : false;
        case 8:
            return char === '8' ? true : false;
        case 9:
            return char === '9' ? true : false;
        case 10:
            return char === 'A' ? true : false;
        case 11:
            return char === 'B' ? true : false;
        case 12:
            return char === 'C' ? true : false;
        case 13:
            return char === 'D' ? true : false;
        case 14:
            return char === 'E' ? true : false;
        case 15:
            return char === 'F' ? true : false;
        case 16:
            return char === 'H' ? true : false;
        case 17:
            return char === 'J' ? true : false;
        case 18:
            return char === 'K' ? true : false;
        case 19:
            return char === 'L' ? true : false;
        case 20:
            return char === 'M' ? true : false;
        case 21:
            return char === 'N' ? true : false;
        case 22:
            return char === 'P' ? true : false;
        case 23:
            return char === 'R' ? true : false;
        case 24:
            return char === 'S' ? true : false;
        case 25:
            return char === 'T' ? true : false;
        case 26:
            return char === 'U' ? true : false;
        case 27:
            return char === 'V' ? true : false;
        case 28:
            return char === 'W' ? true : false;
        case 29:
            return char === 'X' ? true : false;
        case 30:
            return char === 'Y' ? true : false;
    }
}

function isLeapYear(year) {
    return year % 400 == 0 || year % 4 === 0 && year % 100 !== 0;
}

function inputChange(value) {
    document.getElementById('age').innerHTML = '';
    if (value.length === 11) {
        if (isHetu(value))
            submit.disabled = false;
        else
            document.getElementById('age').innerHTML = 'Henkilötunnus ei ole oikea!';
    } else submit.disabled = true;
}

function onSubmit() {
    countAge();
    return false;
}

function countAge() {
    if (!isHetu(input.value)) return;
    
    let day = input.value.slice(0,2);
    let month = input.value.slice(2,4);
    let year = input.value.slice(4,6);

    // Born in 18XX
    if (/^(\d){6}[+]([\d\w]){4}$/.test(input.value))
        year = `18${year}`;

    // Born in 19XX
    if (/^(\d){6}[-YXWVU]([\d\w]){4}$/.test(input.value))
        year = `19${year}`;

    // Born in 20XX
    if (/^(\d){6}[ABCDEF]([\d\w]){4}$/.test(input.value))
        year = `20${year}`;

    const dateNow = new Date();
    
    let dayNow = dateNow.getDate();
    let monthNow = dateNow.getMonth()+1;
    let yearNow = dateNow.getFullYear();

    if (dayNow < day) {
        if ([1,3,5,7,8,10,12].some(el => el === monthNow)) {
            dayNow += 31;
        } else if ([4,6,9,11].some(el => el === monthNow)) {
            dayNow += 30;
        } else if (monthNow === 2 && isLeapYear(yearNow)) {
            dayNow += 29;
        } else {
            dayNow += 28;
        }
        monthNow--;

        if (monthNow === 0) {
            monthNow += 12;
            yearNow--;
        }
    }

    if (monthNow < month) {
        monthNow += 12;
        yearNow--;
    }

    if (yearNow-year < 0) {
        document.getElementById('age').innerHTML = "Et ole syntynyt vielä!";
        return;
    }

    const text = `${yearNow-year} vuotta, ${monthNow-month} kuukautta ja ${dayNow-day} päivää`;
    document.getElementById('age').innerHTML = text;
}
