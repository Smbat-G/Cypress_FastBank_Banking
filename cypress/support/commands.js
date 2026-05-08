Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {

    if (!username || !password) {
      cy.visit('/auth/login')
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

      cy.visit('/auth/login')
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
  }, {
    cacheAcrossSpecs: true
  })
})




// Cypress.Commands.add('login', (username, password) => {

//   // ======================
//   // 1. START SESSION
//   // ======================
//   cy.session([username, password], () => {

//     // ======================
//     // 2. OPEN LOGIN PAGE
//     // ======================
//     cy.visit('/auth/login')

//     // ======================
//     // 3. ENTER CREDENTIALS
//     // ======================
//     cy.get('[id="username"]').clear().type(username)
//     cy.get('[id="password"]').clear().type(password)

//     cy.get('[type="submit"]').click()

//     // ======================
//     // 4. OTP REQUEST (MATCH POSTMAN EXACTLY)
//     // ======================
//     cy.request({
//       method: 'GET',
//       url: 'https://fcbankonlinebankingapi-test.fcc.am/ApplicationUser/GetOTPByType',
//       qs: {
//         userName: username,
//         type: 5
//       },
//       headers: {
//         accept: 'text/plain',
//         LanguageId: '1',
//         DeviceId: '19988888',

//         // ⚠️ IMPORTANT:
//         // MUST be same cookie as Postman if required
//         // otherwise OTP = null
//         Cookie: 'TS012b6578=01316832ba524efd1fb2e4c1dbafe9c54dd5cf7e7cd1015ad5c38bede8d83b5c5f6916c880f51e7e29b74d2cfa7447a23c9148ab7c'
//       }
//     }).then((response) => {

//       // ======================
//       // 5. DEBUG RESPONSE
//       // ======================
//       cy.log('OTP RESPONSE: ' + JSON.stringify(response.body))

//       // ======================
//       // 6. SAFE OTP EXTRACTION
//       // ======================
//       const otpRaw =
//         response.body?.otp ||
//         response.body?.toString()

//       const otpArray = otpRaw?.match(/\d/g)

//       // 🔥 IMPORTANT: stop test if OTP is missing
//       expect(otpArray, 'OTP must exist from backend').to.not.be.null

//       const otp = otpArray.join('')

//       // ======================
//       // 7. ENTER OTP
//       // ======================
//       cy.get('input[formcontrolname="a"]').type(otp[0])
//       cy.get('input[formcontrolname="b"]').type(otp[1])
//       cy.get('input[formcontrolname="c"]').type(otp[2])
//       cy.get('input[formcontrolname="d"]').type(otp[3])

//       // ======================
//       // 8. APPROVE LOGIN
//       // ======================
//       cy.contains('button', 'Approve')
//         .should('be.enabled')
//         .click()

//       // ======================
//       // 9. VERIFY SUCCESS
//       // ======================
//       cy.url().should('not.include', 'auth/login')
//     })

//   }, {
//     cacheAcrossSpecs: true
//   })
// })


