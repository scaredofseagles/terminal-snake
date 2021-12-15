let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

const changeDirection = (_, key) => {
	switch (key.name) {
		case "up":
			if (lastInputDirection.y !== 0) break;
			inputDirection = { x: 0, y: -1 };
			break;
		case "down":
			if (lastInputDirection.y !== 0) break;
			inputDirection = { x: 0, y: 1 };
			break;
		case "left":
			if (lastInputDirection.x !== 0) break;
			inputDirection = { x: -1, y: 0 };
			break;
		case "right":
			if (lastInputDirection.x !== 0) break;
			inputDirection = { x: 1, y: 0 };
			break;
	}
};

const getInputDirection = () => {
	lastInputDirection = inputDirection;
	return inputDirection;
};

module.exports = { getInputDirection, changeDirection };
