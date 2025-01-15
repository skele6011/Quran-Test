// Cache DOM elements
const modeSelect = document.getElementById('mode-select');
const singleControls = document.getElementById('single-controls');
const multiControls = document.getElementById('multi-controls');
const surahSelect = document.getElementById('surah-select');
const surahSelectStart = document.getElementById('surah-select-start');
const surahSelectEnd = document.getElementById('surah-select-end');
const pickAyahButton = document.getElementById('pick-ayah');
const ayahDisplay = document.getElementById('ayah-display');
const ayahNumber = document.getElementById('ayah-number');
const ayahText = document.getElementById('ayah-text');
const checkAnswerButton = document.getElementById('check-answer');
const answerDisplay = document.getElementById('answer-display');
const followingAyahs = document.getElementById('following-ayahs');
const ayahCountInput = document.getElementById('ayah-count');

let quranData = null;
let currentAyah = null;
let followingAyahsList = [];

// Fetch Quran data
async function fetchQuranData() {
    try {
        // Fetch local JSON instead of remote API
        const response = await fetch('quran.json');
        const rawData = await response.json();
        // Transform the local JSON into an array of surah objects
        quranData = Object.keys(rawData).map(surahNum => {
            const ayahsArray = rawData[surahNum].map((item, index) => {
                return {
                    text: item.text,
                    numberInSurah: index + 1, // Generate ayah index
                    surah: { number: parseInt(surahNum) }
                };
            });
            return {
                number: parseInt(surahNum),
                name: 'Surah ' + surahNum,
                englishName: 'Surah ' + surahNum,
                ayahs: ayahsArray
            };
        });
        populateSurahSelects(); // Populate dropdowns
    } catch (error) {
        console.error('Error fetching local quran.json:', error);
    }
}

// Populate surah select dropdowns
function populateSurahSelects() {
    const selectElements = [surahSelect, surahSelectStart, surahSelectEnd];
    selectElements.forEach(select => {
        quranData.forEach(surah => {
            const option = document.createElement('option');
            option.value = surah.number;
            option.textContent = `${surah.number}. ${surah.name} (${surah.englishName})`;
            select.appendChild(option);
        });
    });
}

// Handle mode selection
modeSelect.addEventListener('change', () => {
    if (modeSelect.value === 'single') {
        singleControls.classList.remove('hidden');
        multiControls.classList.add('hidden');
    } else {
        singleControls.classList.add('hidden');
        multiControls.classList.remove('hidden');
    }
});

// Pick random ayah
pickAyahButton.addEventListener('click', () => {
    let selectedAyah;
    if (modeSelect.value === 'single') {
        // Fix: subtract 1 from surahSelect.value to get correct index
        const surahIndex = parseInt(surahSelect.value) - 1;
        const selectedSurah = quranData[surahIndex];
        const randomAyahIndex = Math.floor(Math.random() * selectedSurah.ayahs.length);
        selectedAyah = selectedSurah.ayahs[randomAyahIndex];
    } else {
        // Rest of the code remains the same
        const startSurah = parseInt(surahSelectStart.value);
        const endSurah = parseInt(surahSelectEnd.value);
        const validSurahs = quranData.slice(startSurah - 1, endSurah);
        const randomSurah = validSurahs[Math.floor(Math.random() * validSurahs.length)];
        const randomAyahIndex = Math.floor(Math.random() * randomSurah.ayahs.length);
        selectedAyah = randomSurah.ayahs[randomAyahIndex];
    }

    displayAyah(selectedAyah);
});

// Display selected ayah
function displayAyah(ayah) {
    currentAyah = ayah;
    ayahNumber.textContent = `${ayah.surah.number}:${ayah.numberInSurah}`;
    ayahText.textContent = ayah.text;
    ayahDisplay.classList.remove('hidden');
    answerDisplay.classList.add('hidden');
}

// Check answer
checkAnswerButton.addEventListener('click', () => {
    const ayahCount = parseInt(ayahCountInput.value) || 3;
    const surah = quranData[currentAyah.surah.number - 1];
    const currentIndex = currentAyah.numberInSurah - 1;
    
    followingAyahsList = surah.ayahs
        .slice(currentIndex + 1, currentIndex + 1 + ayahCount)
        .map(ayah => ayah.text);

    followingAyahs.innerHTML = followingAyahsList
        .map(text => `<li>${text}</li>`)
        .join('');

    answerDisplay.classList.remove('hidden');
});

// Initialize
fetchQuranData();
