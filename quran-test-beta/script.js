// script.js
const quranDataSample = require('./quran.json');
let currentSurah = null;

// Function to populate the surah select dropdown
function populateSurahSelect() {
  const surahSelect = document.getElementById('surah-select');
  surahSelect.innerHTML = ''; // Clear existing options

  const surahNumbers = Object.keys(quranDataSample); // Get surah numbers

  surahNumbers.forEach(surahNumber => {
    const option = document.createElement('option');
    option.value = surahNumber;
    option.text = `Surah ${surahNumber}`;
    surahSelect.appendChild(option);
  });
}

// Function to display the selected ayah
function displayAyah(surahNumber, ayahNumber) {
  const ayahText = document.getElementById('ayah-text');
  const ayahDisplay = document.getElementById('ayah-display');
  const answerDisplay = document.getElementById('answer-display');

  if (quranDataSample[surahNumber] && quranDataSample[surahNumber][ayahNumber - 1]) {
    ayahText.textContent = quranDataSample[surahNumber][ayahNumber - 1].text;
    ayahDisplay.classList.remove('hidden');
    answerDisplay.classList.add('hidden');
  } else {
    ayahDisplay.classList.add('hidden');
    answerDisplay.classList.add('hidden');
    alert('Invalid ayah number.');
  }
}

// Function to display following ayahs
function displayFollowingAyahs(surahNumber, ayahNumber) {
  const followingAyahs = document.getElementById('following-ayahs');
  followingAyahs.innerHTML = '';

  if (quranDataSample[surahNumber]) {
    for (let i = ayahNumber; i < quranDataSample[surahNumber].length; i++) {
      const listItem = document.createElement('li');
      listItem.textContent = quranDataSample[surahNumber][i].text;
      followingAyahs.appendChild(listItem);
    }
  }
  const answerDisplay = document.getElementById('answer-display');
  answerDisplay.classList.remove('hidden');
}

// Event listeners
const surahSelect = document.getElementById('surah-select');
const pickAyahButton = document.getElementById('pick-ayah');
const checkAnswerButton = document.getElementById('check-answer');

populateSurahSelect();

pickAyahButton.addEventListener('click', () => {
  const selectedSurah = surahSelect.value;
  const currentAyah = 1; // Default to first ayah

  displayAyah(selectedSurah, currentAyah);
  currentSurah = selectedSurah;
});

checkAnswerButton.addEventListener('click', () => {
  if (currentSurah) {
    displayFollowingAyahs(currentSurah, 2);
  }
});
