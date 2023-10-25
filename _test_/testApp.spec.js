const app = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Test endpoints', () => {
    test('Get server response', async done => {
        const res = await request.get('/')
        expect(res.status).toBe("function")
        done()
    })
})