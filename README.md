## Playwright Test Project
This project uses Playwright to automate tests on the Sauce Demo website. 
The project includes scripts to run various tests, including login and adding products to the cart, as well as a report generation script for viewing test results.

## Project Setup
* Prerequisites

Node.js: Make sure you have Node.js installed. You can download it here https://nodejs.org.
Playwright: This project uses Playwright, which will be installed automatically through the devDependencies specified in package.json.

* Installation

1) Clone the repository: 
git clone https://github.com/Noti1602/Playwright_Test_Project.git
cd playwright_test_project

2) Install dependencies:
npm install

## Project Structure
The project includes the following main folders and files:

page-objects/selectors.js Contains selectors for different pages.
tests/: Contains all test files.
tests/Task1/: Includes specific tests for Task 1.
test1.performLogin.spec.js: Tests the login functionality.
test2.addProductToCart.spec.js: Tests the "Add Product to Cart" functionality.

## Available Scripts
The following scripts can be run from the command line:

* Run all tests:
npm run test
Runs all tests in the tests directory.

* Run specific tests:

   - Perform Login:
   npm run test1:performLogin
   Runs the login test (test1.performLogin.spec.js).

   - Add Product to Cart:
   npm run test2:addProductToCart
   Runs the add-to-cart test (test2.addProductToCart.spec.js).

* View Test Report:
npm run report
Opens an HTML report showing the results of the last test run.

## Usage
Running Tests: Use the available scripts to execute specific tests or the entire test suite.
Viewing Reports: After running tests, use npm run report to open the HTML report for a detailed view of test results.

## Dependencies
@playwright/test: Provides the testing framework for Playwright.
@types/node: Provides TypeScript types for Node.js.

## License
This project is licensed under the ISC License.

