/// <reference types="cypress" />

describe("Services Page", () => {

    before(() =>{
        cy.visit('/');
        cy.login();
        cy.saveLocalStorage();
    })
    beforeEach(() => {
        cy.wait(2000)
        cy.restoreLocalStorage()
        cy.verificationserviceAPI().as('verificationservice');
        
        const query = { page: "1", limit: "10" };
        cy.wrapperAPI(query).as('wrapper_1');
        
        const query2 = { page: "2", limit: "10" };
        cy.wrapperAPI(query2).as('wrapper_2');

        cy.updateLiveTestValueAPI().as('updateLiveTestValue');
        cy.visit('/services');
        cy.reload();
    })
    
    it('should check title', () => {
        cy.title().should('eq', 'KYC');
        cy.contains('Verify identities in Real time');
        cy.wait('@wrapper_1').then((xhr) => {
            expect(xhr.response.statusCode).to.eql(201);
            expect(xhr.response.body.totalCount).to.eql(11)
        })
    })

    it('should check openGoLiveDialog', () => {
        cy.get('#slide-toggle1005-input').click({ force: true });
        cy.get('@updateLiveTestValue').then((xhr) => {
            expect(xhr.request.body.pk).to.eql("40000147");
            expect(xhr.request.body.wrapperfk).to.eql("1005");
        })
    })

    it('should check openUseServiceDialog', () => {
        cy.get('#openUseServiceDialog_0').click();
        cy.get('h3').should('contain', 'BVN Full Details Service');
    })

    it('should check openDetailsDialog', () => {
        cy.get('#openDetailsDialog_0').click();
        cy.get('h3').should('contain', 'NIN Full Details');
    })

    it('should check open the transaction history', () => {
        cy.get('body > app-root > app-service-dashboard > app-services > div > div > div.services-listing-wrapper.ng-star-inserted > div:nth-child(1) > div > div.bottom-btns > div > button.mat-focus-indicator.mat-menu-trigger.transparent-bg.mat-icon-button.mat-button-base').click({ force: true })
        cy.get('#mat-menu-panel-1 > div > button:nth-child(1)').click({ force: true });
        cy.url().should('include', '/transactions/all');
        cy.get('.back').click({force:true});
        cy.restoreLocalStorage()
        cy.url().should('eq', Cypress.env("baseUrl")+'/services');
    })

    it('should check Search By Name', () => {
        cy.get('#searchByServiceId').type('CAC').type('{enter}');
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.name).to.eql('CAC');
        })
    })
    it('should check Search By BiometricType', () => {
        cy.get('#searchByBiometricType').click();
        cy.get('#mat-option-0').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.biometricEnabled).to.eql(['true']);
        })
        cy.get('#mat-option-1').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.biometricEnabled).to.eql(['true','true']);
        })
        cy.get('#mat-option-2').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.biometricEnabled).to.eql(['true','true','false']);
        })
        cy.get('#mat-option-0').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.biometricEnabled).to.eql(['true','false']);
        })
        cy.get('#mat-option-1').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.biometricEnabled).to.eql(['false']);
        })
        cy.get('#mat-option-2').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.biometricEnabled).to.eql([]);
        })
    })

    it('should check Search By ProviderId', () => {
        cy.get('#searchByProviderId').click();
        cy.get('#mat-option-3').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.verificationServiceProviderId).to.eql(['1']);
        })
        cy.get('#mat-option-4').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.verificationServiceProviderId).to.eql(['1','2']);
        })
        cy.get('#mat-option-5').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.verificationServiceProviderId).to.eql(['1','2','3']);
        })
        cy.get('#mat-option-3').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.verificationServiceProviderId).to.eql(['2','3']);
        })
        cy.get('#mat-option-4').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.verificationServiceProviderId).to.eql(['3']);
        })
        cy.get('#mat-option-5').click({force:true});
        cy.get('@wrapper_1').then((xhr) => {
            expect(xhr.request.body.verificationServiceProviderId).to.eql([]);
        })
    })
})