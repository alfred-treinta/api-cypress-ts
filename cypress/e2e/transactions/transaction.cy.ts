import { 
    HttpMethods,
    HttpStatusCodes
} from '../../support/enums'
import {
    MICROSERVICES,
    HEADERS,
    getDate
 } from '../../support/utils'

describe('Demo: CRUD on transactions', () => {  

    let todayDate = getDate()
    let token: string
    let transaction_id: string

    before(() => {
        cy.request({
            method: HttpMethods.Post,            
            url: `${Cypress.env('FIREBASE_BASE_URL')}${Cypress.env('FIREBASE_TREINTA_APIKEY')}`,
            body: {
                email: `${Cypress.env('FIREBASE_TESTER_USER')}`,
                password: `${Cypress.env('FIREBASE_TESTER_USER_PASSWORD')}`,
                returnSecureToken: true
            }
        }).then((response) => {
            token = response.body.idToken
        })
    })
    it(`POST request to ${MICROSERVICES.TRANSACTIONS.ENDPOINTS.CREATE_TRANSACTION} should create a new transaction`, () => {
      cy.request({
        method: HttpMethods.Post,
        url: `${MICROSERVICES.TRANSACTIONS.PATH}${MICROSERVICES.TRANSACTIONS.ENDPOINTS.CREATE_TRANSACTION}`,
        headers: {
            ...HEADERS,
            'authorization': `Bearer ${token}`
        },
        body: [{
            value: 1,
            is_offline: false,
            user_id: `${Cypress.env('USER_ID')}`,
            store_id: `${Cypress.env('STORE_ID')}`,
            date: todayDate,
            description: "",
            transaction_status_id: 1,
            payment_type_id: 1,
            transaction_type_id: 1,
            contact_id: null
          }]
      }).then((response) => {
        expect(response.status).eql(HttpStatusCodes.Created)
        expect(response.duration).lessThan(1000)
        transaction_id = response.body[0].id
      })
    })

    it(`PUT request to ${MICROSERVICES.TRANSACTIONS.ENDPOINTS.UPDATE_TRANSACTION} should update a specific transaction`, () => {
        cy.request({
            method: HttpMethods.Put,
            url: `${MICROSERVICES.TRANSACTIONS.PATH}${MICROSERVICES.TRANSACTIONS.ENDPOINTS.UPDATE_TRANSACTION}`,
            headers: {
                ...HEADERS,
                'authorization': `Bearer ${token}`
            },
            body: [
                {
                    id: `${transaction_id}`,
                    value: 2,
                    is_offline: false,
                    user_id: `${Cypress.env('USER_ID')}`,
                    store_id: `${Cypress.env('STORE_ID')}`,
                    date: todayDate,
                    description: `Value for transaction updated`,
                    transaction_status_id: 1,
                    payment_type_id: 1,
                    transaction_type_id: 1,
                    contact_id: null

                }
            ]
        }).then((response) => {
            expect(response.status).eql(HttpStatusCodes.Ok);
            expect(response.body[0].value).eql(2)
            expect(response.duration).lessThan(1000)
        })
    })

    it(`Get request to ${MICROSERVICES.TRANSACTIONS.PATH} should return a transaction information`, () => {
        cy.request({
            method: HttpMethods.Get,
            url: `${MICROSERVICES.TRANSACTIONS.PATH}${MICROSERVICES.TRANSACTIONS.ENDPOINTS.GET_TRANSACTION(transaction_id)}`,
            headers: {
                ...HEADERS,
                'authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).eql(HttpStatusCodes.Ok);
            expect(response.duration).lessThan(1000)
        })
    })

    it(`DELETE request to ${MICROSERVICES.TRANSACTIONS.ENDPOINTS.DELETE_TRANSACTION} should delete transaction`, () => {
        cy.request({
            method: HttpMethods.Delete,
            url: `${MICROSERVICES.TRANSACTIONS.PATH}${MICROSERVICES.TRANSACTIONS.ENDPOINTS.DELETE_TRANSACTION}`,
            headers: {
                ...HEADERS,
                'authorization': `Bearer ${token}`
            },
            body: [`${transaction_id}`]
        }).then((response) => {
            expect(response.status).eql(HttpStatusCodes.Ok)
            expect(response.duration).lessThan(1000)
        })
    })

})
