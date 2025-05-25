/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

let user;
let userEmail;

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit("/");

  cy.fixture("userInfo").then((userData) => {
    user = userData;
    userEmail = faker.internet.email();
    user.email = userEmail;
  });
});

describe("order checkout test cases", () => {
  it("checkout then register", () => {
    cy.addtocart();
    cy.get(".modal-body > :nth-child(2) > a > u").click(); // clicking he register
    cy.registerUser(user);
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click(); //click cart
    cy.get(".btn.btn-default.check_out").click(); // checkout again

    cy.verifyAddress("#address_delivery", user);

    cy.get(".form-control").type("GOOD PRODUCT");
    cy.get(":nth-child(7) > .btn").click(); // place the order

    cy.url().should("include", "/payment");

    cy.enterPaymentDetails();


    cy.get('[data-qa="order-placed"] > b').should("be.visible"); // order placed title showing

    cy.get('[data-qa="continue-button"]').click();

    cy.deleteAccount();
  });

  it("register then checkout=", () => {
    cy.get("a[href='/login']").click();
    cy.get(".signup-form > h2").should("contain", "New User Signup!");
    cy.registerUser(user);
    cy.addtocart();
    cy.verifyAddress("#address_delivery", user);

    cy.get(".form-control").type("GOOD PRODUCT");
    cy.get(":nth-child(7) > .btn").click(); // place the order

    cy.url().should("include", "/payment");

    cy.enterPaymentDetails();


    cy.get('[data-qa="order-placed"] > b').should("be.visible"); // order placed title showing

    cy.get('[data-qa="continue-button"]').click();

    cy.deleteAccount();
  });

  it("login then checkout", () => {
    cy.createUserWithApi(user).then(() => {
      cy.log(`Email used for login: ${user.email}`);

      cy.get("a[href='/login']").click();
      cy.get(".login-form > h2").should("contain", "Login to your account");

      cy.get("input[data-qa='login-email']").type(user.email);
      cy.get("input[placeholder='Password']").type(user.password);
      cy.get("button[data-qa='login-button']").click();

      cy.get("li:nth-child(10) a:nth-child(1)").should(
        "contain",
        `Logged in as ${user.name}`
      );

      cy.addtocart();

      cy.verifyAddress("#address_delivery", user);
      cy.get(".form-control").type("GOOD PRODUCT");
      cy.get(":nth-child(7) > .btn").click(); // place the order

      cy.url().should("include", "/payment");

      cy.enterPaymentDetails();


      cy.get('[data-qa="order-placed"] > b').should("be.visible"); // order placed title showing

      cy.get('[data-qa="continue-button"]').click();

      cy.deleteAccount();
    });
  });
});
