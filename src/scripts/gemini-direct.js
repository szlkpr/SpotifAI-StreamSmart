// SpotifAI - StreamSmart: Google Gemini Integration (100% FREE)
console.log('SpotifAI - StreamSmart: Google Gemini AI Integration Loaded');

let currentSong = new Audio();
let songs;
let currFolder;
let currentSongIndex = 0;
let lastVolume = 1;

// Google Gemini API configuration
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Get from https://makersuite.google.com/app/apikey
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

const modal = document.getElementById('ai-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalCloseBtn = document.querySelector('.modal-close');

function showModal(title, text) {
    modalTitle.innerText = title;
    modalText.innerHTML = text;
    modal.style.display = 'flex';
}

function hideModal() {
    modal.style.display = 'none';
}

// Free Google Gemini API call
async function callGeminiAI(userContent, options = {}) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        throw new Error('Please set your Google Gemini API key. Get it free at: https://makersuite.google.com/app/apikey');
    }
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userContent }]
                }],
                generationConfig: {
                    temperature: options.temperature || 0.7,
                    maxOutputTokens: options.max_tokens || 100,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();

    } catch (error) {
        console.error('Gemini API call failed:', error);
        throw error;
    }
}

async function detectSongMood(songTitle, buttonElement) {
    const originalButtonHTML = buttonElement.innerHTML;
    buttonElement.disabled = true;
    buttonElement.innerHTML = '<div class="spinner"></div>';

    showModal(`Analyzing "${songTitle}"`, "Please wait, the AI is thinking...");
    try {
        const prompt = `Analyze the mood of a song titled "${songTitle}". Respond with just 2-4 words describing the emotional mood (examples: "Upbeat and energetic", "Melancholic and reflective", "Romantic and dreamy").`;
        const mood = await callGeminiAI(prompt, { temperature: 0.5, max_tokens: 60 });
        showModal(`🎭 Mood for "${songTitle}"`, `<p style="font-size: 1.2em; color: #1ed760;">${mood}</p>`);
    } catch (error) {
        console.error("Error detecting song mood:", error);
        showModal("Error", `Failed to detect mood: ${error.message}`);
    } finally {
        buttonElement.disabled = false;
        buttonElement.innerHTML = originalButtonHTML;
    }
}

async function explainSong(songTitle, buttonElement) {
    const originalButtonHTML = buttonElement.innerHTML;
    buttonElement.disabled = true;
    buttonElement.innerHTML = '<div class="spinner"></div>';

    showModal(`Explaining "${songTitle}"`, "Please wait, the AI is analyzing the title...");
    try {
        const prompt = `Based on the song title "${songTitle}", what might this song be about? Provide a short, engaging 2-3 sentence explanation about the potential themes, story, or emotions.`;
        const explanation = await callGeminiAI(prompt, { temperature: 0.7, max_tokens: 150 });
        showModal(`💡 About "${songTitle}"`, `<p>${explanation}</p>`);
    } catch (error) {
        console.error("Error explaining song:", error);
        showModal("Error", `Failed to get explanation: ${error.message}`);
    } finally {
        buttonElement.disabled = false;
        buttonElement.innerHTML = originalButtonHTML;
    }
}

// AI Smart Recommendations with Gemini
const PLAYLIST_FOLDERS = [
    "songs/ncs", "happy-hits", "top-global", "release-radar",
    "daily-mix-1", "discover-weekly", "chill-vibes",
    "indie-essentials", "hot-hits"
];

async function getAllSongTitles() {
    let allTitles = new Set();

    for (const folder of PLAYLIST_FOLDERS) {
        try {
            const path = folder.startsWith('songs/') ? folder : `songs/${folder}`;
            const response = await fetch(`/${path}/playlist.json`);
            if (response.ok) {
                const data = await response.json();
                data.songs.forEach(songFile => {
                    const title = decodeURIComponent(songFile).replace(/\.mp3$/, "");
                    allTitles.add(title);
                });
            }
        } catch (error) {
            console.warn(`Could not load playlist: ${folder}`, error);
        }
    }

    return Array.from(allTitles);
}

async function findSongLocation(songTitle) {
    for (const folder of PLAYLIST_FOLDERS) {
        try {
            const path = folder.startsWith('songs/') ? folder : `songs/${folder}`;
            const response = await fetch(`/${path}/playlist.json`);
            if (response.ok) {
                const data = await response.json();
                const foundSongFile = data.songs.find(songFile => {
                    const decodedTitle = decodeURIComponent(songFile).replace(/\.mp3$/, "");
                    return decodedTitle.toLowerCase() === songTitle.toLowerCase();
                });

                if (foundSongFile) {
                    return { folder: folder, fileName: decodeURIComponent(foundSongFile) };
                }
            }
        } catch (error) {
            console.warn(`Could not search playlist: ${folder}`, error);
        }
    }
    return null;
}

function renderRecommendations(recommendations) {
    const resultsContainer = document.getElementById('ai-recommendation-results');
    resultsContainer.innerHTML = '';

    if (!recommendations || recommendations.length === 0) {
        resultsContainer.innerHTML = '<p>No recommendations found for that query.</p>';
        return;
    }

    recommendations.forEach(song => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';

        let playButtonHTML = '';
        if (song.isAvailable) {
            item.classList.add('playable');
            item.dataset.songTitle = song.title;
            playButtonHTML = `
                <div class="recommendation-play-btn">
                    <img src="svgs/play.svg" alt="Play">
                </div>
            `;
        }

        item.innerHTML = `
            <div class="song-details">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist || 'Unknown Artist'}</span>
            </div>
            ${playButtonHTML}
        `;
        resultsContainer.appendChild(item);
    });
}

async function handleRecommendationRequest() {
    const recommendationInput = document.getElementById('ai-recommendation-input');
    const recommendationBtn = document.getElementById('ai-recommendation-btn');
    const recommendationResults = document.getElementById('ai-recommendation-results');

    const query = recommendationInput.value.trim();
    if (!query) return;

    const originalButtonHTML = recommendationBtn.innerHTML;
    recommendationBtn.disabled = true;
    recommendationBtn.innerHTML = '<div class="spinner"></div>';
    recommendationResults.innerHTML = '<p>🤖 AI is searching for your vibe...</p>';

    try {
        const allSongTitles = await getAllSongTitles();

        const prompt = `You are a music expert. User wants: "${query}". 
        
From this list of available songs: ${allSongTitles.join(', ')}

Suggest 5 songs that match their request. Return ONLY a valid JSON array:
[
  {"title": "Song Name", "artist": "Artist Name", "isAvailable": true/false}
]

Rules:
- Set "isAvailable": true if the exact song title appears in the available list
- Set "isAvailable": false for suggestions not in the list
- Make up realistic artist names if unknown
- Focus on matching the mood/genre requested`;

        const response = await callGeminiAI(prompt, { temperature: 0.7, max_tokens: 400 });

        let recommendations = [];
        try {
            // Clean the response in case Gemini adds extra text
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                recommendations = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No valid JSON found in response');
            }
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            console.error("Raw response:", response);
            throw new Error("AI returned an invalid format. Please try again.");
        }
        
        renderRecommendations(recommendations);

    } catch (error) {
        console.error("Error getting recommendations:", error);
        recommendationResults.innerHTML = `<p style="color: #ff4d4d;">Sorry, the AI had trouble: ${error.message}</p>`;
    } finally {
        recommendationBtn.disabled = false;
        recommendationBtn.innerHTML = originalButtonHTML;
    }
}

// Copy all the music player functions from script-no-amplify.js
function updatePlaylistHeader(title, description) {
    const titleEl = document.getElementById('current-playlist-title');
    const descEl = document.getElementById('current-playlist-description');

    if (titleEl) {
        titleEl.innerText = title || "Your Library";
    }
    if (descEl) {
        descEl.innerText = description || "";
    }
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    const path = folder.startsWith('songs/') ? folder : `songs/${folder}`;
    currFolder = path;
    try {
        let response = await fetch(`/${path}/playlist.json`);
        if (!response.ok) {
            throw new Error(`Could not fetch playlist.json for /${path}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { title: "Error", description: "Could not load playlist.", songs: [] };
    }
}

const playMusic = (index, pause = false) => {
    if (index < 0 || index >= songs.length) {
        console.log("Reached end of playlist.");
        return;
    }
    currentSongIndex = index;
    const track = songs[currentSongIndex];
    currentSong.src = `/${currFolder}/` + encodeURIComponent(track);
 
    let play = document.querySelector(".playbtn");
 
    if (!pause) {
        currentSong.play();
        play.src = "svgs/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track.replace(/\.mp3$/, "");
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

function renderAndAttachListeners(songArray) {
    const songUL = document.querySelector(".songList ul");
    if (!songUL) {
        console.error("Song list UL element not found!");
        return;
    }
    songUL.innerHTML = "";

    for (const [index, song] of songArray.entries()) {
        const songName = song.replace(/\.mp3$/, "");
        const li = document.createElement('li');
        li.dataset.track = song;

        li.innerHTML = `
            <img class="invert" width="34" src="svgs/music.svg" alt="Music icon">
            <div class="info">
                <div>${songName}</div>
                <div>Artist Name</div>
            </div>
            <div class="ai-actions">
                <button class="ai-btn mood-btn" title="Detect Song Mood">
                    <img src="svgs/mood.svg" alt="Detect Mood">
                </button>
                <button class="ai-btn explain-btn" title="Explain Song">
                    <img src="svgs/explain.svg" alt="Explain Song">
                </button>
            </div>
        `;

        li.addEventListener("click", (event) => {
            if (event.target.closest('.ai-btn')) {
                return;
            }
            playMusic(index);
        });

        li.querySelector('.mood-btn').addEventListener("click", (event) => {
            detectSongMood(songName, event.currentTarget);
        });

        li.querySelector('.explain-btn').addEventListener("click", (event) => {
            explainSong(songName, event.currentTarget);
        });

        songUL.appendChild(li);
    }
}

async function main() {
    console.log('SpotifAI - StreamSmart initializing with FREE Google Gemini AI...');
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.warn('🚨 Gemini API key not set! Get your FREE key at: https://makersuite.google.com/app/apikey');
        console.warn('Then replace YOUR_GEMINI_API_KEY_HERE in script-gemini.js');
    }

    // Initialize music player
    const playlist = await getSongs("songs/ncs");
    songs = playlist.songs.map(song => decodeURIComponent(song));
    updatePlaylistHeader(playlist.title, playlist.description);

    if (songs.length > 0) {
        playMusic(0, true);
    }
    
    renderAndAttachListeners(songs);

    // Music player controls
    let play = document.querySelector(".playbtn");
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "svgs/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "svgs/play.svg"
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    currentSong.addEventListener("ended", () => {
        if (currentSongIndex < songs.length - 1) {
            playMusic(currentSongIndex + 1);
        } else {
            document.querySelector(".playbtn").src = "svgs/play.svg";
        }
    });

     document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Modal controls
    modalCloseBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Navigation
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
    })

    // AI Recommendations
    const recommendationInput = document.getElementById('ai-recommendation-input');
    const recommendationBtn = document.getElementById('ai-recommendation-btn');
    const recommendationResults = document.getElementById('ai-recommendation-results');

    recommendationBtn.addEventListener('click', handleRecommendationRequest);
    recommendationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleRecommendationRequest();
        }
    });

    // Handle recommended song playback
    recommendationResults.addEventListener('click', async (e) => {
        const playableItem = e.target.closest('.recommendation-item.playable');
        if (!playableItem) return;

        const songTitleToPlay = playableItem.dataset.songTitle;
        const songLocation = await findSongLocation(songTitleToPlay);

        if (songLocation) {
            const playlist = await getSongs(songLocation.folder);
            songs = playlist.songs.map(song => decodeURIComponent(song));
            updatePlaylistHeader(playlist.title, playlist.description);
            renderAndAttachListeners(songs);

            const songIndex = songs.findIndex(s => s.toLowerCase() === songLocation.fileName.toLowerCase());
            if (songIndex !== -1) {
                playMusic(songIndex);
            }
        }
    });
    
    // Previous/Next controls
    document.getElementById("previous").addEventListener("click", () => {
        if (currentSongIndex > 0) {
            playMusic(currentSongIndex - 1);
        }
    })

    document.getElementById("next").addEventListener("click", () => {
        if (currentSongIndex < songs.length - 1) {
            playMusic(currentSongIndex + 1);
        }
    })

    // Volume controls
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        const newVolume = parseInt(e.target.value) / 100;
        currentSong.volume = newVolume;
        if (newVolume === 0) {
            document.querySelector(".volume>img").src = "svgs/mute.svg";
        } else {
            document.querySelector(".volume>img").src = "svgs/volume.svg";
        }
    })

    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        const volumeIcon = e.target;
        const volumeSlider = document.querySelector(".range input");
        if(currentSong.volume > 0){
            lastVolume = currentSong.volume;
            volumeIcon.src = "svgs/mute.svg";
            currentSong.volume = 0;
            volumeSlider.value = 0;
        }
        else{
            volumeIcon.src = "svgs/volume.svg";
            currentSong.volume = lastVolume;
            volumeSlider.value = lastVolume * 100;
        }
    })

    // Playlist cards
    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async (event) => {
            let folder = event.currentTarget.dataset.folder;
            if (!folder) return;

            const playlist = await getSongs(folder);
            songs = playlist.songs.map(song => decodeURIComponent(song));
            updatePlaylistHeader(playlist.title, playlist.description);
            renderAndAttachListeners(songs);
    
            if (songs.length > 0) {
                playMusic(0);
            }
        });
    });

    console.log('🎵 SpotifAI - StreamSmart ready with FREE AI features!');
    console.log('💡 Get your free Gemini API key: https://makersuite.google.com/app/apikey');
}

main();