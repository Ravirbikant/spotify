// Initializing
let songIndex = 1;
const song = new Audio("1.mp3");
const btn = document.getElementById("btn");
const progressBar = document.getElementById("progressBar");
const songItems = Array.from(document.querySelectorAll(".song-items"));
const masterBtn = document.getElementById("masterBtn");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
const songName = document.getElementById("name");
const duration = document.getElementById("duration");
const container = document.getElementById("container");
let gif = document.getElementById("gif");

//Initializing song array
songs = [
  {
    name: "Deva Deva",
    duration: "4:39",
  },
  {
    name: "Tum se hi",
    duration: "5:23",
  },
  {
    name: "All izz Well",
    duration: "4:41",
  },
  {
    name: "Deva Shree Ganesha",
    duration: "5:56",
  },
  {
    name: "Dhoom Again",
    duration: "5:02",
  },
  {
    name: "Natu Natu",
    duration: "3:34",
  },
  {
    name: "Pyar hota kai bar hai",
    duration: "3:03",
  },
  {
    name: "Chammak Challo",
    duration: "3:46",
  },
  {
    name: "Bijlee Bijlee",
    duration: "2:48",
  },
];

function playSong(index) {
  song.play();
  songItems[index - 1].classList.remove("fa-play");
  songItems[index - 1].classList.add("switchColor");
  masterBtn.classList.remove("fa-play");
  songItems[index - 1].classList.add("fa-pause");
  masterBtn.classList.add("fa-pause");
  showSong(songIndex);
  gif.style.opacity = 1;
}

function pauseSong(index) {
  song.pause();
  songItems[index - 1].classList.remove("fa-pause");
  masterBtn.classList.remove("fa-pause");
  songItems[index - 1].classList.add("fa-play");
  masterBtn.classList.add("fa-play");
  showSong(songIndex);
  gif.style.opacity = 0;
}

//Toggle play/pause
var isPlaying = false;
song.onplaying = function () {
  isPlaying = true;
};
song.onpause = function () {
  isPlaying = false;
};
btn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong(songIndex);
  } else {
    playSong(songIndex);
  }
});

//Linking Progressbar and song
song.addEventListener("timeupdate", () => {
  progressBar.value = (song.currentTime / song.duration) * 100;
});
progressBar.addEventListener("change", () => {
  song.currentTime = parseInt((progressBar.value * song.duration) / 100);
});

// Making song play from small button on song
songItems.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === songIndex) {
      if (isPlaying) {
        pauseSong(songIndex);
      } else {
        playSong(songIndex);
      }
    } else {
      updateAllPlays();
      songIndex = element.id;
      song.src = `${songIndex}.mp3`;
      playSong(songIndex);
    }
  });
});

//Remove pause sign
function updateAllPlays() {
  songItems.forEach((e) => {
    e.classList.remove("fa-pause");
    e.classList.remove("switchColor");
    e.classList.add("fa-play");
  });
}

//Forward, Backward, Restart buttons
backward.addEventListener("click", () => {
  if (songIndex === 1) {
    songIndex = songItems.length;
  } else {
    songIndex--;
  }
  updateAllPlays();
  song.src = `${songIndex}.mp3`;
  playSong(songIndex);
});

forward.addEventListener("click", () => {
  if (songIndex === songItems.length) {
    songIndex = 1;
  } else {
    songIndex++;
  }
  updateAllPlays();
  song.src = `${songIndex}.mp3`;
  playSong(songIndex);
});

restart.addEventListener("click", () => {
  song.currentTime = 0;
  playSong(songIndex);
});

//Showing song name and duration
function showSong(index) {
  songName.innerText = songs[index - 1].name;
  duration.innerText = songs[index - 1].duration;
  container.style.backgroundImage = `url(${index}.jpg)`;
}
