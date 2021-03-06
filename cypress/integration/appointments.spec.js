describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
  });

  it("Should book an interview", () => {
    cy.get('[data-cy=empty]').first().click();

    cy.get('[data-cy=input]').type('Lydia Miller-Jones');
    cy.get('[data-cy=interviewer]').click();

    cy.contains('Save').click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Archie Cohen");
  });

  it("Should edit an interview", () => {
    cy.get('[data-cy=edit]').first().click({force:true});

    cy.get('[data-cy=input]').clear().type('Lydia Miller-Jones');
    cy.get('[data-cy=interviewer]').click();

    cy.contains('Save').click();
    
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first()
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });


});