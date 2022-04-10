/// <reference types="cypress" />

describe("bulkverification Page", () => {
    
    before(() => {
        cy.visit('/');
        cy.login();
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(2000);
        cy.restoreLocalStorage();
        const query = { page: "1", limit: "10" };
        cy.bulkverificationAPI(query).as('bulkverificationAPI');
        cy.visit('/bulk-verification');
        cy.reload();
    })

    it('should check bulkverification page', () => {
        cy.contains('Bulk Verifications');
    })

    it('should check bulkverification page', () => {
        cy.get("#servicename").contains('NIMC NIN+FINGERPRINT Search')
    })

    it('should check bulkverification page', () => {
        cy.wait('@bulkverificationAPI');
        cy.get("#bulkcount").contains('9');
    })

    it('should check bulkverification page', () => {
        cy.get("#bulkid").click()
        cy.restoreLocalStorage();
        cy.url().should('eq', Cypress.env("baseUrl")+'/bulk-verification/bulk-record/01234RF5TG');
    })

    it('should check Search By verification id', () => {
        cy.get('#bulkverificationid').type('861093').type('{enter}');
        cy.get('@bulkverificationAPI').then((xhr) => {
            expect(xhr.request.body.search).to.eql('861093');
        })
    })

    it('should check Search By status', () => {
        cy.get('#verificationStatus').click();
        cy.get('mat-option').contains('running').click({ force: true });
        cy.get('@bulkverificationAPI').then((xhr) => {
            expect(xhr.request.body.status).to.eql('running');
        })
    })


    it('should check bulkverification page', () => {
        cy.get("#verifyuser").click();
        cy.restoreLocalStorage();
        cy.url().should('eq', Cypress.env("baseUrl")+'/bulk-verification/verify-users');
    })

    it('should check Back Button', () => {
        cy.get('#verifyuser').click();
        cy.get('.back').click({ force: true });
        cy.restoreLocalStorage();
        cy.url().should('eq', Cypress.env("baseUrl")+'/bulk-verification');
    })
})