Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {

    if (!username || !password) {
      cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
      return
    }
  
    cy.request({
      method: 'GET',
      url: 'https://fcbankonlinebankingapi-test.fcc.am/ApplicationUser/GetOTPByType',
      qs: { userName: username },
      headers: {
        'accept': 'text/plain',
        'LanguageId': '1',
        'DeviceId': '19988888',
        'Content-Type': 'text/plain'
      },
      failOnStatusCode: false
    }).then((otpResponse) => {

      cy.visit('https://fcbanking-test.org.fcc.am/auth/login')
      cy.get('[id="username"]').type(username)
      cy.get('[id="password"]').type(password)
      cy.get('[type="submit"]').click()

      cy.get('body').then(($body) => {
        if ($body.find('input[formcontrolname="a"]').length > 0) {
          const otp = otpResponse.body.toString().replace(/\D/g, '')
          cy.get('input[formcontrolname="a"]').type(otp[0])
          cy.get('input[formcontrolname="b"]').type(otp[1])
          cy.get('input[formcontrolname="c"]').type(otp[2])
          cy.get('input[formcontrolname="d"]').type(otp[3])
          cy.contains('button', 'Approve').should('not.be.disabled').click()
          cy.url().should('not.include', 'auth/login')
        }
      })
    })
  })
})