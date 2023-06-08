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

import re
import json

def convert_template(text):
    pattern = r'<option title="(.*?)".*?>(.*?)</option>'
    matches = re.findall(pattern, text, re.DOTALL)
    templates = []
    for match in matches:
        name_content = match[0].split("$$")
        template = {
            "name": name_content[0],
            "content": name_content[1].replace("/n", "\n").replace("&amp;", "&").replace("&gt;", ">").replace("&lt;", "<")
        }
        templates.append(template)
    return templates

def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        text = file.read()
    return text

def write_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    input_file = "py/templates_b.txt"
    output_file = "py/formatted_templates_b.json"

    text = read_file(input_file)
    templates = convert_template(text)
    write_json(templates, output_file)

    print("Conversion complete. JSON file generated: email_templates.json")