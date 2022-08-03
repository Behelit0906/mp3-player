document.addEventListener('DOMContentLoaded', async function(){
    const jsmediatags = window.jsmediatags;
    const playListContainer = document.querySelector('.play-list-container');
    const playList = document.querySelector('.playList');
    const playListButton = document.querySelector('.playlist-icon');
    const list = await load_playlist();


    /* PLAYLIST EVENT */
    playListButton.addEventListener('click', () => {
        playListContainer.classList.toggle('display');
    });

    loadPlayList(playList, list);
    


});


async function load_playlist(){
    const list = await fetch('src/assets/playList/playlist.json').then(e => e.json());
    return list;
}


function loadPlayList(list, data){
    let count = 1;
    data.forEach(element => {
        const p = document.createElement('p');
        p.setAttribute('class','list-item');
        p.textContent = `${count}. ${element.artist} - ${element.title}`;
        list.appendChild(p);
        count++;
    });
}



