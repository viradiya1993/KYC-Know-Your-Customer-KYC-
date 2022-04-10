/// <reference types="cypress" />

describe("bulkverification Page", () => {

    before(() => {
        cy.visit('/bulk-verification');
        cy.login();
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage();
        const query = { page: "1", limit: "10" };
        cy.bulkwisetrasactionsAPI(query).as('bulkverificationAPI');
        cy.bulkwisestatic(query).as('bulkverificationstatic');
        cy.visit('/bulk-verification/bulk-record/861093');
        cy.wait(2000);
    })

    it('should check bulkverification page', () => {
        cy.get("#pentransactions").contains('100')
        cy.get("#pentotalcount").contains('1')
    })

    it('should check bulkverification page', () => {
        cy.get("#pervertrasancation").contains('0')
        cy.get("#novercount").contains('0')
    })

    it('should check bulkverification page', () => {
        cy.get("#unpertrasanctions").contains('0')
        cy.get("#unvercount").contains('0')
    })

    it('should check bulkverification page', () => {
        cy.get("#failpertrasancations").contains('0')
        cy.get("#failcounttra").contains('0')
    })

    it('should check bulkverification page', () => {
        cy.get("#successper").contains('0')
        cy.get("#successcount").contains('0')
    })

    it('should check bulkverification page', () => {
        cy.get("#total_count").contains('1')
    })

    it('should check Export File Type', () => {
        cy.get('#SelectExportFile').click();
        cy.get('mat-option').contains('Export as PDF doc').click();
    })

    it('should check Limit per Page', () => {
        const query2 = { page: "1", limit: "20" };
        cy.bulkwisetrasactionsAPI(query2).as('bulkverificationAPI_2');
        cy.get('#SelectPageLimit').click();
        cy.get('mat-option').contains('20').click();
        cy.get('#SelectPageLimit').should('have.text', '20');
    })

    // it('should check Back Button', () => {
    //    // cy.get('#verifyuser').click();
    //     cy.get('.back').click();
    //     cy.restoreLocalStorage();
    //     cy.url().should('eq', Cypress.env("baseUrl")+'/bulk-verification');
    // })

})