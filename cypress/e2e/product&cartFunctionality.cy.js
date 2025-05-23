/// <reference types="cypress" />

beforeEach(() => {
  
  cy.clearAllLocalStorage();
  cy.visit('/');

  cy.get("a[href='/products']").click()
  cy.url().should("include","/products")
})

describe("Product and cart functionality check",()=>{
    it("Verify All products and product detail page",()=>{

        
        cy.get('.features_items .col-sm-4')
                                            .should('have.length.greaterThan', 0)
                                            .each(($el) => {
                                                cy.wrap($el).should('be.visible');
        });
        
        cy.get("a[href='/product_details/1']").click()

        cy.url().should("include","/product_details/1")

        cy.get(':nth-child(5) > span').should("be.visible")

        cy.get('.product-information > :nth-child(3)').should("be.visible")

        cy.get('.product-information > h2').should("be.visible")

        cy.get('.product-information > :nth-child(6)').should("be.visible")

        cy.get('.product-information > :nth-child(7)').should("be.visible")

        cy.get('.product-information > :nth-child(8)').should("be.visible")
    })


    it.only("search for product", ()=>{

        cy.get('#search_product').type("Blue")

        cy.get("#submit_search").click()

        cy.get(".productinfo").should("contain", "Blue Top")

        

        cy.get('.features_items .col-sm-4')
            .should('have.length.greaterThan', 0)
            .each(($el) => {
                cy.wrap($el)
                    .should('be.visible')
                    .find('.productinfo')
                    .then(($info) => {
                        if ($info.text().includes('Blue Top')) {
                            cy.log('Found a product with Blue Top');
                        }
                    });
                });
     
    })


})