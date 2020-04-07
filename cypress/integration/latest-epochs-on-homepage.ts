describe('Homepage data feeds', () => {
  it('load with headline and spinner', () => {
    cy.visit('http://localhost:4000/en');
    cy.get('.LandingPage_epochList__2KM8z .DividerWithTitle_title__3SVyG').should('have.text', 'Latest Epochs');
    cy.get('.LandingPage_epochList__2KM8z .LoadingSpinner_small__1szrc').should('be.visible');
  });

  it('shows the latest epochs', () => {
    cy.visit('http://localhost:4000/en');
    cy.get('.LandingPage_epochList__2KM8z .TableBodyRow_row__1ECSK', { timeout: 20000 }).should('have.length', 5);
  });
});
