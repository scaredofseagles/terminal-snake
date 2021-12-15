const blessed = require("blessed");
const { getInputDirection, changeDirection } = require("./input.js");

const SNAKE_SPEED = 100;
let gameOver = false;
let changingDirection = false;

const screen = blessed.screen({
	smartCSR: true,
});

screen.title = "Terminal Snake";

const gameBox = blessed.box({
	parent: screen,
	top: 1,
	left: 0,
	width: "100%",
	height: "100%-1",
	style: {
		fg: "black",
		bg: "black",
	},
});

let gameContainer = gameBox;

// screen.append(gameBox);

const snakeBody = [{ x: 10, y: 11 }];
let newSegments = 0;

const draw = (coord, color) => {
	return blessed.box({
		parent: gameContainer,
		top: coord.y,
		left: coord.x,
		width: 1,
		height: 1,
		style: {
			fg: color,
			bg: color,
			border: {
				type: "line",
				bg: "#f0f0f0",
			},
		},
	});
};

const scoreBox = blessed.box({
	top: 0,
	left: "left",
	width: "100%",
	height: 1,
	tags: true,
	style: {
		fg: "white",
		bg: "blue",
	},
});

screen.append(scoreBox);

const scoreContainer = blessed.box(scoreBox);

const updateScore = score => {
	scoreContainer.setLine(0, `{bold}Score:{/bold} ${score}`);
};

const drawSnake = () => {
	snakeBody.forEach(segment => {
		draw(segment, "green");
	});
};

const updateSnake = () => {
	if (changingDirection) return;

	changingDirection = true;

	addSegments();

	const inputDirection = getInputDirection();

	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] };
	}

	snakeBody[0].x += inputDirection.x;
	snakeBody[0].y += inputDirection.y;
};

const addSegments = () => {
	for (let i = 0; i < newSegments; i++) {
		snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
	}

	newSegments = 0;
};

const clearScreen = () => {
	gameContainer.detach();
	gameContainer = null;
};

screen.on("keypress", changeDirection);

screen.key(["escape", "q", "C-c"], (ch, key) => {
	return process.exit(0);
});

let timer;

const tick = () => {
	if (gameOver) {
		updateScore("game over");
		clearInterval(timer);
		timer = null;
	}

	changingDirection = false;
	clearScreen();
	drawSnake();
	updateScore();
	updateSnake();
	screen.render();
};

const main = () => {
	timer = setInterval(tick, SNAKE_SPEED);
};

main();
