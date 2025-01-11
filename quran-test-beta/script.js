let surahSelect = document.getElementById('surah-select');
const pickAyahButton = document.getElementById('pick-ayah');
const ayahDisplay = document.getElementById('ayah-display');
const ayahText = document.getElementById('ayah-text');
const checkAnswerButton = document.getElementById('check-answer');
const answerDisplay = document.getElementById('answer-display');
const followingAyahsList = document.getElementById('following-ayahs');
const darkModeToggle = document.getElementById('darkModeToggle');
/* 
Forget the stupid dark mode thing. For now.

let selectedSurahAyahs = [];
let isDarkMode = true; // Initial state

darkModeToggle.addEventListener('change', () => {
  isDarkMode = darkModeToggle.checked;
  toggleMode();
});

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  if (isDarkMode) {
    console.log("Dark mode enabled")
    document.body.style.backgroundColor = "#212529";
    document.getElementById("ayah-text").style.color = "#FFFFFF";
    document.getElementById("ayah-display").style.backgroundColor = "#495057";
    document.getElementById("answer-display").style.backgroundColor = "#495057";
    document.querySelector(".container").style.backgroundColor = "#343a40";
    document.querySelector("label").style.color = "#fff";
    document.querySelectorAll("select, button").forEach(element => {
      element.style.color = "#fff";
      element.style.borderColor = "#6c757d";
    });
  } else {
    document.body.style.backgroundColor = "#f4f4f4";
    document.getElementById("ayah-text").style.color = "#333";
    document.getElementById("ayah-display").style.backgroundColor = "#fff";
    document.getElementById("answer-display").style.backgroundColor = "#fff";
    document.querySelector(".container").style.backgroundColor = "#fff";
    document.querySelector("label").style.color = "#333";
    document.querySelectorAll("select, button").forEach(element => {
      element.style.color = "#333";
      element.style.borderColor = "#ccc";
    });
  }
}
*/
// Populate Surah dropdown
for (let i = 1; i <= 114; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = `Surah ${i}`;
  surahSelect.appendChild(option);
}

surahSelect.addEventListener('change', async () => {
  const selectedSurahId = parseInt(surahSelect.value);
  if (selectedSurahId) {
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahId}`);
      const data = await response.json();
      selectedSurahAyahs = data.data.ayahs;
    } catch (error) {
      console.error('Error fetching Surah data:', error);
      ayahText.textContent = 'Failed to load Surah data.';
      ayahDisplay.classList.remove('hidden');
    }
  } else {
    selectedSurahAyahs = [];
  }
});

pickAyahButton.addEventListener('click', () => {
  if (selectedSurahAyahs.length > 0) {
    const randomIndex = Math.floor(Math.random() * selectedSurahAyahs.length);
const surahNumber = parseInt(surahSelect.value);
const ayahInSurah = selectedSurahAyahs.find(ayah => ayah.number === randomIndex + 1);
ayahText.textContent = `${randomIndex + 1}. ${ayahInSurah.text}`;
    ayahDisplay.classList.remove('hidden');
    answerDisplay.classList.add('hidden');
  } else {
    ayahText.textContent = 'Please select a Surah.';
    ayahDisplay.classList.remove('hidden');
  }
});

checkAnswerButton.addEventListener('click', () => {
const currentAyahNumber = parseInt(ayahText.textContent.split('. ')[0]);
  if (isNaN(currentAyahNumber)) return;
  followingAyahsList.innerHTML = '';
  const currentSurahId = parseInt(surahSelect.value);
  if (currentSurahId) {
    for (let i = 1; i <= 3; i++) {
const nextAyahNumber = currentAyahNumber + i;
      const nextAyah = selectedSurahAyahs[nextAyahNumber - 1];
      if (nextAyah) {
        const listItem = document.createElement('li');
        listItem.textContent = `${nextAyahNumber}. ${nextAyah.text}`;
        followingAyahsList.appendChild(listItem);
      } else {
        const listItem = document.createElement('li');
        listItem.textContent = `Ayah ${nextAyahNumber} not found.`;
        followingAyahsList.appendChild(listItem);
      }
    }
    answerDisplay.classList.remove('hidden');
  }
});
