const fs = require('fs');

module.exports = class day_4 {
    static solution() {
        const passports = fs.readFileSync('./inputs/day_4', 'utf-8')
            .toString()
            .split('\n\n')
            .map(x => {
                // remove linebreaks
                while (x.includes('\n')) {
                    x = x.slice(0, x.indexOf('\n')) + ' ' + x.slice(x.indexOf('\n') + 1);
                }
                // split into passport fields
                x = x.split(/[ ]/);
                // remove empty strings
                x.forEach((string, index) => {
                    if (string.length < 1) {
                        x.splice(index, 1);
                    }
                });

                return x
            });

        let solutionPart1 = 0;
        let solutionPart2 = 0;

        let requiredPassportFields = [

            // (Birth Year)
            {
                field : 'byr', optional : false, validationFunction : (year) => {
                    return parseInt(year) >= 1920 && parseInt(year) <= 2002;
                }
            },
            // (Issue Year)
            {
                field : 'iyr', optional : false, validationFunction : (year) => {
                    return parseInt(year) >= 2010 && parseInt(year) <= 2020;
                }
            },
            // (Expiration Year)
            {
                field : 'eyr', optional : false, validationFunction : (year) => {
                    return parseInt(year) >= 2020 && parseInt(year) <= 2030;
                }
            },
            // (Height)
            {
                field : 'hgt', optional : false, validationFunction : (height) => {
                    let value = parseInt(height.substr(0, height.length - 2));
                    let measure = height.substring(height.length - 2);
                    if (measure === 'cm') {
                        // 150 and at most 193
                        return value >= 150 && value <= 193;
                    } else if (measure === 'in') {
                        // 59 and at most 76
                        return value >= 59 && value <= 76;
                    } else {
                        return false;
                    }
                }
            },
            // (Hair Color)
            {
                field : 'hcl', optional : false, validationFunction : (haircolor) => {
                    // debug
                    // if (haircolor.charAt(0) === '#') {
                    //     for (let i = 1; i <= haircolor.length; i++) {
                    //         if (parseInt(haircolor[i]) >= 0 && parseInt(haircolor[i]) <= 9) {
                    //             return true;
                    //         }
                    //     }
                    // } else {
                    //     return false;
                    // }

                    return !!haircolor.match(/#[0-9a-f]{6}/);
                }
            },
            // (Eye Color)
            {
                field : 'ecl', optional : false, validationFunction : (eyecolor) => {
                    // debug
                    // let colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                    // return colors.includes(eyecolor);

                    return !!eyecolor.match(/amb|blu|brn|gry|grn|hzl|oth/);
                }
            },
            // (Passport ID)
            {
                field : 'pid', optional : false, validationFunction : (passportid) => {
                    // debug
                    // if (passportid.length === 9) {
                    //     for (let i = 0; i < passportid.length; i++) {
                    //         if (parseInt(passportid[i]) >= 0 && parseInt(passportid[i]) <= 9) {
                    //             return true;
                    //         }
                    //     }
                    // } else {
                    //     return false;
                    // }

                    return !!passportid.match(/[0-9]{9}/);
                }
            },
            // (Country ID)
            {
                field : 'cid', optional : true, validationFunction : (cid) => {
                    return true;
                }
            },
        ];

        passports.forEach((passport) => {

            let existingFields = 0;
            let validFields = 0;

            passport.forEach((passportField) => {
                requiredPassportFields.forEach((requiredField) => {
                    const field = passportField.split(':');
                    let fieldName = field[0];
                    let fieldValue = field[1];

                    // presence check
                    if (requiredField.optional === false && fieldName === requiredField.field) {
                        existingFields += 1;

                        // validation
                        if (requiredField.validationFunction(fieldValue) === true) {
                            validFields += 1;
                        }
                    }
                });
            });

            if (existingFields === 7) {
                solutionPart1 += 1;
                if (existingFields === validFields) {
                    // console.log('passport:', passport);
                    // console.log('------------------------------------');
                    solutionPart2 += 1;
                }
            }
        });

        console.log('Day 4, Part 1: ', solutionPart1);
        console.log('Day 4, Part 2: ', solutionPart2);
    };
};

