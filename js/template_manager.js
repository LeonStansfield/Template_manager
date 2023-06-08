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

// Function to fetch templates from local storage
function fetchTemplates() {
  try {
    const templates = JSON.parse(localStorage.getItem('templates')) || [];
    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
}

// Function to save templates to local storage
function saveTemplates(templates) {
  try {
    localStorage.setItem('templates', JSON.stringify(templates));
    console.log('Templates saved successfully');
  } catch (error) {
    console.error('Error saving templates:', error);
  }
}

// Function to handle creating a new template
function createTemplate() {
  const templateName = document.getElementById('template-name').value;
  const templateContent = document.getElementById('template-content').value;

  // Fetch existing templates
  const templates = fetchTemplates();

  // Add the new template
  templates.push({
    name: templateName,
    content: templateContent,
  });

  // Save the updated templates
  saveTemplates(templates);

  //clear the input fields
  document.getElementById('template-name').value = '';
  document.getElementById('template-content').value = '';
}

// Function to download JSON file
function downloadJSONFile(data, filename) {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Function to handle downloading the templates file
function downloadTemplates() {
  const templates = fetchTemplates();
  downloadJSONFile(templates, 'templates.json');
}

// Function to handle clearing the templates
function clearTemplates() {
  // Warning message that this will clear all templates, and prompt for confirmation
  const confirmation = confirm('Are you sure you want to clear all templates? This cannot be undone. Your templates will be downloaded first so you can back them up.');
  if (!confirmation) {
    return;
  }
  downloadTemplates()
  localStorage.removeItem('templates');
  console.log('Templates cleared successfully');
}

function handleUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      const templates = JSON.parse(contents);
      saveTemplates(templates);
      console.log('Templates uploaded successfully');
    };
    reader.readAsText(file);
  }
}

// Search functions
// Function to filter templates based on search query
function filterTemplates(query) {
  const templates = fetchTemplates();
  const filteredTemplates = templates.filter((template) => {
    const templateName = template.name.toLowerCase();
    return templateName.includes(query.toLowerCase());
  }).slice(0, 25); // Limit the filtered results to the first 25 templates
  return filteredTemplates;
}


// Function to render the search results
function renderSearchResults(templates) {
  const templateList = document.getElementById('templateList');
  templateList.innerHTML = '';

  templates.forEach((template) => {
    const listItem = document.createElement('li');
    listItem.textContent = template.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      deleteTemplate(template.name);
    });

    listItem.appendChild(deleteButton);
    templateList.appendChild(listItem);
  });
}

// Function to delete a template
function deleteTemplate(templateName) {

  // Warning message that this will delete the template, and prompt for confirmation
  const confirmation = confirm(`Are you sure you want to delete the template "${templateName}"? This cannot be undone.`);

  // Fetch existing templates
  const templates = fetchTemplates();

  // Find the index of the template to delete
  const index = templates.findIndex(template => template.name === templateName);

  if (index !== -1) {
    // Remove the template from the array
    templates.splice(index, 1);
    // Save the updated templates
    saveTemplates(templates);
    // Re-render the search results
    const searchQuery = searchBox.value;
    const filteredTemplates = filterTemplates(searchQuery);
    renderSearchResults(filteredTemplates);
    console.log(`Template "${templateName}" deleted successfully`);
  } else {
    console.log(`Template "${templateName}" not found`);
  }

  // clear search box
  searchBox.value = '';
}

// Event listener for the create button
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', createTemplate);

// Event listener for the download button
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', downloadTemplates);

// Event listener for the clear button
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearTemplates);

// Event listener for the upload button
const uploadButton = document.getElementById('upload-templates');
uploadButton.addEventListener('click', () => {
  console.log('Upload button clicked');
  const fileInput = document.getElementById('file-input');
  fileInput.click();
});

// Event listener for the file input change event
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', handleUpload);

// Event listener for the search input field
const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('keyup', () => {
  const searchQuery = searchBox.value;
  const filteredTemplates = filterTemplates(searchQuery);
  renderSearchResults(filteredTemplates);
});