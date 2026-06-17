const musicFiles = [
  'assets/music/song1.mp3',
  'assets/music/song2.mp3',
  'assets/music/song3.mp3',
  'assets/music/song4.mp3',
  'assets/music/song5.mp3',
  'assets/music/song6.mp3',
];

let currentSongIndex = 0;

function playNextSong() {
  const audio = document.getElementById('bg-music');

  currentSongIndex = (currentSongIndex + 1) % musicFiles.length;

  audio.src = musicFiles[currentSongIndex];
  audio.play().catch((e) => console.log('Wiedergabe fehlgeschlagen:', e));
}

function handleMusicChoice(shouldPlay) {
  const audio = document.getElementById('bg-music');
  const popup = document.getElementById('music-popup-overlay');

  if (shouldPlay) {
    audio.src = musicFiles[currentSongIndex];
    audio.play().catch((e) => console.log('Wiedergabe fehlgeschlagen:', e));

    audio.addEventListener('ended', playNextSong);
  }

  popup.style.display = 'none';
}

export function initMusic() {
  const allowBtn = document
    .getElementById('music-popup-overlay')
    .querySelector('#music-allow-btn');
  const denyBtn = document
    .getElementById('music-popup-overlay')
    .querySelector('#music-deny-btn');

  if (allowBtn)
    allowBtn.addEventListener('click', () => handleMusicChoice(true));
  if (denyBtn)
    denyBtn.addEventListener('click', () => handleMusicChoice(false));
}
