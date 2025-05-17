// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("deleteAccount", ()=>{
    cy.visit("/")
    cy.get("a[href='/delete_account']").should("be.visible").click()
    cy.get('b').should("contain","Account Deleted!")
    cy.get('[data-qa="continue-button"]').click()
    
})


Cypress.Commands.add("createUserWithApi",(user)=>{

    cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/createAccount',
        form: true,
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
          title: "Mrs",
          birth_date: "30",
          birth_month: "December",
          birth_year: "2000",
          firstname: user.firstname,
          lastname: user.lastname,
          company: user.company,
          address1: user.address1,
          address2: user.address2,
          country: user.country,
          zipcode: user.zipcode,
          state: user.state,
          city: user.city,
          mobile_number: user.mobile_number,

        }
    }).then((response)=>{

        cy.log('API Response:', JSON.stringify(response.body));

        expect(response.status).to.eq(200)

        
    })
})