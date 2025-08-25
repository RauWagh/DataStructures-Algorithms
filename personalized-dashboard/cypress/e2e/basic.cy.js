describe('Dashboard basic flows', () => {
  it('loads and searches', () => {
    cy.visit('/');
    cy.get('input[placeholder*="Search"]').type('test');
    cy.contains(/personalized feed/i).should('exist');
  });
});
