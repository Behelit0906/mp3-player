document.addEventListener('DOMContentLoaded', function(){
    const playList = document.querySelector('.play-list');
    const playListButton = document.querySelector('.playlist-icon');
    

    /* PLAYLIST EVENT */
    playListButton.addEventListener('click', () => {
        playList.classList.toggle('display');
        console.log('Hola');
    });

});



