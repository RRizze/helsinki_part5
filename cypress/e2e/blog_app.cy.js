describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'root',
      name: 'root',
      password: '123',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('/');
  });

  it('Login form is shown', function() {
    cy.contains('password');
    cy.contains('username');
  });

  describe('Login', function() {
    it('login failed with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('123');
      cy.get('#login-button').click();

      cy.contains('root logged in');
    })

    it('login failed with wrong credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong_password');
      cy.get('#login-button').click();

      cy.get('.error').contains('Wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('when user logged in', function() {
    // assume that user exists
    beforeEach(function() {
      cy.login({ username: 'root', password: '123' });
    });

    it('a new blog can be crated', function() {
      cy.contains('New blog').click();
      cy.get('#blog-title-input').type('a blog created by cypress');
      cy.get('#blog-author-input').type('cypress');
      cy.get('#blog-url-input').type('cypress.com');
      cy.get('#add-blog').click();
      cy.contains('a blog created by cypress');
    });

    describe('and blog exists', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'first blog of cypress',
          author: 'root',
          url: 'someurl1.com'
        });
        cy.addBlog({
          title: 'second blog of cypress',
          author: 'root',
          url: 'someurl2.com'
        });
        cy.addBlog({
          title: 'third blog of cypress',
          author: 'root',
          url: 'someurl3.com'
        });
      });

      it('can have 1 like', function() {
        cy.contains('second blog of cypress').parent().as('parent');
        cy.get('@parent').parent().find('#blog-show').click();
        cy.get('@parent').parent().find('#add-like').click();

        cy.get('@parent').parent()
          .contains('1');
      });

      it('can be deleted by user who created it', function() {
        cy.contains('second blog of cypress').parent().as('parent');
        cy.get('@parent').parent().find('#blog-remove').click();

        cy.get('.blog').should(($lis) => {
          expect($lis).to.have.length(2);
        });
      });

      it('checks that blogs are ordered according to likes from max to min', function() {
        cy.contains('second blog of cypress').parent().as('parent');
        cy.get('@parent').parent().find('#blog-show').click();
        cy.get('@parent').parent().find('#add-like').click();
        cy.visit('blogs');
        cy.get('.blog').eq(0).should('contain', 'second blog of cypress');
      });
    });
  })

  describe('Delete blog', function() {
    it('only creater of a blog can see the delete button', function() {
      // create second user bob
      const user = {
        username: 'bob',
        name: 'bob',
        password: '123',
      };
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
      cy.visit('/');

      // login and create blogs as root
      cy.login({ username: 'root', password: '123' });

      cy.addBlog({
        title: 'first blog of cypress',
        author: 'root',
        url: 'someurl1.com'
      });
      cy.addBlog({
        title: 'second blog of cypress',
        author: 'root',
        url: 'someurl2.com'
      });
      cy.addBlog({
        title: 'third blog of cypress',
        author: 'root',
        url: 'someurl3.com'
      });

      // logout and login as bob
      cy.get('#logout').click();
      cy.visit('/');
      cy.login({ username: 'bob', password: '123' });
      cy.contains('second blog of cypress').parent()
        .should('not.have.id', '#blog-remove');
    });
  });

});
