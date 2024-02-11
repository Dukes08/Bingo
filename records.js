function getPlayerData(player) {
	const playerData = localStorage.getItem(player);
  
	if (playerData) {
	  return JSON.parse(playerData);
	} else {
	  return null; // Player data not found in local storage
	}
  }

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

  createTableWithMostWins();

  

