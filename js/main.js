var gamePiece;

function startGame()
{
	gameArea.start();
	
	gamePiece = new component(20, 20, "#5500AA", 12, 12);
}

function updatePlayerInfo()
{
	document.getElementById("xPos").innerHTML = "X-position = " + gamePiece.x;
	document.getElementById("yPos").innerHTML = "Y-position = " + gamePiece.y;
	document.getElementById("xVel").innerHTML = "X-velocity = " + gamePiece.speedX;
	document.getElementById("yVel").innerHTML = "Y-velocity = " + gamePiece.speedY;
}

function updatePieceColor()
{
	var xPos = gamePiece.x;
	var yPos = gamePiece.y;
	var red;
	var green;
	var blue;
	var alpha = yPos / 360;
	
	if((xPos >= 1) && (xPos <= 256))
	{
		red = 256-xPos;
		green = xPos-1;
		blue = 0;
	}
	if((xPos >= 257) && (xPos <= 512))
	{
		red = 0;
		green = 255 - (xPos - 257);
		blue = xPos - 257;
	}
	if((xPos >= 513) && (xPos <= 640))
	{
		red = xPos - 513;
		green = 0;
		blue = 255 - (xPos - 513);
	}
	gamePiece.color = "rgba("+red+","+green+","+blue+","+alpha+")";
}

function updateGameArea()
{
	//gameArea.clear();
	gamePiece.deccelerate();
	if(gameArea.keys && gameArea.keys[37]) {gamePiece.speedX -= 1;}
	if(gameArea.keys && gameArea.keys[39]) {gamePiece.speedX += 1;}
	if(gameArea.keys && gameArea.keys[38]) {gamePiece.speedY -= 1;}
	if(gameArea.keys && gameArea.keys[40]) {gamePiece.speedY += 1;}
	gamePiece.newPos();
	updatePieceColor();
	gamePiece.update();
	updatePlayerInfo();
	
}	

function component(width, height, color, x, y)
{
	this.width = width;
    this.height = height;
	this.color = color;
    this.x = x;
    this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.friction = .25;
	this.update = function()
	{
		ctx = gameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	this.newPos = function()
	{
		var xBorder = gameArea.canvas.width-21;
		var yBorder = gameArea.canvas.height-21;
		
		if((this.x <= xBorder) && (this.x >= 1))
		{
			this.x += this.speedX;
		}
		else
		{
			if(this.x > xBorder)
			{
				this.speedX = 0;
				this.x = xBorder;
			}
			else if(this.x < 1)
			{
				this.speedX = 0;
				this.x = 1;
			}
		}
		if((this.y <= yBorder) && (this.y >= 1))
		{
			this.y += this.speedY;
		}
		else
		{
			if(this.y > yBorder)
			{
				this.speedY = 0;
				this.y = yBorder;
			}
			else if(this.y < 1)
			{
				this.speedY = 0;
				this.y = 1;
			}
		}
	};
	this.deccelerate = function()
	{
		if(this.speedX > 0)
		{
			if(this.speedX > 5)
			{
				this.speedX = 5;
			}
			this.speedX -= this.friction;
		}
		else if(this.speedX < 0)
		{
			if(this.speedX < -5)
			{
				this.speedX = -5;
			}
			this.speedX += this.friction;
		}
		
		if(this.speedY > 0)
		{
			if(this.speedY > 5)
			{
				this.speedY = 5;
			}
			this.speedY -= this.friction;
		}
		else if(this.speedY < 0)
		{
			if(this.speedY < -5)
			{
				this.speedY = -5;
			}
			this.speedY += this.friction;
		}
	}
}

var gameArea =
{
	canvas : document.createElement("canvas"),
    start : function() 
	{
        this.canvas.width = 640;
        this.canvas.height = 360;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.internval = setInterval(updateGameArea, 20);
		window.addEventListener("keydown", function(e)
		{
			gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = true;
		})
		window.addEventListener("keyup", function(e)
		{
			gameArea.keys[e.keyCode] = false;
		})
	},
	clear : function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

