let newGame = document.querySelector('.newGame');
let records = document.getElementsByClassName('primary-button');
let markButton = document.querySelector('.newGame');
let winDisplayButton = document.getElementById('winDisplayButton')
let winDisplayRecords = document.getElementById('winDisplayRecords')
let gridContainer1 = document.querySelector('.card-grid1')
let gridContainer2 = document.querySelector('.card-grid2')
let gridContainer3 = document.querySelector('.card-grid3')
let gridContainer4 = document.querySelector('.card-grid4')

let currentPlayer = 1; 
let player1Card, player2Card, player3Card, player4Card; 
const MAX_NUM = 50; 
let counterShow = document.getElementById('counter');
let points = 0;


newGame.addEventListener('click', () => {
	location.reload()
})

//Store Player Data in LocalStorage
function storePlayerData(player, wins) {
	const existingPlayerData = getPlayerData(player);
  
	if (existingPlayerData) {
	  existingPlayerData.wins ++;
	  localStorage.setItem(player, JSON.stringify(existingPlayerData));
	} else {
	  const playerData = {
		wins: wins++
	  };
	  localStorage.setItem(player, JSON.stringify(playerData));
	}
  }

  //GetPlayerData from LocalStorage
  function getPlayerData(player) {
	const playerData = localStorage.getItem(player);
  
	if (playerData) {
	  return JSON.parse(playerData);
	} else {
	  return null; // Player data not found in local storage
	}
  }



//this is a test
function dataSave() {
    let player1 = document.querySelector('.player1').value;
    let player2 = document.querySelector('.player2').value;
    let player3 = document.querySelector('.player3').value;
    let player4 = document.querySelector('.player4').value;
    let boardSize = parseInt(document.querySelector('.boardSize').value);
  
    if (
      player1 !== '' &&
      player2 !== '' &&
      player3 !== '' &&
      player4 !== '' &&
      boardSize >= 3 &&
      boardSize <= 5
    ) {


      return {
        player1,
        player2,
        player3,
        player4,
        boardSize
      };
    } else {
      alert('Ingrese datos validos');
    }
  }
    

   //boardSize allow us to change the grid depending of the user choice
    function gridSizing(){
        const {player1, player2, player3, player4, boardSize} = dataSave();
        gridContainer1.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gridContainer2.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gridContainer3.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gridContainer4.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    }

    //function to create the bingo cards

function createBingoCard() { 

    const {player1, player2, player3, player4, boardSize} = dataSave();

        let cols = boardSize;
        let rows = boardSize
        //variable that allow us to generate the ramdom number
	    const card = []; 
	    const usedNumbers = new Set(); 

	    while (usedNumbers.size < rows * cols) { 
		    const num = Math .floor(Math.random() * MAX_NUM) + 1; 
		    if (!usedNumbers.has(num)) { 
			    usedNumbers.add(num); 
		    } 
	    } 

	    const numbersArray = Array.from(usedNumbers); 
	    for (let i = 0; i < rows; i++) { 
		    card.push(numbersArray .slice(i * cols, (i + 1) * cols)); 
	} 
    
	return card; 
} 

//function to display the bingo cards

function displayBingoCard(card, containerId) { 
	const container = document.getElementById(containerId); 
	container.innerHTML = ''; 

	for (let i = 0; i < card.length; i++) { 

		for (let j = 0; j < card[i].length; j++) { 
			
			for (let k = 0; k < card[j].length; k++) {
				//aca se accede a cada numero creado
				// console.log(card[i][j])
			}
			const cell = document.createElement('div'); 
			cell.textContent = card[i][j]; 

			if (card[i][j] === 'X') { 
				cell.classList.add('marked'); 
			} 
			container.appendChild(cell);
            gridSizing()

		} 
	}

    

}

    
 //function that allow to mark the number base on the parameter number checking if this existe in the boards

function markNumber(card, number) { 

	for (let i = 0; i < card.length; i++) {
		for (let j = 0; j < card.length; j++) {
			//aca va comparando cada numero de la matriz y al conseguir el que sea igual al numero  para el ciclo
			console.log("----" + card[i][j] + "----") 
			if (card[i][j] === number) { 
				card[i][j] = 'X'; 
				return true; 
			} 
		} 
	} 
	return false; 

} 
	// Check if somebody win

	function checkWin(board) {
		
		let win = false;
	  
		// Check for horizontal win
		for (let row of board) {
		  if (row.every((square) => square === 'X')) {
			win = true;
			points ++;
			break;
		  }
		}
	  
		// Check for vertical win
		for (let col = 0; col < board[0].length; col++) {
		  if (board.every((row) => row[col] === 'X')) {
			win = true;
			points ++;
			break;
		  }
		}
	  
		// Check for diagonal win (left-to-right)
		if (board.every((row, i) => row[i] === 'X')) {
		  win = true;
		  points += 3;
		}
	  
		// Check for diagonal win (right-to-left)
		if (board.every((row, i) => row[board.length - i - 1] === 'X')) {
		  win = true;
		  points += 3;
		}
	  
		return win;
	  } // No win condition found
  

	  winDisplayButton.addEventListener('click', () => {
		location.reload();
	  })


 function randomNumberReset() {

    let counterClick = 25;
    const MAX_NUM = 50;
	let randomNumbers = [];
	let playerWins = 0;
	
	const {player1, player2, player3, player4, boardSize} = dataSave();

	let size = boardSize

    document.getElementById('markButton').disabled = false;

    document.getElementById('markButton').addEventListener('click', () => {



        counterClick--;
        const counterShow = document.getElementById('counter'); 
        counterShow.textContent = counterClick;
        let number;

        do {
            number = Math.floor(Math.random() * MAX_NUM) + 1;
        } while (randomNumbers.includes(number));

		console.log(number)

        randomNumbers.push(number);

		console.log(randomNumbers)


        document.getElementById('ramdomNumberZ').textContent = `${number}`;

		if(counterClick > 1){

			if (number >= 1 && number <= MAX_NUM) {
				markNumber(player1Card, number);
				markNumber(player2Card, number);
				markNumber(player3Card, number);
				markNumber(player4Card, number);
			  
				displayBingoCard(player1Card, 'player1Card');
				displayBingoCard(player2Card, 'player2Card');
				displayBingoCard(player3Card, 'player3Card');
				displayBingoCard(player4Card, 'player4Card');
			  
				if (checkWin(player1Card, size)) {

					playerWins ++;

					document.getElementById('markButton').disabled = true;

					document.getElementById('winDisplayContainer').style.display = 'flex';

					document.getElementById('winDisplayContainer').style.backgroundColor = 'darkorange';

					document.getElementById('winDisplayContainer').style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,1';

					document.getElementById('winDisplay').textContent = player1 + ' ' + 'has won the game!' + ' ' + points + ' ' + 'points';

					storePlayerData(player1, playerWins)

					

					
					winDisplayButton.hidden = false;
					winDisplayRecords.hidden = false;
					

			
				



				
				} else if (checkWin(player2Card, size)) {

					playerWins ++;

					document.getElementById('markButton').disabled = true;

					document.getElementById('winDisplayContainer').style.display = 'flex';

					document.getElementById('winDisplayContainer').style.backgroundColor = 'darkorange';

					document.getElementById('winDisplayContainer').style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,1';

					document.getElementById('winDisplay').textContent = player2 + ' ' + 'has won the game! with' + ' ' + points + ' ' + 'points';

					storePlayerData(player2, playerWins)

					
					
					winDisplayButton.hidden = false;
					winDisplayRecords.hidden = false;
					

				  	



				
				} else if (checkWin(player3Card, size)) {

					playerWins ++;

					document.getElementById('markButton').disabled = true;

					document.getElementById('winDisplayContainer').style.display = 'flex';

					document.getElementById('winDisplayContainer').style.backgroundColor = 'darkorange';

					document.getElementById('winDisplayContainer').style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,1';					

					document.getElementById('winDisplay').textContent = player3 + ' ' + 'has won the game! with' + ' ' + points + ' ' +'points';

					storePlayerData(player3, playerWins)

					
					
					winDisplayButton.hidden = false;
					winDisplayRecords.hidden = false;
					

				  	




				
				} else if (checkWin(player4Card, size)) {

					playerWins ++;

					document.getElementById('markButton').disabled = true;

					document.getElementById('winDisplayContainer').style.display = 'flex';

					document.getElementById('winDisplayContainer').style.backgroundColor = 'darkorange';

					document.getElementById('winDisplayContainer').style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,1';
				  	
				  	document.getElementById('winDisplay').textContent = player4 + ' ' + 'has won the game! with' + ' ' + points + ' ' + 'points';

					storePlayerData(player4, playerWins)

					

					
					winDisplayButton.hidden = false;
					winDisplayRecords.hidden = false;
					

				  	
		
				} 
	
			  }

		}else{


				location.reload(true);


		}
    });

//records table

function createTableWithMostWins() {
	const tableContainer = document.getElementById('recordTableContainer');
	const players = [];
  
	// Retrieve player data from local storage
	for (let i = 0; i < localStorage.length; i++) {
	  const player = localStorage.key(i);
	  const playerData = getPlayerData(player);
	  if (playerData) {
		players.push({
		  player: player,
		  wins: playerData.wins
		});
	  }
	}
  
	// Sort players by wins in descending order
	players.sort((a, b) => b.wins - a.wins);
  
	// Create the table element
	const table = document.createElement('table');
  
	// Create table header row
	const headerRow = document.createElement('tr');
	const headerPlayerCell = document.createElement('th');
	headerPlayerCell.textContent = 'Player';
	const headerWinsCell = document.createElement('th');
	headerWinsCell.textContent = 'Wins';
	headerRow.appendChild(headerPlayerCell);
	headerRow.appendChild(headerWinsCell);
	table.appendChild(headerRow);
  
	// Create table rows for players
	for (const player of players) {
	  const row = document.createElement('tr');
	  const playerCell = document.createElement('td');
	  playerCell.textContent = player.player;
	  const winsCell = document.createElement('td');
	  winsCell.textContent = player.wins.toString();
	  row.appendChild(playerCell);
	  row.appendChild(winsCell);
	  table.appendChild(row);
	}
  
	// Append the table to the table container
	tableContainer.appendChild(table);
  }
  
  // Example usage




}

 //enables game logic


 document 
	.getElementById('startButton') 
	.addEventListener('click', () => { 

        //creating the bingo cards
		player1Card = createBingoCard(); 
		player2Card = createBingoCard(); 
        player3Card = createBingoCard(); 
		player4Card = createBingoCard(); 

        //displaying each bingo card

		displayBingoCard(player1Card, 'player1Card'); 
		displayBingoCard(player2Card, 'player2Card'); 
        displayBingoCard(player3Card, 'player3Card'); 
		displayBingoCard(player4Card, 'player4Card'); 

        document.getElementById('counter').innerHTML = 25
        
        randomNumberReset();



		document 
			.getElementById('startButton') 
			.disabled = true; 
		document 
			.getElementById('resetButton') 
			.disabled = false; 
		document 
			.getElementsByClassName('ramdomNumberContainer') 
			.disabled = false; 
    }); 




	




 //allow us to reset the tables
