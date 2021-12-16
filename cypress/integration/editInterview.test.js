describe("Should book an interview", () => {
  it("visit the root of the web app", () => {
    cy.visit("/");
  });

  it("should click the edit button", () => {
    cy.get('[data-cy=edit]').first().click({force:true});
  });

  it("Should enter their name", () => {
    cy.get('[data-cy=input]').clear().type('Clarette');
  })
  
  it("Should select interviewer", () => {
    cy.get('[data-cy=interviewer]').click();
  })

  it("Should click the save button", () => {
    cy.contains('Save').click();
  })

  it("Should become an appointment", () => {
    cy.contains('Clarette');
  })
});