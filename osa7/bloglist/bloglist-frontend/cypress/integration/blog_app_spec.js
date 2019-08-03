/* eslint-disable */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/testing/reset');
    const user = {
      name: 'Testi Testaaja',
      username: 'ttestaaja',
      password: 'admin',
    };
    cy.request('POST', 'http://localhost:3002/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('testing db has been successfully cleared', function() {
    cy.get('#login-username-input').type('vlehmuskorpi');
    cy.get('#login-password-input').type('salasana');
    cy.get('#login-submit').click();
    cy.contains('Invalid username or password.');
  });

  it('can be opened', function() {
    cy.contains('Blogs');
    cy.contains('Users');
  });

  describe('login', function() {
    it('doesnt work with invalid credentials', function() {
      cy.get('#login-username-input').type('vlehmuskorpi');
      cy.get('#login-password-input').type('salasana');
      cy.get('#login-submit').click();
      cy.contains('Invalid username or password.');
    });

    it('works with tester credentials', function() {
      cy.get('#login-username-input').type('ttestaaja');
      cy.get('#login-password-input').type('admin');
      cy.get('#login-submit').click();
      cy.contains('Logged in as ttestaaja');
    });
  });
});
