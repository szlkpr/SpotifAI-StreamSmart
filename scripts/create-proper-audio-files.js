const fs = require('fs');
const path = require('path');

// Create a minimal MP3 file with silence
// This is a base64 encoded silent MP3 file (about 1 second of silence)
const SILENT_MP3_BASE64 = `/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUmH//yYSg+CIbkGP//8w+jhZaS0bJ///o4lBX/JJnZoUYw4BhhhhhBBBBBB`;

// Convert base64 to buffer
const silentMP3Buffer = Buffer.from(SILENT_MP3_BASE64, 'base64');

// Function to create a longer silent MP3 by repeating the short one
function createSilentMP3(durationMinutes = 3) {
    // Calculate how many times to repeat (approximately)
    const repetitions = Math.ceil(durationMinutes * 60); // rough estimate
    const buffers = [];
    
    for (let i = 0; i < repetitions; i++) {
        buffers.push(silentMP3Buffer);
    }
    
    return Buffer.concat(buffers);
}

// Get all music folders
const musicFoldersPath = path.join(__dirname, '..', 'assets', 'music', 'songs');

async function createAudioFiles() {
    console.log('🎵 Creating proper audio placeholder files...');
    
    try {
        const folders = fs.readdirSync(musicFoldersPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        let totalCreated = 0;
        
        for (const folder of folders) {
            const folderPath = path.join(musicFoldersPath, folder);
            const playlistPath = path.join(folderPath, 'playlist.json');
            
            if (!fs.existsSync(playlistPath)) {
                console.log(`⚠️  Skipping ${folder} - no playlist.json found`);
                continue;
            }
            
            let playlistContent = fs.readFileSync(playlistPath, 'utf8');
            // Remove BOM if present
            if (playlistContent.charCodeAt(0) === 0xFEFF) {
                playlistContent = playlistContent.slice(1);
            }
            const playlistData = JSON.parse(playlistContent);
            
            if (!playlistData.songs || !Array.isArray(playlistData.songs)) {
                console.log(`⚠️  Skipping ${folder} - invalid playlist.json`);
                continue;
            }
            
            console.log(`📁 Processing ${folder}...`);
            
            for (const songFileName of playlistData.songs) {
                const songPath = path.join(folderPath, songFileName);
                
                // Check if file exists and is too small (likely corrupted/placeholder)
                if (fs.existsSync(songPath)) {
                    const stats = fs.statSync(songPath);
                    if (stats.size > 50000) { // If file is larger than 50KB, assume it's valid
                        console.log(`  ✅ ${songFileName} - already exists and seems valid`);
                        continue;
                    } else {
                        console.log(`  🔄 ${songFileName} - replacing small/corrupted file`);
                    }
                } else {
                    console.log(`  ➕ ${songFileName} - creating new file`);
                }
                
                // Create a proper silent MP3 file
                const silentMP3 = createSilentMP3(3); // 3 minute duration
                fs.writeFileSync(songPath, silentMP3);
                totalCreated++;
                
                console.log(`  ✅ Created ${songFileName} (${(silentMP3.length / 1024).toFixed(1)}KB)`);
            }
        }
        
        console.log(`\n🎉 Process complete! Created/fixed ${totalCreated} audio files.`);
        console.log(`\nNote: These are silent audio files that will allow the player to work.`);
        console.log(`Replace them with actual music files when you have them available.`);
        
    } catch (error) {
        console.error('❌ Error creating audio files:', error);
    }
}

// Run if called directly
if (require.main === module) {
    createAudioFiles();
}

module.exports = { createAudioFiles };