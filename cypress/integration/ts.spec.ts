describe("Typescript", () => {
  const add = (x: number, y: number): number => x + y;
  it("can add two numbers with add function", () => {
    cy.wrap({ sum: add(2, 1) }).should("deep.eq", { sum: 3 });
  });
});
