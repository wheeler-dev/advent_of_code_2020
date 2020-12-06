const fs = require('fs');

module.exports = class day_3 {
    static solution() {
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
            {right : 1, down : 1},
            {right : 3, down : 1},
            {right : 5, down : 1},
            {right : 7, down : 1},
            {right : 1, down : 2},
        ];

        solutionPart1 = traverse(sleds[1]);

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

        console.log('Day 3, Part 1: ', solutionPart1);
        console.log('Day 3, Part 2: ', solutionPart2);
    };
};

