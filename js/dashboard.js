const API_BASE_URL = 'http://localhost:8080/api';
let currentUser = null;
let songs = [];
let playlists = [];

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = JSON.parse(user);
    document.getElementById('userName').textContent = `Welcome, ${currentUser.username}!`;
    
    loadSongs();
    loadPlaylists();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            showPage(page);
            
            // Update active nav
            document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterSongs(query);
    });
    
    // Upload form
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
    
    // Create playlist button
    document.getElementById('createPlaylistBtn').addEventListener('click', createPlaylist);
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId + 'Page').classList.add('active');
}

// Load songs from API
async function loadSongs() {
    try {
        const response = await fetch(`${API_BASE_URL}/songs`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            songs = await response.json();
            displaySongs(songs);
        }
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

// Display songs in grid
function displaySongs(songsToShow) {
    const container = document.getElementById('songsContainer');
    container.innerHTML = '';
    
    songsToShow.forEach(song => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = `
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <small>${song.album || 'Unknown Album'}</small>
            </div>
            <div class="song-actions">
                <button onclick="playSong(${song.id})" class="play-btn">▶️</button>
                <button onclick="addToFavorites(${song.id})" class="fav-btn">❤️</button>
            </div>
        `;
        container.appendChild(songCard);
    });
}

// Filter songs
function filterSongs(query) {
    const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        (song.album && song.album.toLowerCase().includes(query))
    );
    displaySongs(filtered);
}

// Handle file upload
async function handleUpload(e) {
    e.preventDefault();
    
    const formData = new FormData();
    const audioFile = document.getElementById('audioFile').files[0];
    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('artist').value;
    const album = document.getElementById('album').value;
    const genre = document.getElementById('genre').value;
    
    if (!audioFile) {
        showError('Please select an audio file');
        return;
    }
    
    formData.append('file', audioFile);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('album', album);
    formData.append('genre', genre);
    
    try {
        const response = await fetch(`${API_BASE_URL}/songs/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        
        if (response.ok) {
            showSuccess('Song uploaded successfully!');
            document.getElementById('uploadForm').reset();
            loadSongs();
        } else {
            const error = await response.json();
            showError(error.message || 'Upload failed');
        }
    } catch (error) {
        showError('Network error. Please try again.');
    }
}

// Load playlists
async function loadPlaylists() {
    try {
        const response = await fetch(`${API_BASE_URL}/playlists`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            playlists = await response.json();
            displayPlaylists();
        }
    } catch (error) {
        console.error('Error loading playlists:', error);
    }
}

// Display playlists
function displayPlaylists() {
    const container = document.getElementById('playlistsContainer');
    const allContainer = document.getElementById('allPlaylistsContainer');
    
    [container, allContainer].forEach(cont => {
        if (cont) {
            cont.innerHTML = '';
            playlists.forEach(playlist => {
                const playlistCard = document.createElement('div');
                playlistCard.className = 'playlist-card';
                playlistCard.innerHTML = `
                    <h3>${playlist.name}</h3>
                    <p>${playlist.songCount || 0} songs</p>
                    <div class="playlist-actions">
                        <button onclick="openPlaylist(${playlist.id})">Open</button>
                        <button onclick="deletePlaylist(${playlist.id})">Delete</button>
                    </div>
                `;
                cont.appendChild(playlistCard);
            });
        }
    });
}

// Create new playlist
async function createPlaylist() {
    const name = prompt('Enter playlist name:');
    if (!name) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name })
        });
        
        if (response.ok) {
            showSuccess('Playlist created successfully!');
            loadPlaylists();
        } else {
            const error = await response.json();
            showError(error.message || 'Failed to create playlist');
        }
    } catch (error) {
        showError('Network error. Please try again.');
    }
}

// Play song
function playSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (song) {
        // Switch to player page
        showPage('player');
        document.querySelector('[data-page="player"]').classList.add('active');
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        
        // Load song in player
        window.loadSongInPlayer(song);
    }
}

// Add to favorites
async function addToFavorites(songId) {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/${songId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            showSuccess('Added to favorites!');
        }
    } catch (error) {
        showError('Failed to add to favorites');
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Utility functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4ecdc4;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}