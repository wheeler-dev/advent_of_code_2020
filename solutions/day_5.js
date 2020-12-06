const fs = require('fs');

module.exports = class day_5 {

    static solution() {

        const convertline = (str) => {
            str = str.split('').map(x => x === 'B' || x === 'R' ? 1 : 0).join('');
            return parseInt(str, 2);
        };

        class Seat {
            constructor(line) {
                this.row = convertline(line.slice(0, 7));
                this.column = convertline(line.slice(7));
                this.id = this.row * 8 + this.column;
            }
        }

        const lines = fs.readFileSync('./inputs/day_5', 'utf-8')
            .toString()
            .split('\n')
            .map(x => x);
        lines.pop();

        const seats = [];

        for (let line of lines) {
            const seat = new Seat(line);
            seats.push(seat);
        }

        let highestId = 0;
        for (let seat of seats) {
            if (seat.id > highestId) {
                highestId = seat.id;
            }
        }

        console.log('Day 5, Part 1: ', highestId);

    };
};
