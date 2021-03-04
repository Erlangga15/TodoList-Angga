describe('Todo Webapp', () => {
  it('Seharusnya dapat membuka halaman todo', () => {
    cy.visit('/');
  });

  describe('List', () => {
    it('Seharusnya dapat menampilkan daftar tugas', () => {
      cy.intercept(
        { pathname: '/list', method: 'GET' },
        {
          body: [
            { id: 1, task: 'Makan', done: false },
            { id: 2, task: 'Ngoding', done: false },
          ],
          statusCode: 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      ).as('getList');
      cy.visit('/');
      cy.wait('@getList');
      cy.get('#list').children().as('todoList');
      cy.get('@todoList').should('have.length', 2);
      cy.get('@todoList').eq(0).should('contain.text', 'Makan');
      cy.get('@todoList').eq(1).should('contain.text', 'Ngoding');
    });

    it('Seharusnya tidak menampilkan daftar tugas ketika server mati', () => {
      cy.intercept(
        { pathname: '/list', method: 'GET' },
        {
          statusCode: 500,
        }
      ).as('getList');
      cy.visit('/');
      cy.wait('@getList');
      cy.get('#list').should('be.empty');
    });
  });

  describe('Add', () => {
    beforeEach(() => {
      cy.intercept('/list', { fixture: 'todos.json' }).as('getList');
    });

    it('Seharusnya tugas bertambah ketika submit tugas baru', () => {
      cy.intercept(
        { pathname: '/add', method: 'POST' },
        {
          body: { id: 3, task: 'Belajar', done: false },
          statusCode: 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('input#todo').type('Belajar');
      cy.get('#todo-form').submit();
      cy.get('#list').children().as('todoList');
      cy.get('@todoList').should('have.length', 3);
      cy.get('@todoList').eq(2).should('contain.text', 'Belajar');
    });

    it('Seharusnya tugas tidak bertambah ketika submit input tugas kosong', () => {
      cy.intercept(
        { pathname: '/add', method: 'POST' },
        {
          body: { id: 3, done: false },
          statusCode: 400,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('input#todo').type(' ');
      cy.get('#todo-form').submit();
      cy.get('#list').children().as('todoList');
      cy.get('@todoList').should('have.length', 2);
    });
  });

  describe('Done', () => {
    beforeEach(() => {
      cy.intercept('/list', { fixture: 'todos.json' }).as('getList');
    });

    it('Seharusnya tugas dicoret ketika menekan icon centang pada tugas yang belum selesai', () => {
      cy.intercept(
        { pathname: '/done', method: 'PUT' },
        { body: { id: 1, task: 'Makan', done: true } }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('.task').children().eq(0).should('not.have.class', 'todo-done');
      cy.get('.checkmark').children().eq(0).should('not.have.class', 'check-done');
      cy.get('.checkmark').children().eq(0).click();
      cy.get('.task').children().eq(0).should('have.class', 'todo-done');
    });
    it('Seharusnya tugas tidak dicoret ketika server mati', () => {
      cy.intercept(
        { pathname: '/done', method: 'PUT' },
        { body: { id: 1, task: 'Makan', done: true }, statusCode: 500 }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('.task').children().eq(0).should('not.have.class', 'todo-done');
      cy.get('.checkmark').children().eq(0).should('not.have.class', 'check-done');
      cy.get('.checkmark').children().eq(0).click();
      cy.get('.checkmark').children().eq(0).should('not.have.class', 'check-done');
      cy.get('.task').children().eq(0).should('not.have.class', 'todo-done');
    });
  });

  describe('Undone', () => {
    beforeEach(() => {
      cy.intercept('/list', { fixture: 'todos.json' }).as('getList');
    });

    it('Seharusnya tugas tidak dicoret ketika menekan icon centang pada tugas yang telah selesai', () => {
      cy.intercept(
        { pathname: '/undone', method: 'PUT' },
        { body: { id: 2, task: 'Ngoding', done: false } }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('.checkmark').children().eq(1).should('have.class', 'check-done');
      cy.get('.task').children().eq(1).should('have.class', 'todo-done');
      cy.get('.checkmark').children().eq(1).click();
      cy.get('.task').children().eq(1).should('not.have.class', 'todo-done');
      cy.get('.task').children().eq(1).should('not.have.class', 'todo-done');
    });
    it('Seharusnya tugas tetap dicoret ketika server mati', () => {
      cy.intercept(
        { pathname: '/undone', method: 'PUT' },
        { body: { id: 2, task: 'Ngoding', done: false }, statusCode: 500 }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('.task').children().eq(1).should('have.class', 'todo-done');
      cy.get('.checkmark').children().eq(1).should('have.class', 'check-done');
      cy.get('.checkmark').children().eq(1).click();
      cy.get('.checkmark').children().eq(1).should('have.class', 'check-done');
      cy.get('.task').children().eq(1).should('have.class', 'todo-done');
    });
  });

  describe('Remove', () => {
    beforeEach(() => {
      cy.intercept('/list', { fixture: 'todos.json' }).as('getList');
    });

    it('Seharusnya tugas dihapus ketika menekan icon trash pada tugas yang ingin dihapus', () => {
      cy.intercept(
        { pathname: '/remove', method: 'DELETE' },
        { body: { id: 2, task: 'Ngoding', done: true } }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('.trash').children().eq(1).click();
      cy.get('#list').children().should('have.length', 1);
    });
    it('Seharusnya batal menghapus tugas ketika server mati', () => {
      cy.intercept(
        { pathname: '/remove', method: 'DELETE' },
        { body: { id: 2, task: 'Ngoding', done: true }, statusCode: 500 }
      );
      cy.visit('/');
      cy.wait('@getList');
      cy.get('.trash').children().eq(1).click();
      cy.get('#list').children().should('have.length', 2);
    });
  });
});
