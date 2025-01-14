let currentSurah = null;
let currentAyahIndex = null;
let quranData = null;

// Fetch Quran data
async function fetchQuranData() {
    try {
        const response = await fetch('quran.json');
        quranData = await response.json();
        populateSurahSelect();
    } catch (error) {
        console.error('Error loading Quran data:', error);
    }
}

// Populate surah dropdown
function populateSurahSelect() {
    const surahSelect = document.getElementById('surahSelect');
    quranData.forEach((surah, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `${index + 1}. ${surah.name}`;
        surahSelect.appendChild(option);
    });
}

// Pick random ayah from selected surah
function pickAyah() {
    const surahSelect = document.getElementById('surahSelect');
    const selectedSurahIndex = parseInt(surahSelect.value) - 1;
    currentSurah = quranData[selectedSurahIndex];
    
    // Pick random ayah (leaving room for 3 ayat after it)
    const maxAyahIndex = currentSurah.ayahs.length - 4;
    currentAyahIndex = Math.floor(Math.random() * maxAyahIndex);
    
    // Display the selected ayah
    const ayahDisplay = document.getElementById('ayahDisplay');
    ayahDisplay.textContent = currentSurah.ayahs[currentAyahIndex].text;
    
    // Hide answer section until check is clicked
    document.getElementById('answerSection').style.display = 'none';
}

// Check answer and show next three ayat
function checkAnswer() {
    const answerSection = document.getElementById('answerSection');
    answerSection.style.display = 'block';
    answerSection.innerHTML = '';

    // Display next three ayat
    for (let i = 1; i <= 3; i++) {
        const nextAyah = currentSurah.ayahs[currentAyahIndex + i];
        const ayahElement = document.createElement('p');
        ayahElement.textContent = `${i}. ${nextAyah.text}`;
        answerSection.appendChild(ayahElement);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchQuranData);