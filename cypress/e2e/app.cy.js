describe('Navigation', () => {
  it('should navigate to the login page', () => {
    // Start from the index page
    cy.visit('/')
 
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="login"]').click()
 
    // The new url should include "/login"
    cy.url().should('include', '/login')
 
    // The new page should contain an h1 with "About"
    cy.get('h2').contains('Kirjaudu sisään')
  })
})