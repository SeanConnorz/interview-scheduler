describe("Should book an interview", () => {
  it("visit the root of the web app", () => {
    cy.visit("/")
  });

  it("should click the add button", () => {
    cy.get('[data-cy=empty]').first().click()
  })

  it("Should enter their name", () => {
    cy.get('[data-cy=input]').type('Monika')
  })
  
  it("Should select interviewer", () => {
    cy.get('[data-cy=interviewer]').click();
  })

  it("Should click the save button", () => {
    cy.contains('Save').click();
  })

  it("Should become an appointment", () => {
    cy.contains('Monika');
  })
});