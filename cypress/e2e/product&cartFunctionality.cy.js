/// <reference types="cypress" />

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.visit("/");

  cy.get("a[href='/products']").click();
  cy.url().should("include", "/products");
});

describe("Product and cart functionality check", () => {
  it("Verify All products and product detail page", () => {
    cy.get(".features_items .col-sm-4")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el).should("be.visible");
      });

    cy.get("a[href='/product_details/1']").click();

    cy.url().should("include", "/product_details/1");

    cy.get(":nth-child(5) > span").should("be.visible");

    cy.get(".product-information > :nth-child(3)").should("be.visible");

    cy.get(".product-information > h2").should("be.visible");

    cy.get(".product-information > :nth-child(6)").should("be.visible");

    cy.get(".product-information > :nth-child(7)").should("be.visible");

    cy.get(".product-information > :nth-child(8)").should("be.visible");
  });

  it("search for product", () => {
    cy.get("#search_product").type("Blue");

    cy.get("#submit_search").click();

    cy.get(".productinfo").should("contain", "Blue Top");

    cy.get(".features_items .col-sm-4")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .find(".productinfo")
          .then(($info) => {
            if ($info.text().includes("Blue Top")) {
              cy.log("Found a product with Blue Top");
            }
          });
      });
  });

  it("Adding product to the cart and verifying total price", () => {
    const quantity = 1;

    let firstProdName, secondProdName;
    let firstProdPrice, secondProdPrice;
    let cartFirstProdName, cartSecondProdName;
    let cartFirstProdPrice, cartSecondProdPrice;
    let cartFirstProdTotal, cartSecondProdTotal;

    // Get first product info
    cy.get(".features_items .col-sm-4")
      .eq(0)
      .within(() => {
        cy.get(".productinfo p")
          .invoke("text")
          .then((text) => {
            firstProdName = text.trim();
          });
        cy.get(".productinfo h2")
          .invoke("text")
          .then((text) => {
            firstProdPrice = text.replace("$", "").trim();
          });
        cy.get(".add-to-cart").first().click();
      });

    cy.get(".modal-footer > .btn").click();

    // Get second product info
    cy.get(".features_items .col-sm-4")
      .eq(2)
      .within(() => {
        cy.get(".productinfo p")
          .invoke("text")
          .then((text) => {
            secondProdName = text.trim();
          });
        cy.get(".productinfo h2")
          .invoke("text")
          .then((text) => {
            secondProdPrice = text.replace("$", "").trim();
          });
        cy.get(".add-to-cart").first().click();
      });

    cy.get(".modal-footer > .btn").click();

    // Go to cart page
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    // Get first product cart
    cy.get("#product-1").within(() => {
      cy.get(".cart_description h4 a")
        .invoke("text")
        .then((text) => {
          cartFirstProdName = text.trim();
        });

      cy.get(".cart_price p")
        .invoke("text")
        .then((text) => {
          cartFirstProdPrice = text.replace("$", "").trim();
        });

      cy.get(".cart_total .cart_total_price")
        .invoke("text")
        .then((text) => {
          cartFirstProdTotal = text.replace("$", "").trim();
        });
    });

    // Get second produc cart
    cy.get("#product-3").within(() => {
      cy.get(".cart_description h4 a")
        .invoke("text")
        .then((text) => {
          cartSecondProdName = text.trim();
        });

      cy.get(".cart_price p")
        .invoke("text")
        .then((text) => {
          cartSecondProdPrice = text.replace("$", "").trim();
        });

      cy.get(".cart_total .cart_total_price")
        .invoke("text")
        .then((text) => {
          cartSecondProdTotal = text.replace("$", "").trim();
        });
    });

    // Compare product matches with cart info or not
    cy.then(() => {
      // Name checks
      expect(cartFirstProdName).to.eq(firstProdName);
      expect(cartSecondProdName).to.eq(secondProdName);

      expect(cartFirstProdPrice).to.eq(firstProdPrice);
      expect(cartSecondProdPrice).to.eq(secondProdPrice);

      const parsedFirstProdPrice = parseFloat(
        (firstProdPrice + "").replace(/[^0-9.]/g, "")
      );
      const parsedSecondProdPrice = parseFloat(
        (secondProdPrice + "").replace(/[^0-9.]/g, "")
      );
      const parsedCartFirstProdTotal = parseFloat(
        (cartFirstProdTotal + "").replace(/[^0-9.]/g, "")
      );
      const parsedCartSecondProdTotal = parseFloat(
        (cartSecondProdTotal + "").replace(/[^0-9.]/g, "")
      );

      // Total price checks
      expect(parsedCartFirstProdTotal).to.eq(parsedFirstProdPrice * quantity);
      expect(parsedCartSecondProdTotal).to.eq(parsedSecondProdPrice * quantity);

      cy.log("First product matches in cart including total price");
      cy.log("Second product matches in cart including total price");
    });
  });

  it("Verify the product quantity in the cart", () => {
    const quantity = 5;

    cy.get("a[href='/product_details/1']").click();

    cy.url().should("include", "/product_details/1");

    cy.get(":nth-child(5) > span").should("be.visible");

    cy.get("#quantity").clear().type("5");

    cy.get("button[type='button']").click();

    cy.get(".modal-footer > .btn").click();

    // Go to cart page
    cy.get(".shop-menu > .nav > :nth-child(3) > a").click();
    cy.url().should("include", "/view_cart");

    cy.contains(".cart_quantity", quantity);

    cy.get(".cart_quantity")
      .invoke("text")
      .then((text) => {
        expect(Number(text.trim())).to.eq(quantity);
      });
  });

  it.only('remove the cart', () => {
        cy.addtocart()
        

        cy.get("#product-1").should("be.visible")

        cy.get(".cart_quantity_delete").click()

        cy.get('b').should("contain", "Cart is empty!")


    });
});
