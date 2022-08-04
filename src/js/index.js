var list = [];
var listCopy = [];
const audio = document.querySelector('audio');
const jsmediatags = window.jsmediatags;
const previousButton = document.querySelector('#previous');
const playButton = document.querySelector('#play');
const nextButton = document.querySelector('#next');
const playListContainer = document.querySelector('.play-list-container');
const playList = document.querySelector('.playList');
const playListButton = document.querySelector('.playlist-icon');
const shuffleButton = document.querySelector('.shuffle');
var song = 0;
var isShuffle = false;


document.addEventListener('DOMContentLoaded', async function(){
    /* CARGO LA LISTA DE CANCIONES Y HAGO UNA COPIA */ 
    list = await load_playlist();
    listCopy = list.map((item) => {
        return item;
    });

    /*  SELECCIONO UNA CANCIÓN DE FORMA ALEATORIA PARA EMPEZAR  */
    song = Math.floor(Math.random()*list.length);


    /* PLAYLIST EVENT */
    playListButton.addEventListener('click', () => {
        playListContainer.classList.toggle('display');
    });

    /*  loading playList */
    loadPlayList();
    

    /*  PREPARING SONG */
    audio.setAttribute('src',`src/assets/songs/${list[song].fileName}`);


    /* CONTROL EVENTS */
    playEvent();
    previousButton.addEventListener('click', previousSong);
    nextButton.addEventListener('click', nextSong);

    shuffleButton.addEventListener('click', () => {
        shuffleButton.classList.toggle('active');
        shuffle();
    });
    
});


async function load_playlist(){
    const list = await fetch('src/assets/playList/playlist.json').then(e => e.json());
    return list;
}


function loadPlayList(){
    let count = 1;
    playList.innerHTML = '';
    list.forEach(element => {
        const li = document.createElement('li');
        li.setAttribute('class','list-item');
        li.setAttribute('data-num', count-1);
        li.textContent = `${count}. ${element.artist} - ${element.title}`;
        selectSong(li);
        playList.appendChild(li);
        count++;
    });
}


function playEvent(){
    let root = 'src/assets/icons/';
    playButton.addEventListener('click', ()=>{
        if(audio.paused){
            audio.play();
            playButton.setAttribute("src",root+"pause.svg");
        }
        else{
            audio.pause();
            playButton.setAttribute("src",root+"play_arrow.svg");
        }
    });

}

function changeSong(){
    route = `src/assets/songs/${list[song].fileName}`;
    audio.setAttribute('src',route);
}

function selectSong(li){
    li.addEventListener('click', () => {
        song = li.dataset.num;
        changeSong();
        audio.play();
        playButton.setAttribute("src","src/assets/icons/pause.svg");
    });
}

function nextSong(){
    if(song < list.length -1){
        song++;
        changeSong();
        audio.play();
    }
}

function previousSong(){
    if(song > 0){
        song--;
        changeSong();
        audio.play();
    }
}

function shuffle(){
    if(!isShuffle){
        list.sort(function() {return Math.random() - 0.5});
        isShuffle = true;   
    }
    else{
        list = listCopy.map((item) => {
            return item;
        });
        isShuffle = false;
    }
    loadPlayList();
    song = 0;
}

function loadSongData(){
    
}


