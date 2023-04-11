import Ajv from 'ajv'

Cypress.Commands.add('login', (email, password) => {
    
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            email,
            password
        }
    }).then(() => {
        Cypress.Cookies.defaults({
            preserve: 'jwt'
        })
    })
})

Cypress.Commands.add('testeContrato', () => {
    //Função que mostra os erros

    const getSchemaError = (ajvErros) => {
        return cy.wrap(
            `Campo: ${ajvErros[0]['instancePath']} é inválido. Erro: ${ajvErros[0]['message']}`
        )
    }

})