let currentSong = null;
let isPlaying = false;
let currentTime = 0;
let duration = 0;

const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');

// Initialize player
document.addEventListener('DOMContentLoaded', () => {
    setupPlayerControls();
});

function setupPlayerControls() {
    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Previous/Next buttons
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });
    
    // Audio player events
    audioPlayer.addEventListener('loadedmetadata', () => {
        duration = audioPlayer.duration;
        durationSpan.textContent = formatTime(duration);
    });
    
    audioPlayer.addEventListener('timeupdate', () => {
        currentTime = audioPlayer.currentTime;
        currentTimeSpan.textContent = formatTime(currentTime);
        
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = progress + '%';
    });
    
    audioPlayer.addEventListener('ended', () => {
        playNext();
    });
    
    // Progress bar click
    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * duration;
        audioPlayer.currentTime = newTime;
    });
}

// Load song in player
window.loadSongInPlayer = function(song) {
    currentSong = song;
    
    // Update UI
    document.getElementById('currentSong').textContent = song.title;
    document.getElementById('currentArtist').textContent = song.artist;
    
    // Load audio
    audioPlayer.src = `${API_BASE_URL}/songs/${song.id}/stream`;
    audioPlayer.load();
    
    // Start visualizer
    if (window.startVisualizer) {
        window.startVisualizer();
    }
};

function togglePlayPause() {
    if (!currentSong) {
        showError('No song selected');
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
        isPlaying = false;
        
        // Stop vinyl animation
        document.querySelector('.vinyl-record').style.animationPlayState = 'paused';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
        isPlaying = true;
        
        // Start vinyl animation
        document.querySelector('.vinyl-record').style.animationPlayState = 'running';
    }
}

function playPrevious() {
    if (!songs || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    
    window.loadSongInPlayer(songs[prevIndex]);
    if (isPlaying) {
        setTimeout(() => audioPlayer.play(), 100);
    }
}

function playNext() {
    if (!songs || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    
    window.loadSongInPlayer(songs[nextIndex]);
    if (isPlaying) {
        setTimeout(() => audioPlayer.play(), 100);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.getElementById('playerPage').classList.contains('active')) {
        e.preventDefault();
        togglePlayPause();
    } else if (e.code === 'ArrowLeft') {
        playPrevious();
    } else if (e.code === 'ArrowRight') {
        playNext();
    }
});