window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	// variáveis
	snake = [];
	positionX = 10;
	positionY = 10;
	foodX = 15;
	foodY = 15;
	velX = 0;
	velY = 0;
	grid = 20;
	tam = 5; // Parte A.3 - Alterado o tamanho inicial da cobrinha
	pontuacao = 0; // Parte B.2 - Variável para armazenar a pontuação
	timer = 60; // Parte B.1 - Timer decrescente iniciado com 60 segundos

	// Chamada da função jogo a cada 80 milisegundos
	setInterval(jogo, 80); // Parte A.2 - Alterada a velocidade do jogo

	setInterval(function(){
		if(timer > 0){
			timer--; // Parte B.1 - Timer decrescente
		}
	}, 1000);

	// Controles
	document.addEventListener("keydown",function(e){
		switch(e.keyCode){
			case 39:
				velX = 1;
				velY = 0;
				break;
			case 37:
				velX = -1;
				velY = 0;
				break;
			case 38:
				velY = -1;
				velX = 0;
				break;
			case 40:
				velY = 1;
				velX = 0;
				break;
		}
	});
}

function jogo(){
	// Configuração da tela
	ctx.fillStyle = "#1E1E2F"; // Parte A.1 - Alterada a cor do fundo
	ctx.fillRect(0,0, canvas.width, canvas.height);

	// HUD
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "16px Arial";
	ctx.fillText("Tempo: " + timer, 10, 20); // Parte B.1 - Exibição do timer decrescente
	ctx.fillText("Pontos: " + pontuacao, 300, 20); // Parte B.2 - Exibição da pontuação

	// deslocamento da cobra
	positionX += velX;
	positionY += velY;

	// Espelhamento
	if(positionX < 0){
		positionX = grid;
	}
	if(positionX > grid){
		positionX = 0;
	}
	if(positionY < 0){
		positionY = grid;
	}
	if(positionY > grid){
		positionY = 0;
	}

	// Configuração da cobra
	ctx.fillStyle = "#7CFC00"; // Parte A.1 - Alterada a cor da cobrinha
	for(let i=0; i < snake.length; i++){
		ctx.fillRect(snake[i].x*grid, snake[i].y*grid, grid-1, grid-1);
		if(snake[i].x == positionX && snake[i].y == positionY){
			tam = 5; // Parte A.3 - Mantém o novo tamanho inicial após colisão
		}
	}
	
	// Posicionando a cobra
	snake.push({x: positionX, y: positionY});

	// Apagando
	while(snake.length > tam){
		snake.shift();
	}

	// Configurando a comida
	//ctx.font = "24px Arial"; // Parte A.5 - Alterado o tamanho da comida
	//ctx.fillText("🍎", foodX*grid, foodY*grid + grid); // Parte A.6 - Comida alterada para emotion de maçã
	// Se der erro use as duas linhas abaixo
	//ctx.font = "24px 'Segoe UI Emoji'";
	//ctx.fillText("🍎", foodX*grid, foodY*grid + grid);
	//Terceira opção para todos os S.O
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(foodX*grid + 10, foodY*grid + 10, 8, 0, Math.PI * 2);
	ctx.fill();
	
	// Comendo a comida
	if(positionX == foodX && positionY == foodY){
		tam += 2; // Parte A.4 - Cobrinha aumenta de dois em dois ao comer
		pontuacao++; // Parte B.2 - Adiciona pontuação quando a cobrinha come a maçã
		foodX = Math.floor(Math.random()*grid);
		foodY = Math.floor(Math.random()*grid);
	}
}