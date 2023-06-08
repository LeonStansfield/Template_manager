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

/*
// Initialize extension, runs once when extension is first loaded
console.log('Extention initialisation started...');

// This function runs only once when the extension is first loaded.
function init() {
  console.log('This message is logged only once.');

  
  // For each template in the list of templates (stored in templates.json)
  fetch('templates.json')
    .then(response => response.json())
    .then(templates => {
      // Create a new template for each entry
      templates.forEach(template => {
        createTemplate(template.name, template.content);
      });
    })
    .catch(error => {
      console.error('Error fetching templates:', error);
    });
}

// Function to handle creating a new template
function createTemplate(templateName, templateContent) {
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

init();
*/