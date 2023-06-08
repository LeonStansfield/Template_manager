/*
Template extension, a web browser extension for easily copying email templates.

Copyright (C) 2023  Leon Stansfield

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const darkModeKey = 'darkModeEnabled';

// Function to set dark mode preference in local storage
function setDarkModePreference(enabled) {
  localStorage.setItem(darkModeKey, enabled);
}

// Function to apply dark mode styles
function enableDarkMode() {
  body.classList.add('dark-mode');
  setDarkModePreference(true);
}

// Function to remove dark mode styles
function disableDarkMode() {
  body.classList.remove('dark-mode');
  setDarkModePreference(false);
}

// Function to toggle dark mode based on user preference
function toggleDarkMode() {
  const isDarkModeEnabled = body.classList.contains('dark-mode');
  if (isDarkModeEnabled) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

// Check if dark mode preference is stored and apply the saved preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const isDarkModePreferenceSet = localStorage.getItem(darkModeKey);
  if (isDarkModePreferenceSet === 'true') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// Toggle dark mode when the button is clicked
darkModeToggle.addEventListener('click', toggleDarkMode);
