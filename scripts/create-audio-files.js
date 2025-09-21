const fs = require('fs');
const path = require('path');

// Function to create a small silent MP3 placeholder
function createSilentMP3(filename, duration = 30) {
    // This creates a minimal MP3 header for a silent file
    // In a real application, you would use proper audio generation libraries
    const mp3Header = Buffer.from([
        0xFF, 0xFB, 0x90, 0x00, // MP3 sync word and header
        0x00, 0x00, 0x00, 0x00, // Additional header bytes
    ]);
    
    // Create a small buffer to represent the audio file
    const fileSize = Math.max(1024, duration * 32); // Rough estimation
    const buffer = Buffer.alloc(fileSize);
    mp3Header.copy(buffer, 0);
    
    return buffer;
}

// Playlist configurations with realistic song data
const playlists = {
    'happy-hits': [
        'Sunshine Melody.mp3',
        'Good Vibes Only.mp3', 
        'Smile Again.mp3',
        'Happy Dance.mp3',
        'Joy Ride.mp3',
        'Positive Energy.mp3',
        'Uplifting Spirits.mp3'
    ],
    'electronic-beats': [
        'Neon Nights.mp3',
        'Cyber Dreams.mp3',
        'Electric Pulse.mp3',
        'Digital Dawn.mp3',
        'Synth Wave.mp3',
        'Future Bass.mp3'
    ],
    'rock-classics': [
        'Thunder Road.mp3',
        'Midnight Express.mp3',
        'Broken Wings.mp3',
        'Steel Heart.mp3',
        'Highway Legend.mp3',
        'Electric Storm.mp3',
        'Wild Fire.mp3'
    ],
    'jazz-lounge': [
        'Midnight Blue.mp3',
        'Smoky Room.mp3',
        'Piano Noir.mp3',
        'Velvet Voice.mp3',
        'City Lights.mp3',
        'After Hours.mp3'
    ],
    'hip-hop-hits': [
        'Street Dreams.mp3',
        'Rise Up.mp3',
        'City Flow.mp3',
        'Golden Era.mp3',
        'Freestyle Kings.mp3',
        'Underground.mp3',
        'Victory Lap.mp3'
    ],
    'pop-anthems': [
        'Summer Nights.mp3',
        'Dancing Queen.mp3',
        'Spotlight.mp3',
        'Feel Good.mp3',
        'Radio Star.mp3',
        'Perfect Day.mp3',
        'Celebration.mp3'
    ],
    'acoustic-sessions': [
        'Campfire Stories.mp3',
        'Whispered Words.mp3',
        'Morning Coffee.mp3',
        'Old Oak Tree.mp3',
        'Sunset Road.mp3',
        'Simple Things.mp3'
    ],
    'workout-energy': [
        'Push Harder.mp3',
        'Beast Mode.mp3',
        'No Limits.mp3',
        'Power Up.mp3',
        'Unstoppable.mp3',
        'Champion.mp3',
        'Break Barriers.mp3'
    ],
    'focus-flow': [
        'Deep Thoughts.mp3',
        'Clear Mind.mp3',
        'Zen Mode.mp3',
        'Study Session.mp3',
        'Flow State.mp3',
        'Mindful Moments.mp3'
    ],
    'chill-vibes': [
        'Ocean Waves.mp3',
        'Forest Dreams.mp3',
        'Meditation Music.mp3',
        'Nature Sound.mp3',
        'Relaxing Piano Music.mp3',
        'Tibet.mp3'
    ]
};

// Create audio files for each playlist
async function createAllAudioFiles() {
    console.log('Creating placeholder audio files...');
    
    for (const [playlistName, songs] of Object.entries(playlists)) {
        const playlistDir = path.join('assets/music/songs', playlistName);
        
        // Ensure directory exists
        if (!fs.existsSync(playlistDir)) {
            fs.mkdirSync(playlistDir, { recursive: true });
        }
        
        // Create each song file
        for (const songFile of songs) {
            const filePath = path.join(playlistDir, songFile);
            
            if (!fs.existsSync(filePath)) {
                const audioBuffer = createSilentMP3(songFile, 180); // 3 minutes
                fs.writeFileSync(filePath, audioBuffer);
                console.log(`Created: ${filePath}`);
            } else {
                console.log(`Exists: ${filePath}`);
            }
        }
    }
    
    console.log('✅ All audio files created successfully!');
}

// Run the script
createAllAudioFiles().catch(console.error);