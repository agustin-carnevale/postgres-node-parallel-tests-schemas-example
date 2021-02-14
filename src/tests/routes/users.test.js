const request = require('supertest');
const buildApp = require('../../app');
const UserRepository = require('../../repos/user-repo');
const Context = require('../context');

let context;

beforeAll(async ()=>{
    context = await Context.build();
});

beforeEach(async ()=>{
    await context.reset();
});

afterAll(()=>{
    return context.close();
});


it('creates a user', async () => {
    const startingCount = await UserRepository.count();

    await request(buildApp())
        .post('/users')
        .send({username: 'testuser', bio: 'test bio'})
        .expect(200);

    const finishCount = await UserRepository.count();
    expect(finishCount).toEqual(startingCount+1);
});