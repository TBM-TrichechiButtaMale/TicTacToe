let peer = new Peer();
let copyPeer = document.querySelector("#copyPeer");
let yourPeer = document.querySelector("#yourPeer");
let peerConnection = document.querySelector('#idPeer2');
let turn = document.querySelector('#turn');
let buttonConnection = document.querySelector('#buttonConnection');

let player1 = false;
let player2 = false;
let isYourTurn = true;
let yourRandomNumber = 0;
let player2Number = 0;

data ={
    number : 0,
    randomNumber : 0,
}

peer.on('open', (id)=>{
    console.log(`L'ID di peer Ã¨: ${id}`);
    yourPeer.value = `${id}`
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
        data.number = 888
        firsTurn();
        conn.send(data)

    })

    conn.on('error', function(err){

    })

 
}



// on open will be launch when you successfully connect to PeerServer


peer.on('connection', function(conn) {
    conn.on('data', function(data){

      tic.forEach((el,i)=>{
        if(data.number == 888){
            player2 =true;
            play();
            player2Number = data.randomNumber
            firsTurn();

        }else if(data.number == 99){
            el.innerHTML = `-`;

        }else {
            if(i==data.number){
                isYourTurn = true;
                turn.innerHTML = "E' il tuo turno";
                el.innerHTML = `<i class="bi bi-x-lg text-danger display-2"></i>`;
            }
        }
      })

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
                }
              })
    })

resetGame.addEventListener('click', ()=>{
    tic.forEach((el)=>{
        el.innerHTML = "-";
        data.number = 99
        conn.send(data)
    })
})



function play(){
    if(player1 && player2){
        gameboard.classList.remove('d-none');
    }
}

copyPeer.addEventListener('click', ()=>{
    let words = yourPeer.value;
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