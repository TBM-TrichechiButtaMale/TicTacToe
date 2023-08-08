let peer = new Peer();
let copyPeer = document.querySelector("#copyPeer");
let yourPeer = document.querySelector("#yourPeer");
let peerConnection = document.querySelector('#idPeer2');
let turn = document.querySelector('#turn');
let buttonConnection = document.querySelector('#buttonConnection');
let winnerBox = document.querySelector('#winner');

let player1 = false;
let player2 = false;
let isYourTurn = true;
let yourRandomNumber = 0;
let player2Number = 0;
let circle = `<i class="bi bi-circle text-danger display-2"></i>`;
let cross = `<i class="bi bi-x-lg text-danger display-2"></i>`;

let data ={
    number : 0,
    randomNumber : 0,
}

peer.on('open', (id)=>{
    console.log(`L'ID di peer Ã¨: ${id}`);
    yourPeer.innerHTML = `${id}`
});


let conn;

function testConnection(){

    let idPeer = peerConnection.value;

    conn = peer.connect(idPeer);

    conn.on('open', function(){
        console.log('connesso!');
        player1 = true
        play();
        yourRandomNumber = randomN();
        data.randomNumber = yourRandomNumber
        firsTurn();
        data.number = 888
        conn.send(data)

    })

    conn.on('error', function(err){

    })

 
}



// on open will be launch when you successfully connect to PeerServer


peer.on('connection', function(conn) {
    conn.on('data', function(data){

      
        if(data.number == 888){
            player2 =true;
            play();
            player2Number = data.randomNumber
            firsTurn();

        }else if(data.number == 99){
            tic.forEach((el,i)=>{
                el.innerHTML = `-`;
            })
            yourRandomNumber = randomN();
            player2Number = data.randomNumber
            firsTurn();
            if(player2Number != 0){
                data.randomNumber = yourRandomNumber
                data.number = 98
                conn.send(data)
            }
            
        } else if(data.number == 98){
            player2Number = data.randomNumber
            firsTurn();
        }else {
            tic.forEach((el,i)=>{
                if(i==data.number){
                    isYourTurn = true;
                    turn.innerHTML = "E' il tuo turno";
                    el.innerHTML = `<i class="bi bi-x-lg text-danger display-2"></i>`;
                    winner();
                }
            })
        }

    });
  });

    
    
let tic = document.querySelectorAll(".tic");
let resetGame = document.querySelector("#resetGame");
let gameboard = document.querySelector("#gameboard");



    tic.forEach((el,i)=>{

        el.addEventListener('click', ()=>{
                if(isYourTurn == true && el.innerHTML == "-"){
                    isYourTurn = false;
                    el.innerHTML = `<i class="bi bi-circle text-danger display-2"></i>`;
                    data.number = i
                    turn.innerHTML = "E' il turno del tuo avversario"
                    conn.send(data);
                    winner();
                }
            })
    })

resetGame.addEventListener('click', ()=>{
    tic.forEach((el)=>{
        el.innerHTML = "-";
        player2Number = 0;
        yourRandomNumber = randomN();
        data.randomNumber = yourRandomNumber
        data.number = 99
        conn.send(data)
    })
    winnerBox.classList.add("d-none")
})



function play(){
    if(player1 && player2){
        gameboard.classList.remove('d-none');
    }
}

copyPeer.addEventListener('click', ()=>{
    let words = yourPeer.innerHTML;
    navigator.clipboard.writeText(words)
    .then(() => {
      // Se l'operazione di copia è riuscita, mostra un feedback visivo all'utente
      console.log('Testo copiato con successo!');
    })
    .catch((err) => {
      // Se l'operazione di copia ha avuto un errore, gestiscilo qui
      console.error('Errore durante la copia del testo: ', err);
    });
})

buttonConnection.addEventListener('click', ()=>{
    testConnection();
    peerConnection.value= "";  
})

function randomN (){
    return Math.random()* (1000-1)+1
}

function firsTurn(){
    if(yourRandomNumber > 0 && player2Number > 0){
        if (yourRandomNumber > player2Number) {
            turn.innerHTML = "E' il tuo turno"
        } else {
            turn.innerHTML = "E' il turno del tuo avversario"
            isYourTurn = false
        }
    }
}

function winner() {
    if( (tic[0].innerHTML == circle && tic[1].innerHTML == circle && tic[2].innerHTML == circle)  ||  (tic[3].innerHTML == circle && tic[4].innerHTML == circle && tic[5].innerHTML == circle) || (tic[6].innerHTML == circle && tic[7].innerHTML == circle && tic[8].innerHTML == circle) || (tic[0].innerHTML == circle && tic[3].innerHTML == circle && tic[6].innerHTML == circle) || (tic[1].innerHTML == circle && tic[4].innerHTML == circle && tic[7].innerHTML == circle) || (tic[2].innerHTML == circle && tic[5].innerHTML == circle && tic[8].innerHTML == circle) || (tic[0].innerHTML == circle && tic[4].innerHTML == circle && tic[8].innerHTML == circle) || (tic[2].innerHTML == circle && tic[4].innerHTML == circle && tic[6].innerHTML == circle) ){

        winnerBox.innerHTML ="HAI VINTO"
        winnerBox.classList.remove("d-none")

    } else if( (tic[0].innerHTML == cross && tic[1].innerHTML == cross && tic[2].innerHTML == cross)  ||  (tic[3].innerHTML == cross && tic[4].innerHTML == cross && tic[5].innerHTML == cross) || (tic[6].innerHTML == cross && tic[7].innerHTML == cross && tic[8].innerHTML == cross) || (tic[0].innerHTML == cross && tic[3].innerHTML == cross && tic[6].innerHTML == cross) || (tic[1].innerHTML == cross && tic[4].innerHTML == cross && tic[7].innerHTML == cross) || (tic[2].innerHTML == cross && tic[5].innerHTML == cross && tic[8].innerHTML == cross) || (tic[0].innerHTML == cross && tic[4].innerHTML == cross && tic[8].innerHTML == cross) || (tic[2].innerHTML == cross && tic[4].innerHTML == cross && tic[6].innerHTML == cross) ){

        winnerBox.innerHTML ="HAI PERSO"
        winnerBox.classList.remove("d-none")

    }
}