// Movie Database
const movieDatabase = [
    {id: '1', title: 'Avengers: Endgame', year: 2019, poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', duration: '3h 1m'},
    {id: '2', title: 'Inception', year: 2010, poster: 'https://images.unsplash.com/photo-1489599091523-8c8a443d8c6a?w=500', duration: '2h 28m'},
    {id: '3', title: 'The Matrix', year: 1999, poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76ff?w=500', duration: '2h 16m'},
    {id: '4', title: 'Interstellar', year: 2014, poster: 'https://images.unsplash.com/photo-1489599091523-8c8a443d8c6a?w=500', duration: '2h 49m'},
    {id: '5', title: 'John Wick: Chapter 4', year: 2023, poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', duration: '2h 49m'},
    {id: '6', title: 'Oppenheimer', year: 2023, poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76ff?w=500', duration: '3h'},
    {id: '7', title: 'Dune: Part Two', year: 2024, poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', duration: '2h 46m'}
];

// Initialize App
function initApp() {
    loadMovies('trendingMovies', movieDatabase.slice(0, 6));
    loadMovies('latestMovies', movieDatabase.slice(3));
    setupEventListeners();
}

// Load Movies
function loadMovies(containerId, movies) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.backgroundImage = `url(${movie.poster})`;
        card.innerHTML = `
            <div class="movie-overlay">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${movie.year} • ${movie.duration}</div>
            </div>
        `;
        card.onclick = () => playMovie(movie);
        container.appendChild(card);
    });
}

// Play Movie
function playMovie(movie) {
    document.getElementById('playerTitle').textContent = movie.title;
    const video = document.getElementById('playerVideo');
    video.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
    document.getElementById('videoPlayer').style.display = 'flex';
    video.play();
}

// Modal Controls
function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'grid';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

function closePlayer() {
    document.getElementById('videoPlayer').style.display = 'none';
    document.getElementById('playerVideo').pause();
}

// File Upload with Drag & Drop
function setupEventListeners() {
    const dropZone = document.querySelector('.file-drop-zone');
    const fileInput = document.getElementById('movieFile');

    // Click to browse
    dropZone.addEventListener('click', () => fileInput.click());

    // Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
}

// Upload Handler
function uploadMovie() {
    const fileInput = document.getElementById('movieFile');
    const files = fileInput.files;
    
    if (!files.length) {
        alert('Please select a movie file!');
        return;
    }

    const file = files[0];
    if (file.size > 500 * 1024 * 1024) {
        alert('File too large! Max 500MB');
        return;
    }

    simulateUpload(file);
}

function simulateUpload(file) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                // Add to database
                const newMovie = {
                    id: Date.now().toString(),
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    year: new Date().getFullYear(),
                    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
                    duration: 'Processing...'
                };
                movieDatabase.unshift(newMovie);
                loadMovies('latestMovies', movieDatabase.slice(0, 6));
                
                alert('🎬 Movie uploaded & processed successfully!');
                closeUploadModal();
                document.getElementById('movieFile').value = '';
            }, 1500);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, 300);
}

function scrollToMovies() {
    document.querySelector('.main-content').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUploadModal();
        closePlayer();
    }
});

// Touch/Swipe Support for Mobile
let startX = 0;
document.querySelectorAll('.movies-container').forEach(container => {
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            container.scrollLeft += diff;
            startX = currentX;
        }
    }, { passive: true });
});

// Initialize
window.addEventListener('load', initApp);
