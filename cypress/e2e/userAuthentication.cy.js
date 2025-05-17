/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

let user;
let userEmail;

beforeEach(()=>{
  cy.visit('/')
    cy.clearCookies()
    cy.clearAllLocalStorage()
  
  cy.url().should('include',"automationexercise")  
  cy.title().should("eq","Automation Exercise")

  cy.fixture('userInfo').then((userData) => {
     user = userData;
     userEmail = faker.internet.email();
     user.email = userEmail;
  })
})



describe('User Authentication', () => {
  it('Registration with valid details', () => {
    cy.get("a[href='/login']").click()
    cy.get('.signup-form > h2').should("contain","New User Signup!")
    cy.get("input[placeholder='Name']").type(user.name)
    cy.get("input[data-qa='signup-email']").type(`${user.email}{enter}`)

    cy.get(':nth-child(1) > b').should("have.text","Enter Account Information")

    cy.get("#id_gender1").check().should("be.visible")
    cy.get('[data-qa="password"]').type(user.password)

    cy.get("#days").type("30")
    cy.get("#months").type("10")
    cy.get("#years").type("2000")

    cy.get("#first_name").type(user.firstname)
    cy.get("#last_name").type(user.lastname)

    cy.get("#address1").type(user.address1)
    cy.get("#address2").type(user.address2)

    cy.get("#country").select(user.country).should("have.value",'United States')
    cy.get("#state").type(user.state)
    cy.get("#city").type(user.city)
    cy.get("#zipcode").type(user.zipcode)

    cy.get("#mobile_number").type(user.mobile_number).type("{enter}")

    cy.get('b').should("have.text","Account Created!")

  })
})
