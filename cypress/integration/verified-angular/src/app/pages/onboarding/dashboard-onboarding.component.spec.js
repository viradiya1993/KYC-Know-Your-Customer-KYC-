/// <reference types="cypress" />

describe("onboarding Page", () => {
    before(() =>{
        cy.visit('/');
        cy.login();
        cy.saveLocalStorage();
    })
    beforeEach(() => {
        cy.wait(2000);
        cy.restoreLocalStorage()
        cy.checkUserActionAPI().as('checkUserActionAPI');
        cy.visit('/onboarding');
        cy.reload();
    })
    
    it('should check onboarding page', () => {
        cy.contains('Dashboard');
        cy.contains('Welcome to Verified Onboarding');
    })

    it('should check step invite other users',() => {
        cy.get("#invitedUser_id").click();
        cy.url().should("include","/users")
    })
 
   

    it('should check step use a service in test mode',() => {
        cy.verificationserviceAPI().as('verificationservice');
        
        const query = { page: "1", limit: "10" };
        cy.wrapperAPI(query).as('wrapper_1');
        
        const query2 = { page: "2", limit: "10" };
        cy.wrapperAPI(query2).as('wrapper_2');

        cy.get("#modeTest_id").click();
        cy.url().should("include","/services")
    })

    it('should check step use a service in live mode',() => {
        cy.verificationserviceAPI().as('verificationservice');
        
        const query = { page: "1", limit: "10" };
        cy.wrapperAPI(query).as('wrapper_1');
        
        const query2 = { page: "2", limit: "10" };
        cy.wrapperAPI(query2).as('wrapper_2');

        cy.get("#modeLive_id").click();
        cy.url().should("include","/services")
    })

    it('should check documnentation Button',() => {
        cy.get("#doc_id").should('have.attr', 'href', 'https://verifiedng.readme.io/')
        cy.get("#doc_id").should('have.attr', 'target', '_blank');
    })
})