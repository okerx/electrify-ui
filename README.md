# Electrify UI ⚡️

## Overview

This project was built with scalability in mind.
All the essential UI elements are independent of the main features and tested separately with unit tests
(although we still have small coverage). The main features, on the other hand, are tested with E2E & Integration tests,
to make sure they're working well with the API.


### About the UI elements

- Each element has a variety of styles by default.
- With Emotion's `styled` you can easily override the default styles to make the element suits your specific needs.
- All UI elements built using `React.forwarfRef` to make them easier to control.
- All the UI inherit the closest native HTML element props.
- With `as` prop you can specify the HTML tag of any UI element, e.g., <Button as="a">Link</Button> will render an anchor HTML element
- You can customize some the elements styles using the Theme object.


## Tech Stack

- **Language 🔡** TypeScript
- **Framework ⚛️** React & Next.js
- **Styling 👩‍🎤** Emotion.js
- **Icons 🔣** FontAwesome
- **Data Fetching 📡** Axios & React-Query
- **Forms Handling & Validation 🕵** Formik & Yup
- **Unit Testing 🐙** Jest & Testing Library
- **E2E & Integration Testing 🔄** Cypress
- **Code Styling 💅** Eslint & Prettier

## Setup dev env

```bash
yarn dev # run dev server
yarn build # build for production
yarn build:analyze # analyze dependencies with Webpack Bundle Analyzer
yarn start # run production server (you need to run `yarn build` first)
yarn lint # lining
yarn test:unit # run unit tests in watch mode 
yarn test:unit:ci # run unit tests in CI mode (exit the process on finish)
yarn cypress # run Cypress E2E tests in visual mode
yarn cypress:headless # run Cypress E2E tests in headless mode (for CI env)
yarn e2e # run Cypress visual mode with a dev server
yarn e2e:headless # run Cypress headless mode with a dev server
```

## Project Structure
This project follows Next.js structure. Therefore, there's no `src` folder, all folder belong to the root.

```bash
~ root
  # This is the entry point of our project.
  # This folder structure is used by Next.js for routing.
  -> pages
  
  # contains the features components.
  # typically, each container belongs to a page (route)
  -> containers

  # contains all the common components.
  # basically, the UI components.
  -> componets 
  
  # Layouts are wrapper components for our pages.
  -> layouts
  
  # The app theme definition. e.g., palette, typography, and responsive breakpoints. 
  -> theme
  
  # contains all the API-related types & functions
  # (it could be structured in more efficient way)
  -> api
  
  # Providers take advantage of React Context API to solve common issues.
  # Currently, we have the ConfirmProvider which is an easy way to use confirm dialog in react similar to the native `window.confirm`
  -> providers
  
  # Cypress config & E2E Tests, currently we have a spec for each page
  -> cypress
  
  # set of common helper functions
  -> utils
  
  # set of common helper React hooks
  -> hooks 
  
  # common constants
  -> constatnts
  
  # for static assets to be served on the root
  -> public
  
  # Yup validation schemas used by Formik for form validation 
  -> schemas
```