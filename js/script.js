// FUNZIONE PER GENERARE UN NUMERO CASUALE DEL PC PER LE BOMBE
function GenerateUniqueRandomNumber(array_bombs){
    let check_number_bombs = false;
    let randomInt;

    // CICLO CHE MI PERMETTE DI DETERMINARE SE UN NUMERO E' UGUALE A QUELLO GIA' ESTRATTO NON LO INSERISCE, ALTRIMENTI VIENE AGGIUNTO
    while(!check_number_bombs){
        randomInt = Math.floor(Math.random() * 100 + 1)

        if (!array_bombs.includes(randomInt)){
            check_number_bombs = true;
        }
    }

    return randomInt;
}


// FUNZIONE CHE MI GENERA LE BOMBE
function GenerateBombList (number_of_bombs){
    let bombs = [];

    // CICLO PER INSERIRE UN NUMERO CASUALE ALL'INTERNO DELL'ARRAY BOMBS
    for (let i=0; i<number_of_bombs; i++){
        bombs.push(GenerateUniqueRandomNumber(bombs));
    }

    return bombs;
}


// FUNZIONE CHE CREA LA SINGOLA CASELLA DELLA GRIGLIA
function createCell(num) {
    const element = document.createElement("div");
    element.classList.add("square");

    element.innerText = num;

    return element;
}


// RECUPERO L'ELEMENTO CHE CONTIENE LA GRIGLIA
const grid = document.getElementById("grid");


// FUNZIONE CHE CONSENTE AL CLICK SUL BOTTONE PLAY DI FAR COMPARIRE LA GRIGLIA DI GIOCO
function createNewGame() {
    document.getElementById("grid").innerHTML = "";
    const NUMBER_OF_BOMBS = 16;
    const bombs = GenerateBombList(NUMBER_OF_BOMBS);
    let points = 0;

    // ESEGUO UN FOR
    for (let i = 0; i < 100; i++) {
        // CREO LA CELLA
        let square = createCell(i + 1);

        square.addEventListener("click", function(){
            if(!bombs.includes(i)){
                this.classList.add("clicked");
                points++;

                document.getElementById("score").innerText = `Il tuo punteggi è pari a: ${points} punti`
            }
            else{
                this.classList.add("bg-danger");
                alert("Hai perso, hai calpestato una bomba e sei esploso! Il gioco verrà riavviato.");
                grid.innerHTML = "";
                score.innerText = "";
            }
        })

        // APPENDO LA CELLA ALLA GRIGLIA
        grid.appendChild(square);
    }

}


// CREO EVENTO IN ASCOLTO CHE CONSENTE DI CLICCARE IL BOTTONE E FAR PARTIRE IL GIOCO
document.getElementById("play").addEventListener("click", function () {
    createNewGame();
})