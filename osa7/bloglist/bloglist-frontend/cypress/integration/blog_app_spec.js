/* eslint-disable */
describe('Blog app, ', function() {
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

  describe('pages', function() {
    it('are rendered', function() {
      cy.contains('Blogs');
      cy.contains('Users');
    });

    it('arent shown without logging in', function() {
      cy.contains('Blogs').click();
      cy.contains('Log in to application');
      cy.contains('Users').click();
      cy.contains('Log in to application');
    });

    it('are shown when logged in', function() {
      cy.get('#login-username-input').type('ttestaaja');
      cy.get('#login-password-input').type('admin');
      cy.get('#login-submit').click();
      cy.contains('Logged in as ttestaaja');

      cy.contains('Blogs').click();
      cy.contains('New blog');
      cy.contains('Users').click();
      cy.url().should('include', '/users');
    });
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

  describe('new blogs', function() {
    it('can be created when logged in', function() {
      cy.get('#login-username-input').type('ttestaaja');
      cy.get('#login-password-input').type('admin');
      cy.get('#login-submit').click();
      cy.contains('Logged in as ttestaaja');

      cy.contains('Blogs').click();
      cy.contains('New blog').click();
      cy.get('#blog-title-input').type('Blog created with Cypress');
      cy.get('#blog-author-input').type('Cypress overlords');
      cy.get('#blog-url-input').type('www.github.com/cypress');
      cy.get('#blog-submit').click();
      cy.contains('A new blog "Blog created with Cypress" added');
      cy.contains('Blog created with Cypress');
    });

    it('cannot be created without logging in', function() {
      cy.contains('Blogs').click();
      cy.contains('Log in to application');
    });
  });
});
