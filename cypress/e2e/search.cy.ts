describe('search page', () => {
  it('should show search result after filling search key word', () => {
    cy.visit('/search');
    cy.get('[data-cy="search-result"]').should('not.exist');
    cy.get('[data-cy="search"]').type("mus{enter}");

    // The new url should include "/search?q=musiikkitalo"
    cy.url().should('include', '/search?q=mus')

    .should('exist')

    cy.get('[data-cy="search-result"]').should('exist');
  });

 
})