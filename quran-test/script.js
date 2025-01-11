const surahSelect = document.getElementById('surah-select');
const pickAyahButton = document.getElementById('pick-ayah');
const ayahDisplay = document.getElementById('ayah-display');
const ayahText = document.getElementById('ayah-text');
const checkAnswerButton = document.getElementById('check-answer');
const answerDisplay = document.getElementById('answer-display');
const followingAyahsList = document.getElementById('following-ayahs');

let selectedSurahAyahs = [];

// Populate Surah dropdown
for (let i = 1; i <= 114; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = `Surah ${i}`;
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
    const randomAyah = selectedSurahAyahs[randomIndex];
    ayahText.textContent = `${randomAyah.numberInSurah}. ${randomAyah.text}`;
    ayahDisplay.classList.remove('hidden');
    answerDisplay.classList.add('hidden');
  } else {
    ayahText.textContent = 'Please select a Surah.';
    ayahDisplay.classList.remove('hidden');
  }
});

checkAnswerButton.addEventListener('click', () => {
  const currentAyahNumber = parseInt(ayahText.textContent.split('. ')[0]);
  followingAyahsList.innerHTML = '';
  const currentSurahId = parseInt(surahSelect.value);
  if (currentSurahId) {
    for (let i = 1; i <= 3; i++) {
      const nextAyahNumber = currentAyahNumber + i;
      const nextAyah = selectedSurahAyahs.find(ayah => ayah.numberInSurah === nextAyahNumber);
      if (nextAyah) {
        const listItem = document.createElement('li');
        listItem.textContent = `${nextAyah.numberInSurah}. ${nextAyah.text}`;
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
