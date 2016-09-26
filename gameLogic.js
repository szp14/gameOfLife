/* exported initGame */
/* exported randomInitGame */
/* exported nextGeneration */
var liveUpperBound = 3;
var liveLowerBound = 3;
var keepUpperBound = 2;
var keepLowerBound = 2;

function initGame(width, height)
{
	var gameMap = new Array();
	for(var i = 0; i < height; i++)
	{
		var newRow = new Array();
		for(var j = 0; j < width; j++)
			newRow.push(0);
		gameMap.push(newRow);
	}
	return gameMap;
}

function randomInitGame(width, height, cellNum)
{
	var gameMap = new Array();
	for(var i = 0; i < height; i++)
	{
		var newRow = new Array();
		for(var j = 0; j < width; j++)
			newRow.push(0);
		gameMap.push(newRow);
	}
	for(i = 0; i < cellNum; i++)
	{
		var x = Math.floor(Math.random() * height);
		var y = Math.floor(Math.random() * width);
		if(x == height) x--;
		if(y == width) y--;
		if(gameMap[x][y] == 1) i--;
		else gameMap[x][y] = 1;
	}
	return gameMap;
}

function nextStatus(x, y, gameMap)
{
	var liveCell = 0;
	var height = gameMap.length;
	var width = gameMap[0].length;
	for(var i = -1; i <= 1; i++)
		for(var j = -1; j <= 1; j++)
			if(i != 0 || j != 0)
				liveCell += gameMap[(x + i + height) % height][(y + j + width) % width];

	if(liveCell >= liveLowerBound && liveCell <= liveUpperBound) return 1;
	else if(liveCell >= keepLowerBound && liveCell <= keepUpperBound) return gameMap[x][y];
	else return 0;
}

function nextGeneration(gameMap)
{
	var newMap = initGame(gameMap[0].length, gameMap.length);
	for(var i = 0; i < newMap.length; i++)
		for(var j = 0; j < newMap[i].length; j++)
			newMap[i][j] = nextStatus(i, j, gameMap);
	for(i = 0; i < newMap.length; i++)
		for(j = 0; j < newMap[i].length; j++)
			gameMap[i][j] = newMap[i][j];
}