const fs = require('fs');

module.exports = class day_1 {
    static solution() {
        let solutionPartOne = 0;
        let solutionPartTwo = 0;

        // read input from file
        const stringInputs = fs.readFileSync('./inputs/day_1', 'utf-8')
            .toString()
            .split('\n');
        const inputs = stringInputs.map((input) => {
            return parseInt(input);
        });

        const desiredSum = 2020;

        inputs.forEach((firstInput) => {
            inputs.forEach((secondInput) => {
                if (firstInput + secondInput === desiredSum) {
                    solutionPartOne = firstInput * secondInput;
                }
                inputs.forEach((thirdInput) => {
                    if (firstInput + secondInput + thirdInput === desiredSum) {
                        solutionPartTwo = firstInput * secondInput * thirdInput;
                    }
                });
            });
        });
        console.log('Day 1, Part 1: ', solutionPartOne);
        console.log('Day 1, Part 2:', solutionPartTwo);
    };
};
