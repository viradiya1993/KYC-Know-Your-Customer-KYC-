/// <reference types="cypress" />

describe("bulkverification Page", () => {

    before(() => {
        cy.visit('/bulk-verification');
        cy.login();
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.wait(2000);
        cy.restoreLocalStorage();
        cy.bulkwrapperservice().as('bulkwrapper');
        cy.bulks3service().as('bulkserviceS3');
        cy.bulkverifyresult().as('bulkverify');
        cy.visit('/bulk-verification/verify-users');
        cy.reload();
    })

    it('should check bulkverification page', () => {
        cy.contains('Select options');
    })

    it('should check bulkverification page download excel', () => {
        cy.get('#downlloadexcel').click();
        cy.get('#filesdown').click({ force: true });
        cy.get('.mat-menu-item').contains('Seamfix BVN Service').click({ force: true });
        cy.get('#downexceltem').click({force: true});
        cy.get('@bulkserviceS3').then((xhr) => {
            expect(xhr.request.body.wrapperPk).to.eql('960');
        })
    })

    it('should check bulkverification page upload excel', () => {
        cy.get('#uploadexcel').click();
        cy.get('#filesup').click({ force: true });
        cy.get('.mat-menu-item').contains('Seamfix BVN Service').click({ force: true });
        const filepath = 'files/Seamfix BVN Service.xlsx'
        cy.get('input[type="file"]').attachFile(filepath)
        cy.wait(2000)
        cy.get('#verifyuser').click();
    })

    
    
})