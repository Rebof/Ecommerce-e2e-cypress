/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

let user;
let userEmail;

beforeEach(() => {
  cy.visit('/');
  cy.clearCookies();
  cy.clearAllLocalStorage();

  cy.url().should('include', "automationexercise");
  cy.title().should("eq", "Automation Exercise");

  cy.fixture('userInfo').then((userData) => {
    user = userData;
    userEmail = faker.internet.email();
    user.email = userEmail;
  });
});

afterEach(() => {
  cy.visit('/');
  cy.get('body').then($body => {
    if ($body.find("a[href='/logout']").length) {
      cy.get("a[href='/logout']").click();
    }
    cy.url().should("include", "https://www.automationexercise.com/");
  });
});

describe('User Authentication', () => {
  it('Registration with valid details', () => {
    cy.get("a[href='/login']").click();
    cy.get('.signup-form > h2').should("contain", "New User Signup!");
    cy.get("input[placeholder='Name']").type(user.name);
    cy.get("input[data-qa='signup-email']").type(`${user.email}{enter}`);

    cy.get(':nth-child(1) > b').should("have.text", "Enter Account Information");

    cy.get("#id_gender1").check().should("be.visible");
    cy.get('[data-qa="password"]').type(user.password);

    cy.get("#days").type("30");
    cy.get("#months").type("10");
    cy.get("#years").type("2000");

    cy.get("#first_name").type(user.firstname);
    cy.get("#last_name").type(user.lastname);

    cy.get("#address1").type(user.address1);
    cy.get("#address2").type(user.address2);

    cy.get("#country").select(user.country).should("have.value", 'United States');
    cy.get("#state").type(user.state);
    cy.get("#city").type(user.city);
    cy.get("#zipcode").type(user.zipcode);

    cy.get("#mobile_number").type(user.mobile_number).type("{enter}");

    cy.get('b').should("have.text", "Account Created!");

    cy.get('[data-qa="continue-button"]').click();

    cy.get("li:nth-child(10) a:nth-child(1)").should("contain", `Logged in as ${user.name}`);

    cy.deleteAccount();
  });


  it("Login with valid credentials", () => {
    cy.fixture('userInfo').then((userData) => {
      cy.createUserWithApi(user).then(() => {
        cy.log(`Email used for login: ${userData.email}`);

        cy.get("a[href='/login']").click();
        cy.get('.login-form > h2').should("contain", "Login to your account");

        cy.get("input[data-qa='login-email']").type(user.email);
        cy.get("input[placeholder='Password']").type(user.password);
        cy.get("button[data-qa='login-button']").click();

        cy.get("li:nth-child(10) a:nth-child(1)").should("contain", `Logged in as ${user.name}`);

        cy.deleteAccount();
      });
    });
  });


  it("non existent email", () => {
    cy.get("a[href='/login']").click();
    cy.get('.login-form > h2').should("contain", "Login to your account");

    cy.get("input[data-qa='login-email']").type("emaildoesnotexist@gmail.com");
    cy.get("input[placeholder='Password']").type(user.password);
    cy.get("button[data-qa='login-button']").click();

    cy.get('.login-form > form > p')
      .should("contain", "Your email or password is incorrect!")
      .and("be.visible");
  });


  it("Login with valid email but incorrect pw", () => {
    cy.fixture('userInfo').then((userData) => {
      cy.createUserWithApi(user).then(() => {
        cy.log(`Email used for login: ${userData.email}`);

        cy.get("a[href='/login']").click();
        cy.get('.login-form > h2').should("contain", "Login to your account");

        cy.get("input[data-qa='login-email']").type(user.email);
        cy.get("input[placeholder='Password']").type("wrongpassword123");
        cy.get("button[data-qa='login-button']").click();

        cy.get('.login-form > form > p')
          .should("contain", "Your email or password is incorrect!")
          .and("be.visible");
      });
    });
  });

  it("register with existing email", () => {
    cy.fixture('userInfo').then((userData) => {
      cy.createUserWithApi(user).then(() => {
        cy.log(`Email used for login: ${userData.email}`);

        cy.get("a[href='/login']").click();
        cy.get('.signup-form > h2').should("contain", "New User Signup!");
        cy.get("input[placeholder='Name']").type(user.name);
        cy.get("input[data-qa='signup-email']").type(`${user.email}{enter}`);

        cy.get('.signup-form > form > p').should("contain","Email Address already exist!").and("be.visible")

      });
    });
  });

});
