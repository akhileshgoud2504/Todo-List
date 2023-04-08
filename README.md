# Todo List - Vuejs

The driving goal of the architecture is separation of concerns. Namely:

-  **Presentational components are separated from containers** (aka "components").
    Presentational components are small components that are concerned with *how things look*. Containers usually define whole application screens and are concerned with *how things work*: they include presentational components and wire everything together.

-  **State is managed using global [Vuex](https://vuex.vuejs.org/) stores**.

When applications grow, sharing state and its changes can become very hard. Questions like "How can I access this data?" or "When did this change?" are common, just like passing data around components just to be able to use it in nested components.

With Vuex, state is shared using global *stores*, and changes are predictable: *actions* are applied by *mutations* to the state. While the pattern can be a bit much for small projects, the clear separation of responsibilities and predictability helps with bigger applications.

## Content
The boilerplate contains:

  

- [Vue](https://www.npmjs.com/package/vue/v/2.6.14) (v**2.6.14**)

- [Vuex](https://www.npmjs.com/package/vuex/v/3.6.2) (v**3.6.2**)

-  [Vue Router](https://www.npmjs.com/package/vue-router/v/3.5.1) (v**3.5.1**)

-  [Vue2 Datepicker](https://www.npmjs.com/package/vue2-datepicker) (v**3.11.1**)

-  [Tailwind Css](https://www.npmjs.com/package/tailwindcss) (v**3.3.1**)

-  [moment](https://www.npmjs.com/package/moment) (v**2.29.4**)

## Requirements
    Node.js version 16.0 or higher is required and Vue cli.

## Running the project
    Assuming you have all the requirements installed, you can setup and run the project by running:

-  `npm install` to install the dependencies    
-  `npm run serve` to run the application.

### Run your unit tests
    
-  `npm run test:unit` to check for the unit/component testing for the files.
    
    We can check the coverage from the coverage folder and by opening index.html in icov-report.
    [Note For Reviewers : Here i have wrote testcases for two component to let you know, I have hands on with jest unit/component testing]

