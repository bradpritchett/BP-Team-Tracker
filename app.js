const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the new Employee's Name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the new Employee's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "New Employee's email?"
        },
        {
            type: "list",
            name: "role",
            message: "What is this employee's role?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            when: function (response) {
                return response.role === "Manager"
            },
            type: "input",
            name: "OfficeNumber",
            message: "What is the Manager's Office Number?"

        },
        {
            when: function (response) {
                return response.role === "Engineer"
            },
            type: "input",
            name: "github",
            message: "What is the Engineer's GitHub name?"

        },
        {
            when: function (response) {
                return response.role === "Intern"
            },
            type: "input",
            name: "school",
            message: "Where is the Intern going to school?"

        },
        {
            type: "list",
            name: "addMore",
            message: "Add another employee?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]);
}

function afterPrompt(answers) {

    switch (answers.role) {
        case "Manager":
            const manager = new Manager(answers.name, answers.id, answers.email, answers.OfficeNumber);
            employees.push(manager);
            break;
        case "Engineer":
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer);
            break;
        case "Intern":
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            employees.push(intern);
            break;
    }

    if (answers.addMore === "Yes") {
        console.log("Adding another!")
        promptUser().then(afterPrompt);
    } else {
        console.log("HTML Generated!")
        var html = render(employees);
    }
    fs.writeFileSync("output/team.html", html);
};

promptUser().then(afterPrompt);