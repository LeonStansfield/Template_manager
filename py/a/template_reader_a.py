'''
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
'''

import json

file_path = "py/templates_a.txt"  # Update with the path to your templates file
output_file = "py/new_templates.json" # Update with the path to your output file

# Read the templates from the file
with open(file_path, "r") as file:
    templates_content = file.read()

# Split the templates by the newline character
template_lines = templates_content.split("\n")

# Process each line and extract the name and content
template_list = []
for line in template_lines:
    line = line.strip()
    if line.startswith("var") and "=" in line:
        parts = line.split("=")
        if len(parts) == 2:
            name = parts[0].replace("var", "").strip()
            content = parts[1].strip().strip('""')
            template_list.append({"name": name, "content": content})

# Convert the list to JSON format
json_data = json.dumps(template_list, indent=2)

# Save the JSON data to a new file
with open(output_file, "w") as file:
    file.write(json_data)

print("New templates file has been created: {}".format(output_file))


file_path = "py/new_templates.json"  # Update with the path to your JSON file

# Prune the new JSON file for other errors in the content
with open(file_path, "r") as file:
    json_data = file.read()

# Replace '\\' with '\'
updated_json_data = json_data.replace("\\\\", "\\")

# Remove random '\' characters but only if they are in the middle of the content
updated_json_data = updated_json_data.replace('", \\"', '", "')

# Save the updated JSON data to the file
with open(file_path, "w", encoding="utf-8") as file:
    file.write(updated_json_data)

print("Content updated successfully in the JSON file.")