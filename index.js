const fs = require('fs');
const inquirer = require('inquirer');


// Questions to be used inside inquirer
const questions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your Github username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email adress?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please describe your project.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please write how to install your project. Finish each instruction with comma "," ',
        defualt: 'npm install'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please write how to use your application.'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Write instruction how to contribute in your project.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Specify how to run tests for this project',
        default: 'npm tests'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose the licence for you project.',
        choices: [
            "MIT License", "GNU General Public License (GPL)", "Apache License 2.0",
            "Creative Commons Zero v1.0 Universal", "BSD 2-Clause 'Simplified' License",
            "BSD 3-Clause 'New' or 'Revised' License", "Boost Software License 1.0",
        ]
        
    }

]

// const contains all badges for the license mentioned in questions.
const licenseBadges = {
    "MIT License": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "GNU General Public License (GPL)": "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    "Apache License 2.0": "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "Creative Commons Zero v1.0 Universal": "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
    "BSD 2-Clause 'Simplified' License": "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
    "BSD 3-Clause 'New' or 'Revised' License": "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    "Boost Software License 1.0": "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
  };



function readMeTemplate(answers) {

    const { github, email, title, description, installation, usage, contributing, tests, license} = answers;

    const installationSteps = installation.split(",");
    const instSteps = installationSteps.map(step => `${step.trim()}\n`).join("");
    console.log(instSteps);

    

    
    // This gets the right badge based on user choice.
    const userLicenseBadge = licenseBadges[license] 

    // Break down object of licensebadges and get the link for the license
    const urlRegex = /\((https?:\/\/[^)]+)\)/g;
    const urls = userLicenseBadge.match(urlRegex);
    const licenseUrl = urls ? urls[1] : null;
    
    

    // Returns template of readme
    return readMe = `# ${title}

${userLicenseBadge}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Contributing](#contributing)
- [Questions](#email)

## Installation

${instSteps}

## Usage

${usage}

## License

${license}  [License](${licenseUrl})

## Tests

To run tests, use the following command:

\`\`\`
${tests}
\`\`\`

## Contributing

${contributing}

## Contact

If you got some questions, contact me on : ${email} or ${github}`

}

// Function to write Readme.md file with users anwers.
function writeFile(answers) {
    fs.writeFile("Readme.md", readMeTemplate(answers), (err) => {
        err ? console.error(err) : console.log("Sucess")
    })
}



// Initializer function.
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log("Selected License: ", answers.license);
        writeFile(answers);
    }
    )
    .catch((err) => {
        err ? console.error(err) : console.log("File sucessfuly created!");
    })
}

// Invoking init function to start our script.
init();