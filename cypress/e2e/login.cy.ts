describe('register page', () => {
  it('should show validation errors when leaving all fields blank', () => {
    cy.visit('/login');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error-email"]').should('exist');
    cy.get('[data-cy="error-password"]').should('exist');
  });
})