describe('app dashboard', () => {
	beforeEach(() => {
		cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
			statusCode: 200,
			fixture: "urls"
		})
		cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
			statusCode: 201,
			fixture: "url"
		})

		cy.visit('http://localhost:3000/')
	})
  it('should display a header', () => {
    cy.get('h1').should('be.visible')
  })

	it('should display a form', () => {
		cy.get('form').should('be.visible')
		cy.get('form').find('.input-title').should('be.visible')
		cy.get('form').find('.input-url').should('be.visible')
		cy.get('button').should('be.visible')
	})

	it('should display a blurb if no url cards exist', () => {
		cy.get('.url-container').find('.url-card').should('have.length', 0)
		cy.get('.url-container').contains('p', 'No urls yet! Find some to shorten!')
	})

	it('should display existing url cards', () => {
		cy.get('.url-container').find('.url-card').should('have.length', 3)
		cy.get('.url-container').find('#url-card-1').contains('h3', 'Awesome photo')
		cy.get('.url-container').find('#url-card-1').contains('a', 'http://localhost:3001/useshorturl/1')
		cy.get('.url-container').find('#url-card-1').contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
		
		cy.get('.url-container').find('#url-card-2').contains('h3', 'Another photo')
		cy.get('.url-container').find('#url-card-2').contains('a', 'http://localhost:3001/useshorturl/2')
		cy.get('.url-container').find('#url-card-2').contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
	
		cy.get('.url-container').find('#url-card-3').contains('h3', 'And another photo')
		cy.get('.url-container').find('#url-card-3').contains('a', 'http://localhost:3001/useshorturl/3')
		cy.get('.url-container').find('#url-card-3').contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
	})

	it('should be able to fill out form', () => {
		cy.get('form').find('.input-title').type('Fun photo').should('have.value', 'Fun photo')
		cy.get('form').find('.input-url').type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80').should('have.value', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
	})

	it('should be able to shorten link on click and display newUrl card', () => {
		cy.get('.url-container').find('.url-card').should('have.length', 3)

		cy.get('form').find('.input-title').type('Fun photo')
		cy.get('form').find('.input-url').type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
		cy.get('button').click()

		cy.get('.url-container').find('.url-card').should('have.length', 4)
	})
})