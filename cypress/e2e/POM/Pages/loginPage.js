class LoginPage {
  // locators
  usernameInput = () => cy.get('[id="username"]')
  passwordInput = () => cy.get('[id="password"]')
  loginButton = () => cy.get('[type="submit"]')
  errorMessage = () => cy.get('[ng-reflect-ng-switch="ERROR"]')

  // assertions
  verifyLoginSuccess() {
    cy.url().should('not.include', 'auth/login')
  }

verifyLoginFailed() {
  cy.url().should('include', 'auth/login')
  this.errorMessage().should('be.visible')
}
}

export default new LoginPage()