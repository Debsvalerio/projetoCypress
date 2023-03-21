describe('API - Profile', () => {
   
    context('todos os perfis', () => {
        
        it('valida a API de perfis', () => {
            
            cy.request({
                method: 'GET',
                url: '/api/profile',    
            }).then(respostaAPI => {
                expect(respostaAPI.status).to.eq(200),
                expect(respostaAPI.duration).to.be.lessThan(10000)
            })
        })
    })
})