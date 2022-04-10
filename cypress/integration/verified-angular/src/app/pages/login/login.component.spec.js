/// <reference types="cypress" />

describe("Login Page", () => { 
    beforeEach(() => {
        cy.visit('/login')
        cy.wait(2000)
    })

    it('should login successful',() => {
        cy.get('input[type="email"]').type('schemeaccnt@gmail.com');
        cy.get('#password').type('Seamfix123$');
    })
})