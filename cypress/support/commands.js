

Cypress.Commands.add('login', (username, password) => {

  cy.visit('/auth/login')
  cy.get('[id="username"]').type(username)
  cy.get('[id="password"]').type(password)
  cy.get('[type="submit"]').click()

  // Wait for OTP page to appear FIRST, then request OTP
  cy.get('input[formcontrolname="a"]', { timeout: 10000 }).should('be.visible')

  cy.request({
    method: 'GET',
    url: 'https://fcbankonlinebankingapi-test.fcc.am/ApplicationUser/GetOTPByType',
    qs: {
      userName: Cypress.env('phone'),
      type: 5
    },
    headers: {
      'languageId': '1',
      'deviceId': '25690F0B-8A9A-4923-AB24-03EA3AE22501',
      'Accept': '*/*',
      'Cache-Control': 'no-cache'
    },
    failOnStatusCode: false
  }).then((otpResponse) => {
    const otp = otpResponse.body.result.toString()
    cy.log('OTP: ' + otp)

    cy.get('input[formcontrolname="a"]').clear().type(otp[0])
    cy.get('input[formcontrolname="b"]').clear().type(otp[1])
    cy.get('input[formcontrolname="c"]').clear().type(otp[2])
    cy.get('input[formcontrolname="d"]').clear().type(otp[3])

    cy.get('button[type="submit"]').should('not.be.disabled').click()
  })
})


