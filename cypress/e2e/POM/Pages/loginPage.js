class LoginPage {
  // locators
  usernameInput = () => cy.get('[id="username"]')
  passwordInput = () => cy.get('[id="password"]')
  loginButton = () => cy.get('[type="submit"]')
  errorMessage = () => cy.get('[ng-reflect-ng-switch="ERROR"]')

  // actions
  typeUsername(username) {
    this.usernameInput().type(username)
  }

  typePassword(password) {
    this.passwordInput().type(password)
  }

  clickLogin() {
    this.loginButton().click()
  }

  assertions
  verifyLoginSuccess() {
    cy.url().should('not.include', 'auth/login')
  }

  verifyLoginFailed() {
    cy.url().should('include', 'auth/login')
  }

  verifyLoginButtonDisabled() {
    this.loginButton().should('be.visible').and('be.disabled')
  }
}

export default new LoginPage()