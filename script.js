const music = new Audio('./asset/audio/Akhiyaan Gulaab Teri Baaton Mein Aisa Uljha Jiya.mp3')
// music.play();

const songs = [
    {
        id : '1',
        songName : `Needhe Needhe <br>
        <p id="artist">Aavani Malhar</p>`
    },
    {
        id : '2',
        songName : `Akhiyaan Gulaab <br>
        <p id="artist">Mitraz</p>`
    },
    {
        id : '3',
        songName : `Pushpa Pushpa <br>
        <p id="artist">Nakash Aziz</p>`
    },
    {
        id : '4',
        songName : `Samayama <br>
        <p id="artist">Anurag Kulkarni</p>`
    },
    {
        id : '5',
        songName : `Tabar Brothers Unite <br>
        <p id="artist">Harshavardhan Rameshwar</p>`
    },
    {
        id : '6',
        songName : `Ticket Eh Konakunda <br>
        <p id="artist">Ram Miriyala, Kasarlya Shyam</p>`
    },
    {
        id : '7',
        songName : `Thum Se <br>
        <p id="artist">Sachin-Jigar, Raghav Chaitanya</p>`
    },
    {
        id : '8',
        songName : `Ve Kamleya <br>
        <p id="artist">Pritam, Arijit Singh</p>`
    },
]

Array.from(document.getElementsByClassName('createPlaylist')).forEach((element, i)=>{
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');

masterPlay.addEventListener("click", ()=>{
    if(music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }
    else {
        music.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playbutton')).forEach((element) => {
            element.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
        })
}

let index = 0;
let title = document.getElementById('titletrack');
Array.from(document.getElementsByClassName('playbutton')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        music.src = `./asset/audio/${index}.mp3`;
        music.play();

        let song_title = songs.filter(ele => {
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        music.addEventListener('ended', () =>{
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        })
    })
})

let currentStart = document.querySelector('.currentStart');
let currentEnd = document.querySelector('.currentEnd');
let seek = document.querySelector('#seek');
let bar2 = document.querySelector('#bar2');
let dot = document.getElementsByClassName('dot')[1];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec < 10){
        sec = `0${sec}`
    }
    currentEnd.innerHTML = `${min} : ${sec}`

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1 < 10){
        sec1 = `0${sec1}`
    }
    currentStart.innerHTML = `${min1} : ${sec1}`

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})

music.addEventListener('ended', () => {
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let volDot = document.getElementById('volDot');
let volBar = document.getElementsByClassName('volBar')[0];

vol.addEventListener('change', () => {
    if(vol.value == 0){
        vol_icon.classList.add('fa-volume-xmark');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.remove('fa-volume-high')
    }
    if(vol.value > 0){
        vol_icon.classList.remove('fa-volume-xmark');
        vol_icon.classList.add('fa-volume-low');
        vol_icon.classList.remove('fa-volume-high')
    }
    if(vol.value > 50){
        vol_icon.classList.remove('fa-volume-xmark');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.add('fa-volume-high')
    }
    
    let vol_control = vol.value;
    volBar.style.width = `${vol_control}%`;
    volDot.style.left = `${vol_control}%`;
    music.volume = vol_control/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('createPlaylist')).length;
    }
    music.src = `./asset/audio/${index}.mp3`;
    music.play();
    let song_title = songs.filter(ele => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');
})

next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('createPlaylist')).length){
        index = 1;
    }
    music.src = `./asset/audio/${index}.mp3`;
    music.play();
    let song_title = songs.filter(ele => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();
    
    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');
})