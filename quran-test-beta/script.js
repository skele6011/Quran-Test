// API endpoint for Quran data
const API_URL = 'https://api.alquran.cloud/v1';

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const surahSelect = document.getElementById('surah-select');
    const pickAyahBtn = document.getElementById('pick-ayah');
    const ayahDisplay = document.getElementById('ayah-display');
    const ayahNumber = document.getElementById('ayah-number');
    const ayahText = document.getElementById('ayah-text');
    const checkAnswerBtn = document.getElementById('check-answer');
    const answerDisplay = document.getElementById('answer-display');
    const followingAyahs = document.getElementById('following-ayahs');

    // Verify all elements are found
    const elements = {
        surahSelect,
        pickAyahBtn,
        ayahDisplay,
        ayahNumber,
        ayahText,
        checkAnswerBtn,
        answerDisplay,
        followingAyahs
    };

    // Check if any element is null
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Element not found: ${name}`);
        }
    }

    // State variables
    let currentSurah = null;
    let currentAyah = null;
    let surahData = null;

    // Initialize the app
    async function init() {
        try {
            // Fetch list of surahs
            const response = await fetch(`${API_URL}/surah`);
            const data = await response.json();
            
            // Populate surah select
            data.data.forEach(surah => {
                const option = document.createElement('option');
                option.value = surah.number;
                option.textContent = `${surah.number}. ${surah.name} (${surah.englishName})`;
                surahSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading surahs:', error);
        }
    }

    // Pick random ayah from selected surah
    async function pickRandomAyah() {
        const selectedSurahNumber = surahSelect.value;
        if (!selectedSurahNumber) {
            alert('Please select a surah first');
            return;
        }

        try {
            // Show loading state
            ayahDisplay.classList.add('hidden');
            answerDisplay.classList.add('hidden');

            // Fetch surah data if not already loaded or if different surah selected
            if (!surahData || currentSurah !== selectedSurahNumber) {
                const response = await fetch(`${API_URL}/surah/${selectedSurahNumber}/ar.alafasy`);
                const data = await response.json();
                
                console.log('API Response:', data); // Debug log
                
                if (!data.data || !data.data.ayahs) {
                    throw new Error('Invalid API response structure');
                }
                
                surahData = data.data;
                currentSurah = selectedSurahNumber;
            }

            // Additional validation
            if (!Array.isArray(surahData.ayahs)) {
                throw new Error('Ayahs data is not in expected format');
            }

            // Pick random ayah (excluding last 3 ayahs)
            const maxAyah = Math.max(1, surahData.numberOfAyahs - 3);
            const randomIndex = Math.floor(Math.random() * maxAyah);
            currentAyah = randomIndex;

            // Display selected ayah
            ayahNumber.textContent = currentAyah + 1;
            ayahText.textContent = surahData.ayahs[currentAyah].text;
            ayahDisplay.classList.remove('hidden');
        } catch (error) {
            console.error('Error picking ayah:', error);
            alert('Failed to load ayah. Please try again.');
        }
    }

    // Show following ayahs as answer
    function showAnswer() {
        followingAyahs.innerHTML = '';
        
        // Display next three ayahs
        for (let i = currentAyah; i < currentAyah + 3 && i < surahData.numberOfAyahs; i++) {
            const li = document.createElement('li');
            li.textContent = surahData.ayahs[i].text;
            followingAyahs.appendChild(li);
        }
        
        answerDisplay.classList.remove('hidden');
    }

    // Event listeners
    pickAyahBtn.addEventListener('click', pickRandomAyah);
    checkAnswerBtn.addEventListener('click', showAnswer);

    // Initialize the app
    init();
});