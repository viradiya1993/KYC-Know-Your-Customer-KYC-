/// <reference types="cypress" />
import "cypress-localstorage-commands";
import 'cypress-file-upload';

Cypress.Commands.add("verificationserviceAPI", () => {
    cy.intercept({
        method: "GET",
        pathname: "/api/v1/wrapper/verificationservice"
    }, {
        fixture: "verificationservice.json"
    })
})

Cypress.Commands.add("wrapperAPI", (query) => {
    cy.intercept({
        method: 'POST',
        pathname: "/api/v1/wrapper",
        query: {
            "page": query.page,
            "limit": query.limit
        },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }, {
        fixture: "wrapper.json",
        statusCode: 201
    })
})

Cypress.Commands.add("updateLiveTestValueAPI", () => {
    cy.intercept({
        method: 'POST',
        pathname: "/api/v1/wrapper/updateLiveTestValue",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }, {
        fixture: "updateLiveTestValue.json",
        statusCode: 201
    })
})

Cypress.Commands.add("transactionAPI", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/transaction",
        query: {
            "page": query.page,
            "limit": query.limit
        }
    }, {
        fixture: "transaction.json",
        statusCode: 201
    })
})

Cypress.Commands.add("transactionServiceAPI", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/transaction/wrapperservice"
    }, {
        fixture: "transactionService.json",
        statusCode: 201
    })
})

Cypress.Commands.add("dashboardAPI", () => {
    cy.intercept({
        method: 'POST',
        pathname: "/api/v1/dashboard/cards",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }, {
        fixture: "dashboard.json",
        statusCode: 201
    })
})

Cypress.Commands.add("dashboardFilterAPI", () => {
    cy.intercept({
        method: 'POST',
        pathname: "/api/v1/dashboard/barcard/filter",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }, {
        fixture: "dashboardFilter.json",
        statusCode: 201
    })
})

Cypress.Commands.add("checkUserActionAPI", () => {
    cy.intercept({
        method: 'POST',
        pathname: "/api/v1/dashboard/checkuserAction",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }, {
        fixture: "checkUserAction.json",
        statusCode: 201
    })
})
Cypress.Commands.add("bulkverificationAPI", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/bulk-verification",
        query: {
            "page": query.page,
            "limit": query.limit
        },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }, {
        fixture: "bulk-verification-dashboard.json",
        statusCode: 201
    })
})




Cypress.Commands.add("bulkwisestatic", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/bulk-verification/transactionStatistics",
        
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        
    }, {
        fixture: "bulk-verificationstatic.json",
        statusCode: 201
    })
})

Cypress.Commands.add("bulkwisetrasactionsAPI", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/bulk-verification/bulkWiseTransaction",

        query: {
            "page": query.page,
            "limit": query.limit
        },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        
    }, {
        fixture: "bulk-verification-record.json",
        statusCode: 201
    })
})

Cypress.Commands.add("bulkwrapperservice", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/bulk-verification/bulkWrapperService",

        
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        
    }, {
        fixture: "bulk-wrapper.json",
        statusCode: 201
    })
})

Cypress.Commands.add("bulks3service", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/bulk-verification/S3Download",

        
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        
    }, {
        fixture: "bulk-verificationS3.json",
        statusCode: 201
    })
})

Cypress.Commands.add("bulkverifyresult", (query) => {
    cy.intercept({
        method: "POST",
        pathname: "/api/v1/bulk-verification/verify-bulk-records",

        
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        
    }, {
        fixture: "bulk-verify-record.json",
        statusCode: 201
    })
})

Cypress.Commands.add("login", () => {
    cy.setLocalStorage('app-product-id', '6b4cf441-f495-4390-8c88-014b3e193972')
    cy.setLocalStorage('base-context-data', JSON.stringify({"privileges":["CREATE_USERS","SWITCH_TO_LIVE","TOP_UP","USE_BULK","USE_SERVICE_LIVE","USE_SERVICE_TEST","VIEW_BULK","VIEW_SERVICES"],"branch":null,"organization":"d6d230d0-712d-49bf-84a3-2c14fdbf2642","userType":"ORGANIZATION","product":"6b4cf441-f495-4390-8c88-014b3e193972","productUserCategoryBaseId":"0372e9ba-6ee6-4b07-b674-438d4c1c8e8f","productUserCategoryBaseCode":"SFU","productUserCategoryName":"Seamfix User"}))
    cy.setLocalStorage('auth-token', JSON.stringify("eyJraWQiOiIvZHB2ay5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTcxMTI1MDEsInN1YiI6InNjaGVtZWFjY250QGdtYWlsLmNvbSIsImZ1bGxfbmFtZSI6IlBhdGVsIEJyaWplc2giLCJpc3MiOiJzZWFtZml4IiwicGhvbmVfbnVtYmVyIjoiKzkxNzc4ODc3NTU4NCIsImdpdmVuX25hbWUiOiJCcmlqZXNoIiwiZmFtaWx5X25hbWUiOiJQYXRlbCIsImVtYWlsIjoic2NoZW1lYWNjbnRAZ21haWwuY29tIiwidWlyIjoiSDRzSUFBQUFBQUFBQUoxUnkyN2lNQlQ5RjI4SGorell4QTZyS1NoU282bGFSQUpkaktySXNhL0JuVHlRRTdxWXF2OCtoZ2FFbU5WMGQzeGV1dmY2SFRtRFpvZ0t3Z1VRaXhNcU5lYXFzbGlCWmpnaG1zU0tLVW1zUUJQVUgvYmc3MHpqV2pTenF1NWhncFFlM0J1ZzJlQVA0VlYzK2plWWl3aU5jdlVHdkxQdXlJNGUxUStQcWdrWnRGUUQxS0hYT24vaDV0NjlRcjlEWXpvd3ZkNUJBMHJyZHZpeFBYTGZkZGNFZmIvclduZzhOQlg0NFBxV1VDR2tGR0k2bFR5b25kOW14OVZNYkNKR0RNR0NSZ2J6Skt3bXVXSTQwcFJiVTlrbzV0R3h6THMzVjhNV2VqVDc5VEpCdnF2UGNPODdjOUREYW1UZVAwOFdWMXhiemltMlBKbGl6aEtDcFpZU0U4b3JCalJoaWZpMzkrUGxOSmhxM1I4MXVLNjk2ZnpTckxlZHk5dHhyOFc1NnVIL3puSXF1OFMrc2pWYXJOSzdJaTNYZWJyS2c1Zy9aOFhpdml5ZXlvZHNrd2FpZUZxVzYyVUF3VkhPMXc4L1J4ajhtMnlSbm0zWFZKSG1SYUEyV2ZwOFRwendxT2ZvNmdzUnJ4UWxuSEZNSXcyWVQyT0pWY3dVWmxXaWpkVEdDbTFRdU9QSFh6S3lsY0FPQXdBQSIsImlhdCI6MTYxNzEwMTcwMSwiYXV0aF90aW1lIjoxNjE3MTAxNzAxLCJqdGkiOiItODdJd2U3T1hlZnpnMjM4NFJJOVN3In0.YFadoEdbe-ak1mDjOGnYRA60Ymw_kygOBvq2FJgXkyic843DftiMyYXTp56e3P3TqA6fEAO0MClMFnqqYc_Y0HBTigXVf0A7nTPES8EOc83QfCOP5kjbKXutaMvXdBUvzTwb72_O-pv6bVTubftSzcSJ95vykfKfqUKatDJFanAmRqfmPLpO2Xa7j_unKiRS4haCfcXN-JrIQUdy76YiwBlw82r_6SNSxS4T9xs0MtiAyGyBdR-uzOg8Ia6ryfnUs9Edx9jfkDq-DFuQqA7AiGSmrC9B9V3VBhIph5J0eNlU4ZlVBxZwgAG5JJMmUDqLXBjmG_tfce0WkGi1OFs3ZQ"))
    cy.setLocalStorage('user-credential',JSON.stringify({"user":{"id":"17047e0f-918c-4abf-aec3-90c06a3a80f7","superAdmin":false,"active":true,"locked":false,"emailVerified":true,"lastName":"Patel","firstName":"Brijesh","middleName":null,"title":null,"email":"schemeaccnt@gmail.com","gender":null,"phoneNumber":"+917788775584","username":null,"orgId":"d6d230d0-712d-49bf-84a3-2c14fdbf2642","organizationIds":null,"branchId":null,"privileges":[],"roles":[],"productRoles":[{"id":"6b4cf441-f495-4390-8c88-014b3e193972","roles":null,"privileges":[]}],"organizationRoles":[{"id":"d6d230d0-712d-49bf-84a3-2c14fdbf2642","roles":null,"privileges":[]}],"organizationProductRoles":[{"organizationBaseId":"d6d230d0-712d-49bf-84a3-2c14fdbf2642","productBaseId":"6b4cf441-f495-4390-8c88-014b3e193972","privileges":["CREATE_USERS","SWITCH_TO_LIVE","TOP_UP","USE_BULK","USE_SERVICE_LIVE","USE_SERVICE_TEST","VIEW_BULK","VIEW_SERVICES"],"roles":["4ba10434-12ce-4568-a63a-3b9cd8cdf7cd"]}]},"roles":[],"privileges":[]}))
    cy.setLocalStorage('vaadin.statistics.firstuse', 1617101480980)
    cy.setLocalStorage('prefered-language', 'en')
    cy.setLocalStorage('current-context', JSON.stringify({"productBaseId":"6b4cf441-f495-4390-8c88-014b3e193972","productName":"Verified","productUserCategoryBaseId":"0372e9ba-6ee6-4b07-b674-438d4c1c8e8f","productUserCategoryCode":"SFU","productUserCategoryName":"Seamfix User","privileges":["CREATE_USERS","SWITCH_TO_LIVE","TOP_UP","USE_BULK","USE_SERVICE_LIVE","USE_SERVICE_TEST","VIEW_BULK","VIEW_SERVICES"],"roleBaseIds":["4ba10434-12ce-4568-a63a-3b9cd8cdf7cd"],"selected":true}))
    cy.setLocalStorage('vaadin.statistics.basket', JSON.stringify({"elements":{"@vaadin/router":{"firstUsed":1617096032255,"version":"1.7.4","lastUsed":1617096032255}},"frameworks":{"Angular":{"firstUsed":1617096032255,"version":"11.1.2","lastUsed":1617096032255},"LitElement":{"firstUsed":1617096032255,"version":"2.4.0","lastUsed":1617096032255},"LitHtml":{"firstUsed":1617096032255,"version":"1.3.0","lastUsed":1617096032255}},"themes":{}}))
    cy.setLocalStorage('all-category',  JSON.stringify([{"default":true,"type":"ORGANIZATION","baseId":"d6d230d0-712d-49bf-84a3-2c14fdbf2642","name":"TEST ORGANISATION","organizationVerificationStatus":false,"contexts":[{"productBaseId":"6b4cf441-f495-4390-8c88-014b3e193972","productName":"Verified","productUserCategoryBaseId":"0372e9ba-6ee6-4b07-b674-438d4c1c8e8f","productUserCategoryCode":"SFU","productUserCategoryName":"Seamfix User","privileges":["CREATE_USERS","SWITCH_TO_LIVE","TOP_UP","USE_BULK","USE_SERVICE_LIVE","USE_SERVICE_TEST","VIEW_BULK","VIEW_SERVICES"],"roleBaseIds":["4ba10434-12ce-4568-a63a-3b9cd8cdf7cd"]}]}]))
    cy.setLocalStorage('current-category', JSON.stringify({"default":true,"type":"ORGANIZATION","baseId":"d6d230d0-712d-49bf-84a3-2c14fdbf2642","name":"TEST ORGANISATION","organizationVerificationStatus":false,"contexts":[{"productBaseId":"6b4cf441-f495-4390-8c88-014b3e193972","productName":"Verified","productUserCategoryBaseId":"0372e9ba-6ee6-4b07-b674-438d4c1c8e8f","productUserCategoryCode":"SFU","productUserCategoryName":"Seamfix User","privileges":["CREATE_USERS","SWITCH_TO_LIVE","TOP_UP","USE_BULK","USE_SERVICE_LIVE","USE_SERVICE_TEST","VIEW_BULK","VIEW_SERVICES"],"roleBaseIds":["4ba10434-12ce-4568-a63a-3b9cd8cdf7cd"],"selected":true}]}))
    cy.setLocalStorage('setReturnUrl', '/')
    // window.localStorage.setItem('app-product-id', '6b4cf441-f495-4390-8c88-014b3e193972')
    // window.localStorage.setItem('base-context-data', JSON.stringify({ "privileges": ["CREATE_USERS", "SWITCH_TO_LIVE", "TOP_UP", "USE_BULK", "USE_SERVICE_LIVE", "USE_SERVICE_TEST", "VIEW_BULK", "VIEW_SERVICES"], "branch": null, "organization": "104e9221-ecef-44f8-bca9-3f99e6ff81bb", "userType": "ORGANIZATION", "product": "6b4cf441-f495-4390-8c88-014b3e193972", "productUserCategoryBaseId": "0372e9ba-6ee6-4b07-b674-438d4c1c8e8f", "productUserCategoryBaseCode": "SFU", "productUserCategoryName": "Seamfix User" }))
    // window.localStorage.setItem('auth-token', "eyJraWQiOiIvZHB2ay5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTY3NzIzNzUsInN1YiI6Im9sYW1pZGVhamFoQGdtYWlsLmNvbSIsImZ1bGxfbmFtZSI6IkFqYWggT2xhbWlkZSIsImlzcyI6InNlYW1maXgiLCJwaG9uZV9udW1iZXIiOiIrMjM0NzA1NzE5MjAwOCIsImdpdmVuX25hbWUiOiJPbGFtaWRlIiwiZmFtaWx5X25hbWUiOiJBamFoIiwiZW1haWwiOiJvbGFtaWRlYWphaEBnbWFpbC5jb20iLCJ1aXIiOiJINHNJQUFBQUFBQUFBSjFSd1c3aU1CVDhGMThYcitMWVNXeE9TMUdrUmxzVlJBSTlyS3JveFg2bTdpWUVKYUdIcmZydmEyaEFpRDF0YitPWmVhTTN6Ky9FR1RJbE1vcENYbUZNSXdtYUNoRXpxakFHR29lSkFSdEZzUVpHSnFRLzdMR2JtY2J0eU5SQzNlT0VnQjdjRzVMcDBCMzhxMjcxYnpRWEVSdHc5UVk3WjkyUkhUM1FENC9RK0JreWU0VVhIMnRkZDZFV05UVE9JQm1IUGROK011QzlQN1pIN3J0dUc2L3ZYOW9kUGg2YUNqdnYraFp5a1FSUndsUVlCTkxMYmJmTmp0VllJRkNGSWFPbzBmcHFWdEpLZzZMY0tsL1JXc21xNnBqV3VUZFg0eFo3TXYzMVBDRmRXNS9odm12TlFRK3JrWG4vUEZsY0NXMkZZTlFLRlZIQlZVQ2xscElHVEZRY21lSXFDZi9KL1hnK0xRWTc5d2NHMSs1dU1yKzA2MjNtOG5iZGEvRU9ldnkvczV6Q0xtTmZhVTNtcTNSV3BPVTZUMWU1Ri9PbnJKamZsOFdpZk1nMnFTZUt4YkpjTHozd2p2SnUvZkJ6aE42L3llYnAyWFpORldsZWVHcVRwVS9uaVJNZTlaeGNmU0VSRmZpNlhGQVdhcVFpaWlXRm1BUGxsZEpHYW1NVGJZaS80OGRmaFc3b0FBNERBQUE9IiwiaWF0IjoxNjE2NzYxNTc1LCJhdXRoX3RpbWUiOjE2MTY3NjE1NzUsImp0aSI6Ims0djJkX1d4U0JRN2Nvbm93NVV3VFEifQ.XurbGlZbw2t8vpWNmnRCo9-_aw6ZEpix3gEC-wn9gBd4V58f46k-Zshona6908L8lIq5tSj2BWSza9LVGLQq5D8gwxKYQ5e_QEEknoJ0rXWdOAF3UVG-XnAYJj3FLhyANE1NnSCnrOCUdPpQC4_MWe0bF39LyZNylqzVaFqEO8mkoi7gW2yXlwIAdYr5uI7zKsQsJjwryGsR9NSKh74Qao_S-rAo2wb8D4OLnsl9EK6-RJ_0xgBKMv5PJKyKIzXMPTDqxBptlAjyXVmbwYnI8e5JjmNLonFCQ4Q-uigAos6Q4AM7qTLj-_5ap7DR-_0TUUsliQoK1CvcpEgFAyeaGw")
    // window.localStorage.setItem('user-credential',{user:{id:'62a238ad-2a62-45fb-ae38-ba7a0a66b6f6'}})
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


