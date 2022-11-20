# ServiceClient

Web client for CNSCC.311-Distributed Systems.

## Project Structure
Web pages are in `pages/`, corresponding CSS style sheets are in `pages/styles/`, and scripts are in `src/`.

Here are 4 pages: **index**, **login**, **order_list** and **transaction**. Each of them are single-page web application, sufficient data such as user tokens are shared via cookies.

### Sytle Sheets

`common.css`, `common_small.css` and `common_complex.css` are styles that used in common among the project.

`{page_name}-style.css` are styles that affect specific elements on corrsponding pages.

### Scripts

`util.ts` contains funtions that used widely in this project. `config.ts` and `datatypes.ts` contains important constants and classes for other code to use.

`{page_name}.ts` are scripts for each page. Maily divided into 4 parts: constants and global variables, functions, code main body and event handler registration.

### Pages
- index
  - The welcome page, users can directly continue or specify a custom backend address in case they have another system to use.
- login
  - A simple login page, users can choose to sign up a new account or login an existing account by clicking "Sign Up" button or "Login" button, then filling the required fields.
- order_list
  - A page for displaying what tickets the user have bought, users can book a new ticket by clicking "New Transaction" or cancel an existing order by selecting unwanted orders and clicking "Delete Selected" button.
- transaction
  - A page for displaying available tickets, users can choose a ticket to buy by selecting a ticket and click "Choose Ticket" button, then he or she can pay for the ticket by clicking "Buy Ticket" or discard this operation by clicking "Discard" button. Of course the system doen't have and cannot have the functionality of trading with real money, so this process is simluated by clicking the "Buy Ticket" button.

## Core Dependencies

- crypto-js : https://www.npmjs.com/package/crypto-js
- js-cookie: https://www.npmjs.com/package/js-cookie
- qrcode: https://www.npmjs.com/package/qrcode

## Build & Development
To bundle the application:

- Install Webpack and TSC globally
- Run `npm install` to install all dependencies
- Production build: `npm run build` / `npm run build:prod`
- Dev build: `npm run build:dev`

For development:
```
npm run watch
```
```
npm run serve
```
