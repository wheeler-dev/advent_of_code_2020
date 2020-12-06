const fs = require('fs');

module.exports = class day_2 {
    static solution() {
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
};

