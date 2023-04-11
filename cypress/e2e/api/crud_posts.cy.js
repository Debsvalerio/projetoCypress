describe('CRUD - Posts', () => {
    
    let postId = ''
    let mensagem = 'Este post foi feito pelo Cypress'
        
    before(() => {

        cy.login(Cypress.env('email'), Cypress.env('password'))
        
    })

    it('cria um post', () => {
        
        cy.request({
            method: 'POST',
            url: '/api/posts',
            body: {
                text: mensagem
            }
        }).then(({ status, body }) => {
            expect(status).to.eq(201)
            expect(body.text).to.eq(mensagem)
            postId = body._id

            cy.testeContrato(testeContratoPOSTPosts, body)
        })
    })


    it('Lê o post', () => {
        
        cy.request({
            method: 'GET',
            url: `/api/posts/${postId}`
        }).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body).to.eq(mensagem)
            expect(body.likes).to.have.lengthOf(0)
        })   
        
    })

    it('Atualiza o post', () => {

        cy.request({
            method: 'PUT',
            url: `/api/posts/${postId}`
        }).then(({ status }) => {
            expect(status).to.eq(200)

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`
            }).then(({ body }) => {
                expect(body.likes).to.have.lengthOf(1)
            })
        })
        
    })

    it('Deleta o post', () => {
        
        cy.request({
            method: 'DELETE',
            url: `/api/posts/${postId}`
        }).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body).to.eq('Post removido')

            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`,
                failOnStatus: false
            }).then(({ status }) => {
                expect(status).to.eq(404)
            })
        })

    })
})