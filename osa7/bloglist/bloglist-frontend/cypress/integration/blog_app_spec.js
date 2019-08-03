/* eslint-disable */
describe('Blog app', function() {
  it('can be opened', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Blogs');
  });
});
