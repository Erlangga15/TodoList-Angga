describe('Todo Webapp', () => {
  it('Seharusnya berhasil load todo webapp', () => {
    cy.visit('/');
  });
  it('Seharusnya bisa menampilkan daftar tugas', () => {
    cy.get('#list').children().should('have.length', 2);
    cy.get('#list').children().eq(0).should('contain.text', 'Main');
    cy.get('#list').children().eq(1).should('contain.text', 'Makan');
  });
  it('Seharusnya berhasil menambahkan tugas baru', () => {
    cy.get('#todo').type('Belajar');
    cy.get('#todo-form').submit();
    cy.get('#list').children().should('have.length', 3);
    cy.get('#list').children().eq(2).should('contain.text', 'Belajar');
    cy.get('#list').children().eq(2).should('not.have.class', 'todo-done');
  });
  it('Task belum selesai seharusnya centang tidak berwarna hijau dan tugas tidak dicoret', () => {
    cy.get('.checkmark')
      .children()
      .eq(0)
      .should('not.have.class', 'check-done');
    cy.get('.task').children().eq(0).should('not.have.class', 'todo-done');
  });
  it('Seharusnya tugas selesai ketika icon check ditekan', () => {
    cy.get('.checkmark').children().eq(0).click();
    cy.get('.checkmark').children().eq(1).should('have.class', 'check-done');
    cy.get('.task').children().eq(1).should('have.class', 'todo-done');
  });
  it('Seharusnya tugas terhapus ketika icon trash ditekan', () => {
    cy.get('.trash').children().eq(1).click();
    cy.get('#list').children().should('have.length', 2);
  });
});
