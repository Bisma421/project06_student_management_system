#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// method 
class student {
    static counter = 10000;
    id: number;
    name: string;
    balance: number;
    courses: string[];
    
    constructor (name:string){
        this.id = student.counter++;
        this.name = name;
        this.balance = 500;
        this.courses = [];
    }

    // method to enroll in courses
    enrollCourse(course: string){
        this.courses.push(course);
    }

    // method to view balance
    viewBalance(){
        console.log(`\nStudent ${this.name} Balance: $${this.balance}\n`);
    }

    // method to pay fees
    payFees(amount: number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`\nRemaining Balance: $${this.balance}\n`);
    }

    // method to show student status
    viewStatus(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Balance: $${this.balance}`);
        console.log(`Course: ${this.courses}`);
     }

}

// child class
class student_management{
    students: student[]

    constructor(){
        this.students = [];
    }

    // method to add students
    add_students(name: string){
        let students = new student(name);
        this.students.push(students);
        console.log(`\nStudent ${name} added successfully. Student ID: ${students.id}\n`);
    }

    // method to enroll in courses
    enroll_students(student_id: number, course: string){
        let student = this.find_student(student_id);
        if (student){
            student.enrollCourse(course);
            console.log(`\nStudent ${student.name} enrolled in ${course} course successfully\n`);
        }
    }

    // method to view balance
    view_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.viewBalance();
        }
        else{
            console.log("\nStudent not found. Please enter a correct student ID\n")
        }
    }

    // method to pay fees
    pay_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if (student){
            student.payFees(amount);
        }
        else {
            console.log("\nStudent not found. Please enter a correct student ID\n")
        }
    }

    // method to view student status
    view_status(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.viewStatus();
        }
    }

    // method to view all students

    // method to find student by student id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    }
}

// main function
async function main(){

    console.log(chalk.bold.green("\n\tStudent Management System\n"));
    
    let student = new student_management();

    while(true){
        let choice = await inquirer.prompt([
             {
                 type: "list",
                 name: "choice",
                 message: "Select an option:",
                 choices: ["Add Student", "Enroll Student", "View Balance", "Pay Fees", "View Status", "Exit"]
             }
        ]);
        
        // using Switch case to handle user choice 
        switch(choice.choice){
            case "Add Student":
                let name = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter student Name:"
                    }
                ]);
                student.add_students(name.name);
                break;

            case "Enroll Student":
                let course_input = await inquirer.prompt([
                     {
                        name: "id",
                        type:"number",
                        message: "Enter student ID:"
                    },
                    {
                        name:"course",
                        type:"input",
                        message: "Enter course Name:"
                    }
                ]);
                student.enroll_students(course_input.id, course_input.course);
                break;

            case "View Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "id",
                        type:"number",
                        message: "Enter student ID:"
                    }
                ]);
                student.view_balance(balance_input.id);
                break;
            
            case "Pay Fees":
                let fees = await inquirer.prompt([
                    {
                        name: "id",
                        type:"number",
                        message: "Enter student ID:"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay:"
                    }
                ]);
                student.pay_fees(fees.id, fees.amount );
                break;

            case "View Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "id",
                        type:"number",
                        message: "Enter student ID:"
                    }
                ]);
                student.view_status(status_input.id);
                break;

            case "Exit":
                console.log("Exiting...");
                process.exit();
               
        } 
    }
}

main();