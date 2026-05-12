import loginPage from '../pages/loginPage'

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.clearAllSessionStorage()
    cy.clearCookies()
    cy.clearLocalStorage()
    Cypress.session.clearAllSavedSessions()
    cy.visit('/auth/login')
  })

  it('should login with valid credentials', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.url().should('not.include', 'auth/login')
  })

  it('should not login with invalid username', () => {
    loginPage.typeUsername('wronguser')
    loginPage.typePassword(Cypress.env('password'))
    loginPage.clickLogin()
    loginPage.verifyLoginFailed()
  })

  it('should not login with invalid password', () => {
    loginPage.typeUsername(Cypress.env('username'))
    loginPage.typePassword('wrongpass')
    loginPage.clickLogin()
    loginPage.verifyLoginFailed()
  })

  it('should not login with empty username', () => {
    loginPage.typePassword(Cypress.env('password'))
    loginPage.verifyLoginButtonDisabled()
  })

  it('should not login with empty password', () => {
    loginPage.typeUsername(Cypress.env('username'))
    loginPage.verifyLoginButtonDisabled()
  })

  it('should not login with empty credentials', () => {
    loginPage.verifyLoginButtonDisabled()
  })

})