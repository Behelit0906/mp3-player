var list = [];
var listCopy = [];
const audio = document.querySelector('audio');
const previousButton = document.querySelector('#previous');
const playButton = document.querySelector('#play');
const nextButton = document.querySelector('#next');
const playListContainer = document.querySelector('.play-list-container');
const playList = document.querySelector('.playList');
const playListButton = document.querySelector('.playlist-icon');
const shuffleButton = document.querySelector('.shuffle');
const songName = document.querySelector('.song-name');
const songAutor = document.querySelector('.song-autor');
const cover = document.querySelector('.cover');
const durationLabel = document.querySelector('.duration');
const currentTime = document.querySelector('.current-time');
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
    endedSong();
    elapseTime();


    /*  loading playList */
    loadPlayList();
    

    /*  PREPARING SONG */
    audio.setAttribute('src',`src/assets/songs/${list[song].fileName}`);
    loadSongData();
    setDuration();


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
    playButton.setAttribute("src","src/assets/icons/pause.svg");
    loadSongData();
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
    }
    else{
        song = 0;
    }
    changeSong();
    audio.play();
}

function previousSong(){
    if(song > 0){
        song--;
    }
    else{
        song = list.length - 1;
    }

    changeSong();
    audio.play();
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
    song = -1;
}

function loadSongData(){
    songName.textContent = list[song].title;
    songAutor.textContent = list[song].artist;
    cover.setAttribute('src', `src/assets/covers/${list[song].cover}`);
}

function endedSong(){
    audio.addEventListener('ended', () => {
        nextSong();
    });
}

function setDuration(){
    audio.addEventListener('loadeddata', () => {
        let duration = audio.duration;
        let min = '';
        let seg = Math.floor(duration%60);
        let temp = duration / 60;
        if(temp <= 9){
            min = `0${Math.floor(temp)}:` 
        }
        else{
            min = `${Math.floor(temp)}:`;
        }
        if(seg <= 9){
            seg = `0:${seg}`;
        }
        durationLabel.textContent = `${min}${seg}`
    });
}

function elapseTime(){
    let min = 0;
    let minString = '00:';
    let seg = 0;
    let segString = '00';
    let time = 0;
    audio.addEventListener('timeupdate', () => {
        time = Math.floor(audio.currentTime);
        min = Math.floor(time / 60);
        seg = time - (min*60);
        if(seg == 60){
            seg = 0;
        }

        switch(true){
            case min < 10:
                minString = `0${min}:`;
                break;
            case min > 9:
                minString = `${min}:`;
                break;
        }

        switch(true){
            case seg < 10:
                segString = `0${seg}`;
                break;
            case seg > 9:
                segString = seg;
        }

        currentTime.textContent = `${minString}${segString}`;

    });
}




