/// <reference types="cypress" />

describe('Cura Make Appointment', () => {

  it('Visit the actual site', () => {
    cy.visit('https://katalon-demo-cura.herokuapp.com/')

    cy.get('#btn-make-appointment').click()

    cy.get('#txt-username').type('John Doe')

    cy.get('#txt-password').type('ThisIsNotAPassword{enter}')

    cy.get('select').select('Hongkong CURA Healthcare Center')

    cy.get('#chk_hospotal_readmission').click()

    cy.get('#radio_program_medicaid').click()

    cy.get('#txt_visit_date').type('22/10/2025')

    cy.get('#txt_comment').click({force:true}).type("Urgent")

    cy.get('#btn-book-appointment').click()


    // Assertions on confirmation page
    cy.get('h2').should('contain.text', 'Appointment Confirmation')
    cy.get('#facility').should('have.text', 'Hongkong CURA Healthcare Center')
    cy.get('#hospital_readmission').should('have.text', 'Yes')
    cy.get('#program').should('have.text', 'Medicaid')
    cy.get('#visit_date').should('have.text', '22/10/2025')
    cy.get('#comment').should('have.text', 'Urgent')
  })


})
