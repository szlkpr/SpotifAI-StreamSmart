// Enhanced Playlists with Realistic Metadata
const enhancedPlaylists = {
    'happy-hits': {
        title: "Happy Hits! 😊",
        description: "Feel-good songs to boost your mood and brighten your day.",
        genre: "Pop/Feel-Good",
        mood: "happy",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        songs: [
            { file: "Sunshine Melody.mp3", title: "Sunshine Melody", artist: "Bright & Early", duration: "3:24" },
            { file: "Good Vibes Only.mp3", title: "Good Vibes Only", artist: "The Positives", duration: "2:58" },
            { file: "Smile Again.mp3", title: "Smile Again", artist: "Happy Hearts", duration: "3:45" },
            { file: "Happy Dance.mp3", title: "Happy Dance", artist: "Joyful Noise", duration: "3:12" },
            { file: "Joy Ride.mp3", title: "Joy Ride", artist: "Sunny Days", duration: "4:02" },
            { file: "Positive Energy.mp3", title: "Positive Energy", artist: "Upbeat Collective", duration: "3:36" },
            { file: "Uplifting Spirits.mp3", title: "Uplifting Spirits", artist: "Mood Boosters", duration: "3:51" }
        ]
    },
    
    'electronic-beats': {
        title: "Electronic Beats 🎛️",
        description: "Pulsing synths and driving beats for the digital age.",
        genre: "Electronic/EDM",
        mood: "energetic",
        cover: "https://images.unsplash.com/photo-1574193080071-54b43e0f3a89?w=300&h=300&fit=crop",
        songs: [
            { file: "Neon Nights.mp3", title: "Neon Nights", artist: "Synth Masters", duration: "4:18" },
            { file: "Cyber Dreams.mp3", title: "Cyber Dreams", artist: "Digital Pulse", duration: "5:24" },
            { file: "Electric Pulse.mp3", title: "Electric Pulse", artist: "Bass Drop", duration: "3:47" },
            { file: "Digital Dawn.mp3", title: "Digital Dawn", artist: "Future Sound", duration: "4:55" },
            { file: "Synth Wave.mp3", title: "Synth Wave", artist: "Retro Future", duration: "4:12" },
            { file: "Future Bass.mp3", title: "Future Bass", artist: "EDM Collective", duration: "3:33" }
        ]
    },
    
    'rock-classics': {
        title: "Rock Classics 🎸",
        description: "Timeless guitar anthems and legendary rock hits.",
        genre: "Rock",
        mood: "powerful",
        cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
        songs: [
            { file: "Thunder Road.mp3", title: "Thunder Road", artist: "Storm Riders", duration: "4:42" },
            { file: "Midnight Express.mp3", title: "Midnight Express", artist: "Highway Kings", duration: "5:18" },
            { file: "Broken Wings.mp3", title: "Broken Wings", artist: "Phoenix Rise", duration: "4:26" },
            { file: "Steel Heart.mp3", title: "Steel Heart", artist: "Iron Will", duration: "3:54" },
            { file: "Highway Legend.mp3", title: "Highway Legend", artist: "Road Warriors", duration: "5:03" },
            { file: "Electric Storm.mp3", title: "Electric Storm", artist: "Lightning Strike", duration: "4:37" },
            { file: "Wild Fire.mp3", title: "Wild Fire", artist: "Burning Sky", duration: "4:15" }
        ]
    },
    
    'jazz-lounge': {
        title: "Jazz Lounge 🎷",
        description: "Smooth saxophone and sophisticated piano for late-night vibes.",
        genre: "Jazz",
        mood: "relaxed",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        songs: [
            { file: "Midnight Blue.mp3", title: "Midnight Blue", artist: "Smooth Jazz Trio", duration: "5:47" },
            { file: "Smoky Room.mp3", title: "Smoky Room", artist: "The Lounge Cats", duration: "4:33" },
            { file: "Piano Noir.mp3", title: "Piano Noir", artist: "Miles & More", duration: "6:12" },
            { file: "Velvet Voice.mp3", title: "Velvet Voice", artist: "Luna Serenade", duration: "4:58" },
            { file: "City Lights.mp3", title: "City Lights", artist: "Urban Jazz", duration: "5:24" },
            { file: "After Hours.mp3", title: "After Hours", artist: "Late Night Sessions", duration: "7:15" }
        ]
    },
    
    'hip-hop-hits': {
        title: "Hip-Hop Hits 🎤",
        description: "Fresh beats and lyrical flow from the streets to the charts.",
        genre: "Hip-Hop/Rap",
        mood: "confident",
        cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        songs: [
            { file: "Street Dreams.mp3", title: "Street Dreams", artist: "Urban Legend", duration: "3:42" },
            { file: "Rise Up.mp3", title: "Rise Up", artist: "Motivation Flow", duration: "4:18" },
            { file: "City Flow.mp3", title: "City Flow", artist: "Metro Beats", duration: "3:57" },
            { file: "Golden Era.mp3", title: "Golden Era", artist: "Old School Revival", duration: "4:36" },
            { file: "Freestyle Kings.mp3", title: "Freestyle Kings", artist: "Mic Masters", duration: "3:28" },
            { file: "Underground.mp3", title: "Underground", artist: "Real Talk", duration: "4:05" },
            { file: "Victory Lap.mp3", title: "Victory Lap", artist: "Champion Sound", duration: "3:51" }
        ]
    },
    
    'pop-anthems': {
        title: "Pop Anthems 🎵",
        description: "Catchy hooks and chart-topping melodies everyone loves.",
        genre: "Pop",
        mood: "upbeat",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        songs: [
            { file: "Summer Nights.mp3", title: "Summer Nights", artist: "Pop Sensation", duration: "3:45" },
            { file: "Dancing Queen.mp3", title: "Dancing Queen", artist: "Party Time", duration: "4:12" },
            { file: "Spotlight.mp3", title: "Spotlight", artist: "Center Stage", duration: "3:33" },
            { file: "Feel Good.mp3", title: "Feel Good", artist: "Good Mood", duration: "3:58" },
            { file: "Radio Star.mp3", title: "Radio Star", artist: "Chart Toppers", duration: "3:21" },
            { file: "Perfect Day.mp3", title: "Perfect Day", artist: "Sunshine Pop", duration: "4:07" },
            { file: "Celebration.mp3", title: "Celebration", artist: "Party Anthem", duration: "3:44" }
        ]
    },
    
    'acoustic-sessions': {
        title: "Acoustic Sessions 🎻",
        description: "Intimate performances with just voice and guitar.",
        genre: "Acoustic/Folk",
        mood: "peaceful",
        cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop",
        songs: [
            { file: "Campfire Stories.mp3", title: "Campfire Stories", artist: "Folk Tales", duration: "4:23" },
            { file: "Whispered Words.mp3", title: "Whispered Words", artist: "Gentle Soul", duration: "3:56" },
            { file: "Morning Coffee.mp3", title: "Morning Coffee", artist: "Early Bird", duration: "3:42" },
            { file: "Old Oak Tree.mp3", title: "Old Oak Tree", artist: "Nature's Voice", duration: "4:18" },
            { file: "Sunset Road.mp3", title: "Sunset Road", artist: "Journey Home", duration: "4:45" },
            { file: "Simple Things.mp3", title: "Simple Things", artist: "Peaceful Mind", duration: "3:37" }
        ]
    },
    
    'workout-energy': {
        title: "Workout Energy 💪",
        description: "High-energy beats to power through your fitness goals.",
        genre: "Fitness/Electronic",
        mood: "motivated",
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        songs: [
            { file: "Push Harder.mp3", title: "Push Harder", artist: "Gym Motivation", duration: "3:28" },
            { file: "Beast Mode.mp3", title: "Beast Mode", artist: "Fitness First", duration: "3:54" },
            { file: "No Limits.mp3", title: "No Limits", artist: "Power Drive", duration: "4:12" },
            { file: "Power Up.mp3", title: "Power Up", artist: "Energy Boost", duration: "3:36" },
            { file: "Unstoppable.mp3", title: "Unstoppable", artist: "Momentum", duration: "4:05" },
            { file: "Champion.mp3", title: "Champion", artist: "Victory Sound", duration: "3:47" },
            { file: "Break Barriers.mp3", title: "Break Barriers", artist: "Limitless", duration: "4:18" }
        ]
    },
    
    'focus-flow': {
        title: "Focus Flow 🧘",
        description: "Ambient instrumentals to enhance concentration and productivity.",
        genre: "Ambient/Instrumental",
        mood: "focused",
        cover: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=300&fit=crop",
        songs: [
            { file: "Deep Thoughts.mp3", title: "Deep Thoughts", artist: "Mindful Music", duration: "6:42" },
            { file: "Clear Mind.mp3", title: "Clear Mind", artist: "Mental Clarity", duration: "5:38" },
            { file: "Zen Mode.mp3", title: "Zen Mode", artist: "Peaceful Flow", duration: "7:15" },
            { file: "Study Session.mp3", title: "Study Session", artist: "Focus Lab", duration: "5:54" },
            { file: "Flow State.mp3", title: "Flow State", artist: "Productivity Zone", duration: "6:28" },
            { file: "Mindful Moments.mp3", title: "Mindful Moments", artist: "Calm Collective", duration: "5:12" }
        ]
    },
    
    'chill-vibes': {
        title: "Chill Vibes 🌊",
        description: "Relax and unwind with these peaceful, ambient tunes.",
        genre: "Ambient/Chill",
        mood: "relaxed",
        cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
        songs: [
            { file: "Ocean Waves.mp3", title: "Ocean Waves", artist: "Nature Sounds", duration: "8:24" },
            { file: "Forest Dreams.mp3", title: "Forest Dreams", artist: "Ambient Nature", duration: "7:12" },
            { file: "Meditation Music.mp3", title: "Meditation Music", artist: "Inner Peace", duration: "6:33" },
            { file: "Nature Sound.mp3", title: "Nature Sound", artist: "Earth Harmony", duration: "5:47" },
            { file: "Relaxing Piano Music.mp3", title: "Relaxing Piano Music", artist: "Calm Keys", duration: "4:56" },
            { file: "Tibet.mp3", title: "Tibet", artist: "Mountain Serenity", duration: "9:18" }
        ]
    }
};

// Function to update playlist JSON files
function updatePlaylistFiles() {
    const fs = require('fs');
    const path = require('path');
    
    for (const [playlistName, playlistData] of Object.entries(enhancedPlaylists)) {
        const playlistPath = path.join('assets/music/songs', playlistName, 'playlist.json');
        
        // Create simplified playlist structure for compatibility
        const playlistJson = {
            title: playlistData.title,
            description: playlistData.description,
            genre: playlistData.genre,
            mood: playlistData.mood,
            cover: playlistData.cover,
            songs: playlistData.songs.map(song => song.file),
            metadata: playlistData.songs
        };
        
        fs.writeFileSync(playlistPath, JSON.stringify(playlistJson, null, 2));
        console.log(`Updated: ${playlistPath}`);
    }
    
    console.log('✅ All playlist files updated!');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { enhancedPlaylists, updatePlaylistFiles };
}

// Run if called directly
if (require.main === module) {
    updatePlaylistFiles();
}