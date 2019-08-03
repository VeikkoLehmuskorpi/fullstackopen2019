/* eslint-disable */
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('can be opened', function() {
    cy.contains('Blogs');
    cy.contains('Users');
  });

  describe('login', function() {
    it('doesnt work with invalid credentials', function() {
      cy.get('#login-username-input').type('wrongusername');
      cy.get('#login-password-input').type('wrongpassword');
      cy.get('#login-submit').click();
      cy.contains('Invalid username or password.');
    });

    it('works with correct credentials', function() {
      cy.get('#login-username-input').type('vlehmuskorpi');
      cy.get('#login-password-input').type('salasana');
      cy.get('#login-submit').click();
      cy.contains('Logged in as vlehmuskorpi');
    });
  });
});
