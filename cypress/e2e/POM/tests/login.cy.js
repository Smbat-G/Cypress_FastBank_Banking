import loginPage from '../pages/loginPage'

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit('/auth/login')
  })

  it('should login with valid credentials', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    loginPage.verifyLoginSuccess()
  })

  it('should not login with invalid username', () => {
    cy.login('wronguser', Cypress.env('password'))
    cy.visit('/auth/login')
    loginPage.verifyLoginFailed()
  })

  it('should not login with invalid password', () => {
    cy.login(Cypress.env('username'), 'wrongpass')
    cy.visit('/auth/login')
    loginPage.verifyLoginFailed()
  })

  it('should not login with empty username', () => {
    loginPage.typePassword(Cypress.env('password'))
    loginPage.verifyLoginButtonDisabled()
    loginPage.verifyLoginFailed()
  })

  it('should not login with empty password', () => {
    loginPage.typeUsername(Cypress.env('username'))
    loginPage.verifyLoginButtonDisabled()
    loginPage.verifyLoginFailed()
  })

  it('should not login with empty credentials', () => {
    loginPage.verifyLoginButtonDisabled()
    loginPage.verifyLoginFailed()
  })

})
