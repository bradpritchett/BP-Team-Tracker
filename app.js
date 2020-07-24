const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const employees = [];

const util = require("util");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "New Employee's Name?"
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
            const manager = new Manager(answers.name, answers.id, answers.email, answers.OfficeNumber)
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
        console.log(employees)
        console.log("adding another!")
        promptUser().then(afterPrompt)
    } else {
        console.log(employees)
        console.log("Finished adding!")


        // After the user has input all employees desired, call the `render` function (required
        // above) and pass in an array containing all employee objects; the `render` function will
        // generate and return a block of HTML including templated divs for each employee!


        var html = render(employees);

        console.log(html)
    }
    fs.appendFileSync("output/team.html", html);
}

promptUser().then(afterPrompt);


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


//return 