// User Playlists and Favorites System
class UserPlaylistManager {
    constructor() {
        this.favorites = this.loadFavorites();
        this.userPlaylists = this.loadUserPlaylists();
        this.initializeUI();
    }

    // Load favorites from localStorage
    loadFavorites() {
        const saved = localStorage.getItem('spotifai_favorites');
        return saved ? JSON.parse(saved) : [];
    }

    // Save favorites to localStorage
    saveFavorites() {
        localStorage.setItem('spotifai_favorites', JSON.stringify(this.favorites));
    }

    // Load user playlists from localStorage
    loadUserPlaylists() {
        const saved = localStorage.getItem('spotifai_user_playlists');
        return saved ? JSON.parse(saved) : [];
    }

    // Save user playlists to localStorage
    saveUserPlaylists() {
        localStorage.setItem('spotifai_user_playlists', JSON.stringify(this.userPlaylists));
    }

    // Add song to favorites
    addToFavorites(songTitle, songFile, folder) {
        const favorite = {
            id: Date.now().toString(),
            title: songTitle,
            file: songFile,
            folder: folder,
            addedAt: new Date().toISOString()
        };

        if (!this.isFavorite(songTitle)) {
            this.favorites.push(favorite);
            this.saveFavorites();
            this.updateFavoritesUI();
            this.showNotification(`❤️ "${songTitle}" added to favorites!`);
            return true;
        }
        return false;
    }

    // Remove song from favorites
    removeFromFavorites(songTitle) {
        const initialLength = this.favorites.length;
        this.favorites = this.favorites.filter(fav => fav.title !== songTitle);
        
        if (this.favorites.length < initialLength) {
            this.saveFavorites();
            this.updateFavoritesUI();
            this.showNotification(`💔 "${songTitle}" removed from favorites`);
            return true;
        }
        return false;
    }

    // Check if song is in favorites
    isFavorite(songTitle) {
        return this.favorites.some(fav => fav.title === songTitle);
    }

    // Toggle favorite status
    toggleFavorite(songTitle, songFile, folder) {
        if (this.isFavorite(songTitle)) {
            return this.removeFromFavorites(songTitle);
        } else {
            return this.addToFavorites(songTitle, songFile, folder);
        }
    }

    // Create new user playlist
    createPlaylist(name, description = '') {
        const playlist = {
            id: Date.now().toString(),
            title: name,
            description: description,
            songs: [],
            createdAt: new Date().toISOString(),
            isUserCreated: true
        };

        this.userPlaylists.push(playlist);
        this.saveUserPlaylists();
        this.updatePlaylistsUI();
        this.showNotification(`🎵 Playlist "${name}" created!`);
        return playlist;
    }

    // Add song to user playlist
    addSongToPlaylist(playlistId, songTitle, songFile, folder) {
        const playlist = this.userPlaylists.find(p => p.id === playlistId);
        if (!playlist) return false;

        const song = {
            id: Date.now().toString(),
            title: songTitle,
            file: songFile,
            folder: folder,
            addedAt: new Date().toISOString()
        };

        // Check if song already exists in playlist
        if (!playlist.songs.some(s => s.title === songTitle)) {
            playlist.songs.push(song);
            this.saveUserPlaylists();
            this.updatePlaylistsUI();
            this.showNotification(`📝 "${songTitle}" added to "${playlist.title}"!`);
            return true;
        }
        
        this.showNotification(`⚠️ "${songTitle}" already in "${playlist.title}"`);
        return false;
    }

    // Remove song from user playlist
    removeSongFromPlaylist(playlistId, songTitle) {
        const playlist = this.userPlaylists.find(p => p.id === playlistId);
        if (!playlist) return false;

        const initialLength = playlist.songs.length;
        playlist.songs = playlist.songs.filter(song => song.title !== songTitle);
        
        if (playlist.songs.length < initialLength) {
            this.saveUserPlaylists();
            this.updatePlaylistsUI();
            this.showNotification(`🗑️ "${songTitle}" removed from "${playlist.title}"`);
            return true;
        }
        return false;
    }

    // Delete user playlist
    deletePlaylist(playlistId) {
        const playlist = this.userPlaylists.find(p => p.id === playlistId);
        if (!playlist) return false;

        this.userPlaylists = this.userPlaylists.filter(p => p.id !== playlistId);
        this.saveUserPlaylists();
        this.updatePlaylistsUI();
        this.showNotification(`🗑️ Playlist "${playlist.title}" deleted`);
        return true;
    }

    // Initialize UI elements
    initializeUI() {
        this.createFavoritesSection();
        this.createUserPlaylistsSection();
        this.updateFavoritesUI();
        this.updatePlaylistsUI();
    }

    // Create favorites section in the sidebar
    createFavoritesSection() {
        const sidebar = document.querySelector('.left ul');
        if (!sidebar) return;

        const favoritesItem = document.createElement('li');
        favoritesItem.innerHTML = `
            <div class="favorites-section">
                <img class="invert" src="/assets/images/svgs/heart.svg" alt="heart">
                <span>Liked Songs</span>
                <span class="favorites-count">(${this.favorites.length})</span>
            </div>
        `;
        favoritesItem.style.cursor = 'pointer';
        favoritesItem.addEventListener('click', () => this.showFavorites());
        
        sidebar.appendChild(favoritesItem);
    }

    // Create user playlists section in the sidebar
    createUserPlaylistsSection() {
        const sidebar = document.querySelector('.left ul');
        if (!sidebar) return;

        const playlistsSection = document.createElement('li');
        playlistsSection.innerHTML = `
            <div class="user-playlists-section">
                <div class="playlist-header">
                    <img class="invert" src="/assets/images/svgs/playlist.svg" alt="playlist">
                    <span>Your Playlists</span>
                    <button class="create-playlist-btn" title="Create Playlist">+</button>
                </div>
                <div class="user-playlists-list"></div>
            </div>
        `;
        
        const createBtn = playlistsSection.querySelector('.create-playlist-btn');
        createBtn.addEventListener('click', () => this.showCreatePlaylistModal());
        
        sidebar.appendChild(playlistsSection);
    }

    // Update favorites UI
    updateFavoritesUI() {
        const favoritesCount = document.querySelector('.favorites-count');
        if (favoritesCount) {
            favoritesCount.textContent = `(${this.favorites.length})`;
        }
    }

    // Update user playlists UI
    updatePlaylistsUI() {
        const playlistsList = document.querySelector('.user-playlists-list');
        if (!playlistsList) return;

        playlistsList.innerHTML = this.userPlaylists.map(playlist => `
            <div class="user-playlist-item" data-playlist-id="${playlist.id}">
                <span class="playlist-name">${playlist.title}</span>
                <span class="playlist-song-count">(${playlist.songs.length})</span>
                <button class="delete-playlist-btn" title="Delete Playlist">×</button>
            </div>
        `).join('');

        // Add event listeners
        playlistsList.querySelectorAll('.user-playlist-item').forEach(item => {
            const playlistId = item.dataset.playlistId;
            const deleteBtn = item.querySelector('.delete-playlist-btn');
            
            item.addEventListener('click', (e) => {
                if (e.target === deleteBtn) {
                    this.deletePlaylist(playlistId);
                } else {
                    this.showUserPlaylist(playlistId);
                }
            });
        });
    }

    // Show favorites playlist
    showFavorites() {
        const favoritesSongs = this.favorites.map(fav => fav.file);
        const favoritesPlaylist = {
            title: "❤️ Liked Songs",
            description: `Your ${this.favorites.length} favorite tracks`,
            songs: favoritesSongs
        };

        // Update main player with favorites
        if (window.songs) {
            window.songs = favoritesSongs;
            window.updatePlaylistHeader(favoritesPlaylist.title, favoritesPlaylist.description);
            window.renderAndAttachListeners(favoritesSongs);
            
            if (favoritesSongs.length > 0) {
                window.playMusic(0);
            }
        }
    }

    // Show user playlist
    showUserPlaylist(playlistId) {
        const playlist = this.userPlaylists.find(p => p.id === playlistId);
        if (!playlist) return;

        const playlistSongs = playlist.songs.map(song => song.file);
        
        // Update main player with user playlist
        if (window.songs) {
            window.songs = playlistSongs;
            window.updatePlaylistHeader(playlist.title, playlist.description || `${playlist.songs.length} songs`);
            window.renderAndAttachListeners(playlistSongs);
            
            if (playlistSongs.length > 0) {
                window.playMusic(0);
            }
        }
    }

    // Show create playlist modal
    showCreatePlaylistModal() {
        const modal = document.createElement('div');
        modal.className = 'create-playlist-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Create New Playlist</h3>
                <input type="text" id="playlist-name" placeholder="Playlist name" maxlength="50">
                <textarea id="playlist-description" placeholder="Description (optional)" maxlength="200"></textarea>
                <div class="modal-buttons">
                    <button class="cancel-btn">Cancel</button>
                    <button class="create-btn">Create</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const nameInput = modal.querySelector('#playlist-name');
        const descInput = modal.querySelector('#playlist-description');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const createBtn = modal.querySelector('.create-btn');
        
        nameInput.focus();
        
        cancelBtn.addEventListener('click', () => modal.remove());
        createBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name) {
                this.createPlaylist(name, descInput.value.trim());
                modal.remove();
            }
        });
        
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && nameInput.value.trim()) {
                this.createPlaylist(nameInput.value.trim(), descInput.value.trim());
                modal.remove();
            }
        });
    }

    // Add heart button to song items
    addFavoriteButtons() {
        const songItems = document.querySelectorAll('.songItem');
        songItems.forEach((item, index) => {
            if (item.querySelector('.favorite-btn')) return; // Already has button

            const songTitle = item.querySelector('.info').textContent.trim();
            const isFav = this.isFavorite(songTitle);
            
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = `favorite-btn ${isFav ? 'favorited' : ''}`;
            favoriteBtn.innerHTML = isFav ? '❤️' : '🤍';
            favoriteBtn.title = isFav ? 'Remove from favorites' : 'Add to favorites';
            
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const songFile = window.songs[index];
                const folder = window.currFolder;
                
                this.toggleFavorite(songTitle, songFile, folder);
                
                // Update button appearance
                const newIsFav = this.isFavorite(songTitle);
                favoriteBtn.innerHTML = newIsFav ? '❤️' : '🤍';
                favoriteBtn.className = `favorite-btn ${newIsFav ? 'favorited' : ''}`;
                favoriteBtn.title = newIsFav ? 'Remove from favorites' : 'Add to favorites';
            });
            
            item.appendChild(favoriteBtn);
        });
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'playlist-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
if (typeof window !== 'undefined') {
    window.userPlaylistManager = new UserPlaylistManager();
}