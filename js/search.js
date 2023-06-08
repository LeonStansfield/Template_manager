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

document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const templateList = document.getElementById("templateList");
  let templates = []; // Declare the 'templates' variable globally

  searchBox.addEventListener("input", () => {
    const searchTerm = searchBox.value.trim();
    if (searchTerm === "") {
      templateList.innerHTML = "";
      return;
    }
    const results = searchTemplates(searchTerm);
    displayTemplates(results);
  });

  fetchTemplates(); // Fetch templates from the JSON file

  function fetchTemplates() {
    try {
      const cachedTemplates = JSON.parse(localStorage.getItem('templates')) || [];
      templates = cachedTemplates;
    } catch (error) {
      console.error('Error fetching templates:', error);
      templates = [];
    }
  }

  function searchTemplates(searchTerm) {
    if (searchTerm === "") {
      return [];
    }
    return templates.filter((template) => {
      const templateName = template.name.toLowerCase();
      //const templateContent = template.content.toLowerCase();
      return (
        templateName.includes(searchTerm.toLowerCase())
        // Re-add if you want to search in the content as well as the name
        // || templateContent.includes(searchTerm.toLowerCase())
      );
    });
  }

  function displayTemplates(templates) {
    templateList.innerHTML = "";
  
    if (templates.length === 0) {
      const noResultsItem = document.createElement("li");
      noResultsItem.textContent = "No matching templates found.";
      templateList.appendChild(noResultsItem);
    } else {
      const maxResults = 25; // Maximum number of results to display
      const limitedTemplates = templates.slice(0, maxResults);
  
      limitedTemplates.forEach((template) => {
        const templateItem = document.createElement("li");
        const templateName = document.createElement("h3");
        const templateContent = document.createElement("p");
        const copyButton = document.createElement("button");
        const openButton = document.createElement("button");
  
        templateName.textContent = template.name;
        templateContent.textContent = truncateContent(template.content, 100); // Truncate the content to a specific length
        copyButton.textContent = "Copy";
        openButton.textContent = "Open";
        copyButton.classList.add("button");
        openButton.classList.add("button");
  
        copyButton.addEventListener("click", () => {
          copyToClipboard(template.content);
        });

        openButton.addEventListener("click", () => {
          openTemplateInNewTab(template.content);
        });
  
        templateItem.appendChild(templateName);
        templateItem.appendChild(templateContent);
        templateItem.appendChild(copyButton);
        templateItem.appendChild(openButton);
        templateList.appendChild(templateItem);
      });
  
      if (templates.length > maxResults) {
        const remainingCount = templates.length - maxResults;
        const remainingItem = document.createElement("li");
        remainingItem.textContent = `+ ${remainingCount} more templates...`;
        templateList.appendChild(remainingItem);
      }
    }
  }
  

  function truncateContent(content, maxLength) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }

  function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  }

  function openTemplateInNewTab(content) {
    const templateWindow = window.open("", "_blank");
    templateWindow.document.open();
    templateWindow.document.write(`<pre>${content}</pre>`);
    templateWindow.document.close();
  }

});

