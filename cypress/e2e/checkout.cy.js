/// <reference types="cypress" />

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit("/");

});

describe("order checkout test cases", ()=>{


    it.only('checkout then register', () => {
        
    });

    it('register then checkout=', () => {
        
    });

    it('login then checkout=', () => {
        
    });


    it('checkout then login', () => {
        
    });


})