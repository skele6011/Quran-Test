document.addEventListener('DOMContentLoaded', function() {
    const surahSelect = document.getElementById('surah-select');
    const pickAyahButton = document.getElementById('pick-ayah');
    const ayahDisplay = document.getElementById('ayah-display');
    const ayahText = document.getElementById('ayah-text');
    const checkAnswerButton = document.getElementById('check-answer');
    const answerDisplay = document.getElementById('answer-display');
    const followingAyahs = document.getElementById('following-ayahs');

    let currentSurah;
    let currentAyahIndex;
    let quranData; // Declare this at the top

    // Load the JSON file - make sure the path is correct
    fetch('quran.json')  // Simplified path
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded successfully');
            // Log the structure to debug
            console.log('Data structure:', data);
            quranData = data.data || data; // Try both data.data and data
            initializeApp();
        })
        .catch(error => {
            console.error('Error loading quran.json:', error);
            ayahText.textContent = 'Error loading Quran data. Please refresh or try again later.';
        });

    function initializeApp() {
        console.log('Initializing with data:', quranData);
        
        if (!quranData || typeof quranData !== 'object') {
            console.error('Invalid Quran data structure:', quranData);
            return;
        }

        // Convert the object structure to array format
        const surahs = Object.entries(quranData).map(([number, ayahs]) => ({
            number: parseInt(number),
            ayahs: ayahs.map((ayah, index) => ({
                number: index + 1,
                text: ayah.text || ayah
            }))
        }));

        // Sort surahs by number
        surahs.sort((a, b) => a.number - b.number);

        // Populate surah select
        surahs.forEach(surah => {
            const option = document.createElement('option');
            option.value = surah.number;
            option.textContent = `${surah.number}. ${surah.name || `Surah ${surah.number}`}`;
            surahSelect.appendChild(option);
        });

        pickAyahButton.addEventListener('click', () => {
            const selectedSurahNumber = parseInt(surahSelect.value);
            currentSurah = surahs.find(surah => surah.number === selectedSurahNumber);
            
            // Pick random ayah (excluding last 3 ayahs)
            const maxAyahIndex = currentSurah.ayahs.length - 3;
            currentAyahIndex = Math.floor(Math.random() * maxAyahIndex);
            
            ayahText.textContent = currentSurah.ayahs[currentAyahIndex].text;
            ayahDisplay.classList.remove('hidden');
            answerDisplay.classList.add('hidden');
        });

        checkAnswerButton.addEventListener('click', () => {
            followingAyahs.innerHTML = '';
            
            // Display next 3 ayahs
            for(let i = 1; i <= 3; i++) {
                const nextAyah = currentSurah.ayahs[currentAyahIndex + i];
                const li = document.createElement('li');
                li.textContent = nextAyah.text;
                followingAyahs.appendChild(li);
            }
            
            answerDisplay.classList.remove('hidden');
        });
    }
});
