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


import { faker } from "@faker-js/faker";

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



Cypress.Commands.add("registerUser",(user)=>{

    cy.get(".signup-form > h2").should("contain", "New User Signup!");
    cy.get("input[placeholder='Name']").type(user.name);
    cy.get("input[data-qa='signup-email']").type(`${user.email}{enter}`);

    cy.get(":nth-child(1) > b").should(
      "have.text",
      "Enter Account Information"
    );

    cy.get("#id_gender1").check().should("be.visible");
    cy.get('[data-qa="password"]').type(user.password);

    cy.get("#days").type("30");
    cy.get("#months").type("10");
    cy.get("#years").type("2000");

    cy.get("#first_name").type(user.firstname);
    cy.get("#last_name").type(user.lastname);

    cy.get("#address1").type(user.address1);
    cy.get("#address2").type(user.address2);

    cy.get("#country")
      .select(user.country)
      .should("have.value", "United States");
    cy.get("#state").type(user.state);
    cy.get("#city").type(user.city);
    cy.get("#zipcode").type(user.zipcode);

    cy.get("#mobile_number").type(user.mobile_number).type("{enter}");

    cy.get("b").should("have.text", "Account Created!");

    cy.get('[data-qa="continue-button"]').click(); 

    cy.get("li:nth-child(10) a:nth-child(1)").should(
      "contain",
      `Logged in as ${user.name}`
    ); 
    
})


Cypress.Commands.add("addtocart",()=>{

    cy.get("a[href='/products']").click();
    cy.url().should("include", "/products");
    cy.get(".add-to-cart").first().click();
    cy.get(".modal-footer > .btn").click();
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");
    
    
})


Cypress.Commands.add("verifyAddress", (id, user) => {
  cy.get(id).within(() => {
    cy.get(".address_address1").should("contain", user.address1);
    cy.get('.address_city').should("contain", user.city);
    cy.get('.address_country_name').should("contain", user.country);
  });
});


Cypress.Commands.add("enterPaymentDetails", () => {
  cy.get('[data-qa="name-on-card"]').type("Sanima Bank's Card");
  cy.get('[data-qa="card-number"]').type("12345");
  cy.get('[data-qa="cvc"]').type("4");
  cy.get('[data-qa="expiry-month"]').type("DD");
  cy.get('[data-qa="expiry-year"]').type("2030");
  cy.get('[data-qa="pay-button"]').click();
});
