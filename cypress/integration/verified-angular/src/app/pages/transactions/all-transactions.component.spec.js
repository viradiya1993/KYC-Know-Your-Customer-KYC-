/// <reference types="cypress" />

describe("transactions History Page", () => {
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
        cy.visit('/transactions/all');
        cy.reload()
    })
    
    it('should check transaction History page', () => {
        cy.contains('Transactions history');
    })

    it('should check Export File Type', () => {
        cy.get('#SelectExportFile').click();
        cy.get('mat-option').contains('Export as PDF doc').click();
    })

    it('should check Limit per Page', () => {
        const query2 = { page: "1", limit: "20" };
        cy.transactionAPI(query2).as('transaction_2');
        cy.get('#SelectPageLimit').click();
        cy.get('mat-option').contains('20').click();
        cy.get('#SelectPageLimit').should('have.text', '20');
    })

    it('should check Search By TransactionId,UserName and BulkId', () => {
        cy.get('#transactionSearchById').type('VERNG|MVAL|1596819126271').type('{enter}');
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.search).to.eql('VERNG|MVAL|1596819126271');
        })
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

    it('should check Search By TransactionStatus', () => {
        cy.get('#searchByTransactionStatus').click();
        cy.get('mat-option').contains('Successful').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.transactionStatus).to.eql('SUCCESSFUL');
        })
    })

    it('should check Search By VerificationStatus', () => {
        cy.get('#searchByVerificationStatus').click();
        cy.get('mat-option').contains('Pending').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.verificationStatus).to.eql('PENDING');
        })
    })

    it('should check Search By service', () => {
        cy.get('#searchByserviceUsed').click();
        cy.get('#mat-option-22').click({force:true});
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.serviceUsed).to.eql(['960']);
        })
    })

    it('should check Search By TransactionType', () => {
        cy.get('#searchByTransactionType').click();
        cy.get('mat-option').contains('Single').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            expect(xhr.request.body.transactionType).to.eql('Single');
        })
    })

    it('should check Search By Mode', () => {
        cy.get('#filterbyMode').click();
        cy.get('mat-option').contains('TEST').click({ force: true });
        cy.get('@transactionAPI').then((xhr) => {
            // console.log(xhr.request.body)
            expect(xhr.request.body.mode).to.eql('TEST');
        })
    })
})