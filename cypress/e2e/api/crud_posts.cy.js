describe('CRUD - Posts', () => {
    
    before(() => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email: 'testeIterasys@iterasys.com',
                password: '123456'
            }
        })

    })
})