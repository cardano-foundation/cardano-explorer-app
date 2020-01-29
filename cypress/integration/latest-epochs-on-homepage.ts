describe('Homepage data feeds', () => {
  it('load with headline and spinner', () => {
    cy.visit('http://localhost:4000');
    cy.get('.index_epochList__HFM4V .DividerWithTitle_title__3SVyG').should('have.text', 'Latest Epochs');
    cy.get('.index_epochList__HFM4V .LoadingSpinner_small__1szrc').should('be.visible');
  });

  it('shows the latest epochs', () => {
    cy.visit('http://localhost:4000');
    cy.get('.EpochList_epochListContainer__37rJH .TableBodyRow_row__1ECSK', { timeout: 20000 }).should('have.length', 4);
  });
});
