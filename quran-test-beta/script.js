// Add following ayahs
const selectedSurah = surahSelect.value;
const ayahIndex = quranData[selectedSurah].indexOf(ayah);
const followingAyahsList = quranData[selectedSurah].slice(ayahIndex + 1, ayahIndex + 4);
followingAyahs.innerHTML = ''; // Clear previous content
followingAyahsList.forEach(ayah => {
const listItem = document.createElement('li');
listItem.textContent = ayah.text;
followingAyahs.appendChild(listItem);
});


answerDisplay.classList.remove('hidden');
answerDisplay.classList.add('visible');
}
});

const checkAnswerButton = document.getElementById('check-answer');
checkAnswerButton.addEventListener('click', () => {
// Add your answer checking logic here
alert("Answer checked!");
ayahDisplay.classList.add('hidden');
answerDisplay.classList.add('hidden');
followingAyahs.innerHTML = ''; // Clear following ayahs
document.getElementById('more-ayahs').classList.add('hidden');
});
if (followingAyahsList.length === 0) {
document.getElementById('more-ayahs').classList.add('hidden');
} else {
document.getElementById('more-ayahs').classList.remove('hidden');
}

answerDisplay.classList.remove('hidden');
answerDisplay.classList.add('visible');
}
});

const checkAnswerButton = document.getElementById('check-answer');

if (!checkAnswerButton) {
  console.error("Error: Element with ID 'check-answer' not found.");
  // Optionally, handle the error more gracefully, e.g., disable a button, display an error message to the user, etc.
}
checkAnswerButton.addEventListener('click', () => {
// Add your answer checking logic here
alert("Answer checked!");
ayahDisplay.classList.add('hidden');
answerDisplay.classList.add('hidden');
followingAyahs.innerHTML = ''; // Clear following ayahs
document.getElementById('more-ayahs').classList.add('hidden');
});

try{(error) => console.error('Error loading Quran data:', error)}

// JavaScript code for the Qur'an Memorization Test
document.addEventListener('DOMContentLoaded', function() {
const surahSelect = document.getElementById('surah-select');
const pickAyahButton = document.getElementById('pick-ayah');
const ayahDisplay = document.getElementById('ayah-display');
const ayahText = document.getElementById('ayah-text');
const checkAnswerButton = document.getElementById('check-answer');
const answerDisplay = document.getElementById('answer-display');
const followingAyahs = document.getElementById('following-ayahs');

// Load Qur'an data
fetch('quran.json')
.then(response => response.json())
.then(quranData => {
// Populate Surah select
for (const surah in quranData) {
const option = document.createElement('option');
option.value = surah;
option.text = `Surah ${surah}`;
surahSelect.appendChild(option);
}

pickAyahButton.addEventListener('click', () => {
const selectedSurah = surahSelect.value;
if (selectedSurah) {
const ayah = quranData[selectedSurah][Math.floor(Math.random() * quranData[selectedSurah].length)];
ayahDisplay.classList.remove('hidden');
ayahDisplay.classList.add('visible');
ayahText.textContent = ayah.text;

// Add following ayahs (replace with your logic)
const followingAyahsList = [ayah];
followingAyahs.innerHTML = ''; // Clear previous content
followingAyahsList.forEach(ayah => {
const listItem = document.createElement('li');
listItem.textContent = ayah.text;
followingAyahs.appendChild(listItem);
});

answerDisplay.classList.remove('hidden');
answerDisplay.classList.add('visible');
}
});

const moreAyahsButton = document.createElement('button');
moreAyahsButton.id = 'more-ayahs';
moreAyahsButton.textContent = 'More Ayahs';
moreAyahsButton.classList.add('hidden');
answerDisplay.appendChild(moreAyahsButton);

moreAyahsButton.addEventListener('click', () => {
const selectedSurah = surahSelect.value;
if (selectedSurah) {
const ayah = quranData[selectedSurah][Math.floor(Math.random() * quranData[selectedSurah].length)];
ayahDisplay.classList.remove('hidden');
ayahDisplay.classList.add('visible');
ayahText.textContent = ayah.text;

const followingAyahsList = quranData[selectedSurah].slice(
quranData[selectedSurah].indexOf(ayah) + 1
);
followingAyahs.innerHTML = ''; // Clear previous content
followingAyahsList.slice(0, 3).forEach(ayah => {
const listItem = document.createElement('li');
listItem.textContent = ayah.text;
followingAyahs.appendChild(listItem);
});

if (followingAyahsList.length < 3) {
document.getElementById('more-ayahs').classList.add('hidden');
} else {
document.getElementById('more-ayahs').classList.remove('hidden');
}

answerDisplay.classList.remove('hidden');
answerDisplay.classList.add('visible');
}
});

// checkAnswerButton.addEventListener('click', () => {
//     // Add your answer checking logic here
//     alert("Answer checked!");
//     ayahDisplay.classList.add('hidden');
//     answerDisplay.classList.add('hidden');
//     followingAyahs.innerHTML = ''; // Clear following ayahs
//     document.getElementById('more-ayahs').classList.add('hidden');
// });
})
.catch(error => console.error('Error loading Quran data:', error));
});
