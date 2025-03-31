# Assignment Starter

This program is used as a starting point for assignments in the Data Communication & Networking option for CST as well as the Network Security Applications Development option for BScACS at BCIT.

A yaml file must be passed to the cli program to generate skeleton code, documentation, and a state diagram.

---

## Contributors

Evin Gonzales | QA Lead | CLI Team | [https://github.com/evin-gg]

Ephraim Hsu | Web Team | [https://github.com/ephraimbcit]

Kevin Van Nguyen | Tech Lead | CLI Team | [https://github.com/kvnbanunu]

Lucas Laviolette | Cloud Lead | CLI Team | [https://github.com/lucaslav05]

Matthew Wing | Web Team | [https://github.com/matty-88]

---

## Features

- 6 supported languages for code generation
  - C
  - C++
  - Go
  - Python
  - Java
  - Javascript (Node)
- docx file generation:
  - report.docx
  - design.docx
  - testing.docx
  - user-guide.docx
- A template.yaml file to fill in your project details
- A web page to build your yaml [https://darcy-bcit.github.io/assignment-starter]
- Portable to any system with node

---

## Dependencies
- node
- npm
- graphviz [https://graphviz.org/download/]

---

## Setup & Usage

1. Clone repo
```sh
git clone https://github.com/darcy-bcit/assignment-starter.git
```
2. Change directory to the program you want to run
```sh
cd assignment-starter/cli

or

cd assingment-starter/yaml-builder
```

### CLI
3. Install npm packages
```sh
npm i
```
4. Run program
```sh
node index.js [options]

options:
  -i, --input     Path to a YAML config file
  -o, --output    Output path (default: current directory)
  -g, --generate  What to generate (code, docs, or all)
  -h, --help      Print this usage information
```
### Yaml Builder
You can either use the deployed version at [https://darcy-bcit.github.io/assignment-starter]

or deploy manually:

3. Install npm packages
```sh
npm i
```
4. Run
```sh
npm run start
```
---

## Customization

A blank template.yaml is provided in the root folder of this repository.

---

## Example

An example.yaml is provided in the root folder of this repository.

---
