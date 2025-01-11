const pickAyahButton = document.getElementById('pick-ayah');
  // Add event listener to pick ayah button
  pickAyahButton.addEventListener('click', async () => {
    const selectedSurahId = parseInt(surahSelect.value);
    if (selectedSurahId) {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahId}`);
        const data = await response.json();
        selectedSurahAyahs = data.data.ayahs;
        const randomIndex = Math.floor(Math.random() * selectedSurahAyahs.length);
        const randomAyah = selectedSurahAyahs[randomIndex];
        ayahText.textContent = `${randomAyah.numberInSurah}. ${randomAyah.text}`;
        ayahDisplay.classList.remove('hidden');
        answerDisplay.classList.add('hidden');
      } catch (error) {
        console.error('Error fetching Surah data:', error);
        ayahText.textContent = 'Failed to load Surah data.';
        ayahDisplay.classList.remove('hidden');
      }
    } else {
      ayahText.textContent = 'Please select a Surah.';
      ayahDisplay.classList.remove('hidden');
    }
  });

// Function to handle range selection
function handleRangeSelection() {
  const startSurah = parseInt(startSurahInput.value);
  const endSurah = parseInt(endSurahInput.value);

  if (isNaN(startSurah) || isNaN(endSurah) || startSurah < 1 || endSurah > 114 || startSurah > endSurah) {
    alert("Invalid range. Please enter valid Surah numbers (1-114) and ensure start is less than or equal to end.");
    return;
  }

  surahSelect.innerHTML = ''; // Clear existing options

  for (let i = startSurah; i <= endSurah; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Surah ${i}`;
    surahSelect.appendChild(option);
  }

  pickAyahButton.addEventListener('click', async () => {
    const selectedSurahId = parseInt(surahSelect.value);
    if (selectedSurahId) {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahId}`);
        const data = await response.json();
        selectedSurahAyahs = data.data.ayahs;
        const randomIndex = Math.floor(Math.random() * selectedSurahAyahs.length);
        const randomAyah = selectedSurahAyahs[randomIndex];
        ayahText.textContent = `${randomAyah.numberInSurah}. ${randomAyah.text}`;
        ayahDisplay.classList.remove('hidden');
        answerDisplay.classList.add('hidden');
      } catch (error) {
        console.error('Error fetching Surah data:', error);
        ayahText.textContent = 'Failed to load Surah data.';
        ayahDisplay.classList.remove('hidden');
      }
    } else {
      ayahText.textContent = 'Please select a Surah.';
      ayahDisplay.classList.remove('hidden');
    }
  });
}
// ... (previous code)

// Remove the juz select element
const juzSelect = document.getElementById('juz-select');
if (juzSelect) {
  juzSelect.remove();
}

// ... (rest of the code)
const surahSelect = document.getElementById('surah-select');
const ayahDisplay = document.getElementById('ayah-display');
const ayahText = document.getElementById('ayah-text');
const checkAnswerButton = document.getElementById('check-answer');
const answerDisplay = document.getElementById('answer-display');
const followingAyahsList = document.getElementById('following-ayahs');

let selectedSurahAyahs = [];

// Function to handle range selection
function handleRangeSelection() {
  const startSurah = parseInt(startSurahInput.value);
  const endSurah = parseInt(endSurahInput.value);

  if (isNaN(startSurah) || isNaN(endSurah) || startSurah < 1 || endSurah > 114 || startSurah > endSurah) {
    alert("Invalid range. Please enter valid Surah numbers (1-114) and ensure start is less than or equal to end.");
    return;
  }

  surahSelect.innerHTML = ''; // Clear existing options

  for (let i = startSurah; i <= endSurah; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Surah ${i}`;
    surahSelect.appendChild(option);
  }

  // Add event listener to pick ayah button
  pickAyahButton.addEventListener('click', () => {
    const selectedSurahId = parseInt(surahSelect.value);
    if (selectedSurahId) {
      const randomIndex = Math.floor(Math.random() * surahSelect.options.length);
      const randomSurah = surahSelect.options[randomIndex].value;
      surahSelect.value = randomSurah;
      // ... (rest of the pickAyahButton logic)
    }
  });
}

// Add range selection elements
const rangeSelectionDiv = document.createElement('div');
rangeSelectionDiv.classList.add('controls');
const startSurahLabel = document.createElement('label');
startSurahLabel.textContent = 'Start Surah:';
const startSurahInput = document.createElement('input');
startSurahInput.type = 'number';
startSurahInput.min = 1;
startSurahInput.max = 114;
startSurahInput.id = 'start-surah-input';
const endSurahLabel = document.createElement('label');
endSurahLabel.textContent = 'End Surah:';
const endSurahInput = document.createElement('input');
endSurahInput.type = 'number';
endSurahInput.min = 1;
endSurahInput.max = 114;
endSurahInput.id = 'end-surah-input';
const rangeSelectButton = document.createElement('button');
rangeSelectButton.textContent = 'Select Range';
rangeSelectButton.addEventListener('click', handleRangeSelection);

rangeSelectionDiv.appendChild(startSurahLabel);
rangeSelectionDiv.appendChild(startSurahInput);
rangeSelectionDiv.appendChild(endSurahLabel);
rangeSelectionDiv.appendChild(endSurahInput);
rangeSelectionDiv.appendChild(rangeSelectButton);

const controlsDiv = document.querySelector('.controls');
controlsDiv.insertBefore(rangeSelectionDiv, surahSelect);


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

pickAyahButton.addEventListener('click', async () => {
  const selectedSurahId = parseInt(surahSelect.value);
  if (selectedSurahId) {
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahId}`);
      const data = await response.json();
      selectedSurahAyahs = data.data.ayahs;
      const randomIndex = Math.floor(Math.random() * selectedSurahAyahs.length);
      const randomAyah = selectedSurahAyahs[randomIndex];
      ayahText.textContent = `${randomAyah.numberInSurah}. ${randomAyah.text}`;
      ayahDisplay.classList.remove('hidden');
      answerDisplay.classList.add('hidden');
    } catch (error) {
      console.error('Error fetching Surah data:', error);
      ayahText.textContent = 'Failed to load Surah data.';
      ayahDisplay.classList.remove('hidden');
    }
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
