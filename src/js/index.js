let list = '';
const audio = document.querySelector('audio');
const jsmediatags = window.jsmediatags;
const previousButton = document.querySelector('#previous');
const playButton = document.querySelector('#play');
const nextButton = document.querySelector('#next');
const playListContainer = document.querySelector('.play-list-container');
const playList = document.querySelector('.playList');
const playListButton = document.querySelector('.playlist-icon');
let song = 0;


document.addEventListener('DOMContentLoaded', async function(){
    list = await load_playlist();
    song = Math.floor(Math.random()*list.length);


    /* PLAYLIST EVENT */
    playListButton.addEventListener('click', () => {
        playListContainer.classList.toggle('display');
    });

    /*  loading playList */
    loadPlayList();
    

    /*  PREPARING SONG */
    audio.setAttribute('src',`src/assets/songs/${list[song].file}`);


    /* CONTROL EVENTS */
    play();
    
});


async function load_playlist(){
    const list = await fetch('src/assets/playList/playlist.json').then(e => e.json());
    return list;
}


function loadPlayList(){
    let count = 1;
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


function play(){
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

function selectSong(li){
    li.addEventListener('click', () => {
        song = li.dataset.num;
        audio.setAttribute('src',`src/assets/songs/${list[song].file}`);
        audio.play();
        playButton.setAttribute("src","src/assets/icons/pause.svg");
    });
}


