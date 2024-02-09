let playButton = document.querySelector('.play-game');

function saveData(){
    let player1 = document.getElementById('player1').value

    let player2 = document.getElementById('player2').value

    let player3 = document.getElementById('player3').value

    let player4 = document.getElementById('player4').value

    let boardSize = parseInt(document.getElementById('boardSize').value)

    if(player1 != String && player2 != String && player3 != String && player4 != String && boardSize >= 3 && boardSize <= 5){
        let rows = boardSize;
        let cols = boardSize;




    }else{
        console.log('los datos ingresado no son validos. Ingrese datos correctos')
    }

    function gridConstruction(){
        const card = [];
        const usedNumbers = new Set();
            while(usedNumbers.size < rows*cols){
                const num = Math.floor(Math.random()*50)+1;
                if(!usedNumbers.has(num)){ //bool indicando que si el elemenento existe o no
                    usedNumbers.add(num);
                }
            }

            const numbersInArray = Array.from(usedNumbers);
            for (let i = 0; i < rows; i++) {
                card.push(numbersInArray.slice(i*cols, (i+i)*cols))
                
            }

            return card;
    }

    function showBingoCard(card, containerid){
        const container = document.querySelector('.bingo-boards-container');
        container.innerHTML = "";
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.textContent = card[i][j];
                if (card[i][j] === 'X'){
                    cell.classList.add('marked');
                }

                container.appendChild(cell);
                
            }
            
        }
    }

    function markNumber(card, number){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if(card[i][j] === number){
                    card[i][j] = 'X';
                    return true;
                }
                
            }
            
        }
        return false;
    }

    function winner(card){

        //Check rows and columns

        for (let i = 0; i < rows; i++) {
            let rowFilled = true;
            let coluFilled = true;
            for (let j = 0; j < cols; j++) {
                if(card[i][j] !== 'X'){
                    rowFilled = false;
                }
                if(card[i][j] !== 'X'){
                    coluFilled = false;
                }
                
            }
            if (rowFilled || coluFilled){
                return true;
            }
            
        }

        //Check diagonals

        let diagonal11Filled = true;
        let diagonal12Filled = true;
        for (let i = 0; i < rows; i++) {
            if(card[i][j] !== 'X'){
                diagonal11Filled = false;
            }
            if(card[i][cols -1 - i]!== 'X'){
                diagonal12Filled = false;
            }
            
        }

        if(diagonal11Filled || diagonal12Filled){
            return true;
        }
        return false;
    }

}

playButton.addEventListener('click', saveData)
