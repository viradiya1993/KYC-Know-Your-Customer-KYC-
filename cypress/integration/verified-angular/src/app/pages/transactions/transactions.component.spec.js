/// <reference types="cypress" />

describe("transactions Page", () => {
    before(() =>{
        cy.visit('/');
        cy.login();
        cy.saveLocalStorage();
    })
    beforeEach(() => {
        cy.wait(2000);
        cy.restoreLocalStorage()
        const query = { page: "1", limit: "10" };
        cy.transactionAPI(query).as('transactionAPI');
        cy.transactionServiceAPI().as('transactionServiceAPI');
        cy.visit('/transactions');
        cy.reload();
    })
    
    it('should check transaction page', () => {
        cy.contains('Transactions');
    })

    it('should call transaction-all Page By View All button', () => {
        cy.get('#transactionsAll').click();
        cy.url().should('include', 'all');
    })

    it('should call transaction-all Page By Image', () => {
        cy.get('#goToTransactionAll').click();
        cy.url().should('include', 'all');
    })
    
    it('should check Search By Date', () => {
        let todaysDate = Cypress.moment().format('YYYY-MM-DD');
        let yesterday = Cypress.moment().add(-1, 'days').format('YYYY-MM-DD');
        let lastWeek = Cypress.moment().add(-6, 'days').format('YYYY-MM-DD');
        cy.get('#DateRange').click({ force: true });
        cy.get('.ng-star-inserted').contains('Today').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.fromDate).to.eql(todaysDate);
        })
        cy.get('#DateRange').click({ force: true });
        cy.get('.ng-star-inserted').contains('Yesterday').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.fromDate).to.eql(yesterday);
        })
        cy.get('#DateRange').click({ force: true });
        cy.get('.ng-star-inserted').contains('Last 7 Days').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.fromDate).to.eql(lastWeek);
            expect(xhr.request.body.toDate).to.eql(todaysDate);
        })
    })
    it('should check Back Button', () => {
        cy.get('#transactionsAll').click();
        cy.get('.back').click();
        cy.restoreLocalStorage();
        cy.url().should('eq', Cypress.env("baseUrl")+'/transactions');
    })
})