describe("Should delete interview", () => {
  it("visit the root of the web app", () => {
    cy.visit("/");
  });

  it("should click the delette button", () => {
    cy.get('[data-cy=delete]').first().click({force:true});
  });

  it("Should become an appointment", () => {
    cy.contains('Confirm').click();
  })

  it("Should be empty"), () => {
    cy.get('.schedule').children().first()
    should('have.attr', '[data-cy=empty]');
  }
})