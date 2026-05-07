import loginPage from '../pages/loginPage'

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
  })

  it('should login with valid credentials', () => {
    cy.login('055080604', 'Testpass1!')
    loginPage.verifyLoginSuccess()
  })

  it('should not login with invalid username', () => {
  cy.login('wronguser', 'Testpass1!')
  cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
  cy.url().should('include', 'auth/login')
})

it('should not login with invalid password', () => {
  cy.login('055080604', 'wrongpass')
  cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
  cy.url().should('include', 'auth/login')
})

  it('should not login with empty username', () => {
    cy.get('[id="password"]', { timeout: 15000 }).should('be.visible').type('Testpass1!')
    cy.get('[type="submit"]').should('be.disabled')
    cy.url().should('include', 'auth/login')
  })

  it('should not login with empty password', () => {
    cy.get('[id="username"]', { timeout: 15000 }).should('be.visible').type('055080604')
    cy.get('[type="submit"]').should('be.disabled')
    cy.url().should('include', 'auth/login')
  })

  it('should not login with empty credentials', () => {
    cy.get('[type="submit"]').should('be.disabled')
    cy.url().should('include', 'auth/login')
  })

})