const fs = require('fs');

const day_1 = () => {

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

const day_2 = () => {
    let validPasswordsPart1 = 0;
    let validPasswordsPart2 = 0;
    // read input from file
    const input = fs.readFileSync('./inputs/day_2', 'utf-8')
        .toString()
        .split('\n');
    // remove last empty line
    input.pop();

    input.forEach((line) => {
        // string operations
        let password = line.substr(line.indexOf(':') + 2, line.length);
        let passwordCharArray = password.split('');
        let policy = line.substr(0, line.indexOf(':'));
        let upper = parseInt(line.substring(line.indexOf('-') + 1, policy.length - 2));
        let lower = parseInt(line.substr(0, line.indexOf('-')));
        let match = policy.charAt(policy.length - 1);

        // console.log('---------------------------------------------');
        // console.log('line', line);
        // console.log('password: ', password);
        // console.log('policy: ', policy);
        // console.log('upper: ', upper);
        // console.log('lower: ', lower);
        // console.log('match: ', match);

        let occurrences = 0;
        passwordCharArray.forEach((char, index) => {
            if (char === match) {
                occurrences += 1;
            }
        });
        // console.log('occurrences: ', occurrences);
        // console.log('---------------------------------------------');

        // part 1
        if ((lower <= occurrences) && (occurrences <= upper)) {
            validPasswordsPart1 += 1;
        }

        // part 2
        if (passwordCharArray[lower - 1] === match ^ passwordCharArray[upper - 1] === match) {
            validPasswordsPart2 += 1;
        }

    });

    console.log('Day 2, Part 1: ', validPasswordsPart1);
    console.log('Day 2, Part 2: ', validPasswordsPart2);
};

const day_3 = () => {
    let solutionPart1 = 0;
    let solutionPart2 = 0;

    const rows = fs.readFileSync('./inputs/day_3', 'utf-8')
        .toString()
        .split('\n')
        .map(x => x.split(''));

    const lineWidth = rows[0].length;

    const traverse = ({right, down}) => {
        let trees = 0;
        let step = 0;

        for (let i = 0; i < rows.length; i += down) {
            if (rows[i][step % lineWidth] === '#') {
                trees += 1;
            }
            step += right;
        }

        return trees;
    };

    const sleds = [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 },
    ];

    solutionPart1 = traverse(sleds[1]);
    console.log('Day 3, Part 1: ', solutionPart1);

    let sledTrees = [];
    sleds.forEach((sled) => {
        sledTrees.push(traverse(sled));
    });

    sledTrees.forEach((trees, index) => {
        if (index === 0) {
            solutionPart2 = trees;
        } else {
            solutionPart2 *= trees;
        }
    });

    console.log('Day 3, Part 2: ', solutionPart2);
};

// day_1();
// day_2();
day_3();

