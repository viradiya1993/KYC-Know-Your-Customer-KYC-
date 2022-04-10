/// <reference types="cypress" />

describe("Dashboard Page", () => {
    before(() => {
        cy.visit('/');
        cy.login();
        cy.saveLocalStorage();
    })
    beforeEach(() => {
        cy.wait(2000);
        cy.restoreLocalStorage()
        cy.dashboardAPI().as('dashboardAPI');
        cy.visit('/dashboard');
        cy.reload();
    })

    it('should check Dashboard page', () => {
        cy.contains('Dashboard');
    })
    it('should check small cards', () => {
        cy.get("#smallcard_h_0").should("contain", 2)
        cy.get("#smallcard_l_0").should("contain", "Total number of service Calls")
        cy.get("#smallcard_h_1").should("contain", 0)
        cy.get("#smallcard_l_1").should("contain", "Number of successful service Calls")
        cy.get("#smallcard_h_2").should("contain", 0)
        cy.get("#smallcard_l_2").should("contain", "Number of failed service Calls")
        cy.get("#smallcard_h_3").should("contain", 1)
        cy.get("#smallcard_l_3").should("contain", "Number of users")
    })
    it('should check small cards view details', () => {
        const query = { page: "1", limit: "10" };
        cy.transactionAPI(query).as('transactionAPI');
        cy.transactionServiceAPI().as('transactionServiceAPI');
        cy.get("#smallcard_menu_button_0").click();
        cy.get(".mat-menu-item").contains("View details").click({ force: true });
        cy.url().should('include', '/transactions/all');
    })

    it('should check big cards', () => {
        cy.get("#bigcard_h_0").should("contain", 100)
        cy.get("#bigcard_l_0").should("contain", "Total wallet balance")
        cy.get("#bigcard_h_1").should("contain", 10)
        cy.get("#bigcard_l_1").should("contain", "Total Wallet Top-up")
        cy.get("#bigcard_h_2").should("contain", 20)
        cy.get("#bigcard_l_2").should("contain", "Total Wallet Debit")
    })

    it('should check Service Request Distribution column chart', () => {
        cy.dashboardFilterAPI().as('dashboardFilterAPI');
        
        cy.get("#colChart_h_0").should("contain", "Service Request Distribution")
       
        cy.get('.columnChart')
            .should('be.visible')
            .and(chart => {
                expect(chart.height()).to.be.greaterThan(200)
            })
        cy.get('.columnChart > div > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-0.highcharts-column-series.highcharts-color-0.highcharts-tracker > rect:nth-child(3)')
        .trigger('mouseover')
        .wait(500)
        cy.get(".columnChart > div > svg > g.highcharts-label.highcharts-tooltip.highcharts-color-0").should('contain', "Seamfix BVN Service: 2")
       
        cy.get("#chartSelectYear").click();
        cy.get(".mat-option").contains(2020).click({ force: true })
        cy.get('@dashboardFilterAPI').then((xhr) => {
            expect(xhr.request.body.filterByYear).to.eql(2020);
        })
    })

    it('should check Service Request Log Pie chart', () => {
        cy.get("#pieChart_h_0").should("contain", "Service request log")
        cy.get('.pieChart > div > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-0.highcharts-pie-series.highcharts-tracker > path.highcharts-point.highcharts-color-0')
            .trigger('mouseover')
            .wait(500)
        cy.get(".pieChart > div > svg > g.highcharts-label.highcharts-tooltip.highcharts-color-0").should('contain', "Successful Request")
        cy.get(".pieChart > div > svg > g.highcharts-label.highcharts-tooltip.highcharts-color-0").should("contain", "75%")
    })

    it('should check progress charts', () => {
        cy.get("#pregress_h_0").should("contain", "Completed bulk verifications")
        cy.get("#pregress_value_0").should("contain", 0)
        cy.get("#pregress_l_0").should("contain", "Number of completed bulk verifications")
        cy.get("#pregress_h_1").should("contain", "Ongoing bulk verifications")
        cy.get("#pregress_value_1").should("contain", 2)
        cy.get("#pregress_l_1").should("contain", "Number of ongoing bulk verifications")
        cy.get("#pregress_h_2").should("contain", "Total bulk verifications")
        cy.get("#pregress_value_2").should("contain", 2)
        cy.get("#pregress_l_2").should("contain", "Number of total bulk verifications")
        cy.get('.progressChart > div > div > div > span > div > span').should("contain", "100%")
    })

    it('should check Completed bulk verifications chart View Details', () => {
        const query = { page: "1", limit: "10" };
        cy.bulkverificationAPI(query).as('bulkverificationAPI');
        cy.get("#progress_menu_button_0").click();
        cy.get(".mat-menu-item").contains("View Details").click({ force: true });
        cy.url().should('include', '/bulk-verification');
    })
})