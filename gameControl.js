/* global initGame, nextGeneration, randomInitGame, $ */

var gameStatus = 0;
//0: before the game is running
//1: the game is running now
//2: the game is paused
var gameBlockEdge = 10;
var gameMap;
var gameWidth = 100;
var gameHeight = 50;
var gameCellNumber = Math.floor(gameHeight * gameWidth / 3);
var gameUpdateRate = 100;
var gameGeneration = 0;

function chooseBlock(i, j)
{
	return $("#b" + i + "-" + j);
}

function showMap()
{
	for(var i = 0; i < gameMap.length; i++)
	{
		for(var j = 0; j < gameMap[i].length; j++)
		{
			var block = chooseBlock(i, j);
			if(gameMap[i][j] == 0 && block.hasClass("black"))
			{ 
				block.removeClass("black");
				block.addClass("white");
			}
			else if(gameMap[i][j] == 1 && block.hasClass("white"))
			{
				block.removeClass("white");
				block.addClass("black");
			}
		}
	}
}

function startTimer()
{
	if(gameStatus == 1)
	{
		setTimeout("startTimer()", gameUpdateRate);
		nextGeneration(gameMap);
		showMap();
		gameGeneration++;
		$("#generation").text("Generation: " + gameGeneration);
	}
}

$(document).ready(function()
{
	$("#generation").text("Generation: " + gameGeneration);
	$("#init").text("随机初始化");
	$("#start").text("开始繁殖");
	gameMap = initGame(gameWidth, gameHeight);
	var area = "";
	for(var j = 0; j < gameMap.length; j++)
	{
		for(var i = 0; i < gameMap[j].length; i++)
		{
			area += "<div class = 'white' id = 'b" + j + "-" + i + 
				"' style = 'left: " + i * gameBlockEdge + 
				"px; top: " + j * gameBlockEdge + "px'></div>";
		}
	}
	$("#gamemain")
	.html(area)
	.width(gameMap[0].length * gameBlockEdge)
	.height(gameMap.length * gameBlockEdge)
	.show();
});

$(function()
{
	$("#gamemain").mousedown(function(e)
	{
		if(gameStatus == 1) return;
		var clickBlock = $(e.target);
		var id = clickBlock.attr("id");
		var	x = parseInt(id.substring(1, id.indexOf("-"))); 
		var	y = parseInt(id.substring(id.indexOf("-") + 1));
		var block = chooseBlock(x, y);
		if(gameMap[x][y] == 0)
		{
			gameMap[x][y] = 1;
			block.removeClass("white");
			block.addClass("black");
		}
		else
		{
			gameMap[x][y] = 0;
			block.removeClass("black");
			block.addClass("white");
		}
	});
	$("#init").click(function()
	{
		if(gameStatus == 0)
		{
			gameMap = randomInitGame(gameWidth, gameHeight, gameCellNumber);
			showMap();
		}
		else if(gameStatus == 2)
		{
			$("#init").text("暂停");
			gameStatus = 1;
			startTimer();
		}
		else
		{
			$("#init").text("继续");
			gameStatus = 2;
		}
	});
	$("#start").click(function()
	{
		if(gameStatus == 0)
		{
			$("#start").text("重新开始");
			$("#init").text("暂停");
			gameStatus = 1;
			startTimer();
		}
		else
		{
			$("#start").text("开始繁殖");
			$("#init").text("随机初始化");
			gameStatus = 0;
			gameGeneration = 0;
			$("#generation").text("Generation: " + gameGeneration);
			gameMap = initGame(gameWidth, gameHeight);
			showMap();
		}
	});
});