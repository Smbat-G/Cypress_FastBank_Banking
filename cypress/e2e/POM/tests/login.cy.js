import loginPage from '../pages/loginPage'

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
  })

  it('should login with valid credentials', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    loginPage.verifyLoginSuccess()
  })

  it('should not login with invalid username', () => {
    cy.login('wronguser', Cypress.env('password'))
    cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
    cy.url().should('include', 'auth/login')
  })

  it('should not login with invalid password', () => {
    cy.login(Cypress.env('username'), 'wrongpass')
    cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
    cy.url().should('include', 'auth/login')
  })

  it('should not login with empty username', () => {
    cy.get('[id="password"]').type(Cypress.env('password'))
    cy.get('[type="submit"]').should('be.disabled')
    cy.url().should('include', 'auth/login')
  })

  it('should not login with empty password', () => {
    cy.get('[id="username"]').type(Cypress.env('username'))
    cy.get('[type="submit"]').should('be.disabled')
    cy.url().should('include', 'auth/login')
  })

  it('should not login with empty credentials', () => {
    cy.get('[type="submit"]').should('be.disabled')
    cy.url().should('include', 'auth/login')
  })

})