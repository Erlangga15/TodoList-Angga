const { config } = require('../config');
const { connect } = require('../lib/orm');
const { TodoSchema } = require('../todo.model');
const server = require('../server');
const { truncate } = require('../todo');
const fetch = require('node-fetch');
const nock = require('nock');

const getList = async () => {
  const res = await fetch('http://localhost:8000/list', {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
  });
  const response = await res.json();
  return response;
};

describe('Todo Service', () => {
  let connecion;

  beforeAll(async () => {
    connecion = await connect([TodoSchema], config.database);
    server.run();
  });

  beforeEach(async () => {
    nock.cleanAll();
    await truncate();
    await fetch('http://localhost:8000/add', {
      method: 'POST',
      body: JSON.stringify({
        task: 'Test',
        done: false,
      }),
      headers: { 'Content-type': 'application/json' },
    });
  });

  afterAll(async () => {
    await truncate();
    await connecion.close();
    server.stop();
  });

  describe('List', () => {
    it('Seharusnya dapat menampilkan daftar tugas', async () => {
      const res = await fetch('http://localhost:8000/list', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.json();
      expect(response).toHaveLength(1);
      expect(response[0].task).toBe('Test');
    });
    it('Seharusnya error ketika server mati', async () => {
      nock('http://localhost:8000').get('/list').reply(500);
      const res = await fetch('http://localhost:8000/list', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      });
      
      const response = await res.status;
      expect(response).toBe(500);
    });
  });

  describe('Add', () => {
    it('Seharusnya dapat menambah tugas', async () => {
      const res = await fetch('http://localhost:8000/add', {
        method: 'POST',
        body: JSON.stringify({
          task: 'Test 2',
          done: false,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.json();
      expect(response.task).toBe('Test 2');
      const response2 = await getList();
      expect(response2).toHaveLength(2);
    });
    it('Seharusnya error ketika body tidak sesuai', async () => {
      const res = await fetch('http://localhost:8000/add', {
        method: 'POST',
        body: JSON.stringify({
          done: false,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(400);
    });
    it('Seharusnya error ketika server mati', async () => {
      nock('http://localhost:8000').post('/add').reply(500);
      const res = await fetch('http://localhost:8000/add', {
        method: 'POST',
        body: JSON.stringify({
          task: 'Test',
          done: false,
        }),
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(500);
    });
  });

  describe('Done', () => {
    it('Seharusnya dapat menandai tugas selesai', async () => {
      const list = await getList();
      const res = await fetch(`http://localhost:8000/done?id=${list[0].id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.json();
      expect(response.done).toBeTruthy();
    });
    it('Seharusnya error ketika tugas dengan id tertentu tidak ditemukan', async () => {
      const res = await fetch(`http://localhost:8000/done?id=3`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(404);
    });
    it('Seharusnya error ketika id tidak ditemukan', async () => {
      const res = await fetch(`http://localhost:8000/done`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(401);
    });
    it('Seharusnya error ketika server mati', async () => {
      nock('http://localhost:8000').put('/done?id=1').reply(500);
      const res = await fetch(`http://localhost:8000/done?id=1`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(500);
    });
  });

  describe('Undone', () => {
    it('Seharusnya dapat batal menandai tugas selesai', async () => {
      const list = await getList();
      const res = await fetch(`http://localhost:8000/undone?id=${list[0].id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.json();
      expect(response.done).toBeFalsy();
    });
    it('Seharusnya error ketika tugas dengan id tertentu tidak ditemukan', async () => {
      const res = await fetch(`http://localhost:8000/undone?id=3`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(404);
    });
    it('Seharusnya error ketika id tidak ditemukan', async () => {
      const res = await fetch(`http://localhost:8000/undone`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(401);
    });
    it('Seharusnya error ketika server mati', async () => {
      nock('http://localhost:8000').put('/undone?id=1').reply(500);
      const res = await fetch(`http://localhost:8000/undone?id=1`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(500);
    });
  });

  describe('Remove', () => {
    it('Seharusnya dapat menghapus tugas', async () => {
      const list = await getList();
      const res = await fetch(`http://localhost:8000/remove?id=${list[0].id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.json();
      expect(response.done).toBeFalsy();
    });
    it('Seharusnya error ketika tugas dengan id tertentu tidak ditemukan', async () => {
      const res = await fetch(`http://localhost:8000/remove?id=3`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(404);
    });
    it('Seharusnya error ketika id tidak ditemukan', async () => {
      const res = await fetch(`http://localhost:8000/remove`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(401);
    });
    it('Seharusnya error ketika server mati', async () => {
      nock('http://localhost:8000').delete('/remove?id=1').reply(500);
      const res = await fetch(`http://localhost:8000/remove?id=1`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      });
      const response = await res.status;
      expect(response).toBe(500);
    });
  });
});
