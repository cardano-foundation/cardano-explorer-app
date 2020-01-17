describe('Latest Epochs on Homepage', () => {
  it('load with headline and spinner', () => {
    cy.visit('http://localhost:4000');
    cy.get('.index_epochList .DividerWithTitle_title').should('have.text', 'Latest Epochs');
    cy.get('.index_epochList .LoadingSpinner_small').should('be.visible');
  });

  it('show a table with five epochs', () => {
    cy.visit('http://localhost:4000');
    cy.get('.EpochList_epochListContainer .TableBodyRow_row', { timeout: 20000 }).should('have.length', 5);
  });
});
