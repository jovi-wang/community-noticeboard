import supertest from 'supertest';
import * as dbUser from '../models/User';
import * as dbProfile from '../models/Profile';
import { generateJWT } from '../helper';
import app from '../server';

const dbProfileMockFindByPk = jest.spyOn(dbProfile.Profile, 'findByPk');
const dbProfileMockFindAll = jest.spyOn(dbProfile.Profile, 'findAll');
const dbProfileMockUpdate = jest.spyOn(dbProfile.Profile, 'update');

jest.mock('../sequelize', () => {
  return {
    sequelize: {
      sync: jest.fn(),
    },
  };
});

const request = supertest(app);

process.env.JWT_SECRET = 'test';

describe('GET /api/profiles', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('missing auth header', async () => {
    dbProfileMockFindAll.mockResolvedValueOnce([
      {
        profileId: 'profileId',
        name: 'test name',
      },
    ] as dbProfile.Profile[]);

    const response = await request.get('/api/profiles/');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No authorization headers' });
  });

  test('get all profiles success', async () => {
    dbProfileMockFindAll.mockResolvedValueOnce([
      {
        profileId: 'profileId',
        name: 'test name',
      },
    ] as dbProfile.Profile[]);

    const response = await request.get('/api/profiles/').set({
      authorization: `Bearer ${generateJWT({
        email: 'test@gmail.com',
        profileId: 'profileId',
      } as dbUser.User)}`,
    });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toEqual({
      name: 'test name',
      profileId: 'profileId',
    });
  });
});

describe('GET /api/profile/:profileId', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('get one profile with invalid profileId', async () => {
    dbProfileMockFindByPk.mockResolvedValueOnce(undefined);
    const response = await request.get('/api/profiles/profileId').set({
      authorization: `Bearer ${generateJWT({
        email: 'test@gmail.com',
        profileId: 'profileId',
      } as dbUser.User)}`,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid profileId' });
  });

  test('get one profile success', async () => {
    dbProfileMockFindByPk.mockResolvedValueOnce({
      profileId: 'profileId',
      name: 'test name',
    } as dbProfile.Profile);

    const response = await request.get('/api/profiles/profileId').set({
      authorization: `Bearer ${generateJWT({
        email: 'test@gmail.com',
        profileId: 'profileId',
      } as dbUser.User)}`,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'test name',
      profileId: 'profileId',
    });
  });
});

describe('PUT /api/profile/:profileId', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('update one profile with empty input', async () => {
    const response = await request
      .put('/api/profiles/profileId')
      .send()
      .set({
        authorization: `Bearer ${generateJWT({
          email: 'test@gmail.com',
          profileId: 'profileId',
        } as dbUser.User)}`,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Please provide all fields' });
  });

  test('update one profile with invalid profileId', async () => {
    dbProfileMockFindByPk.mockResolvedValueOnce(undefined);

    const response = await request
      .put('/api/profiles/profileId')
      .send({
        role: 'mom',
        bio: 'bio',
        hobbies: 'hobbies',
      })
      .set({
        authorization: `Bearer ${generateJWT({
          email: 'test@gmail.com',
          profileId: 'profileId',
        } as dbUser.User)}`,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid profileId' });
  });

  test('update one profile success', async () => {
    dbProfileMockFindByPk.mockResolvedValueOnce({
      profileId: 'profileId',
      name: 'test name',
    } as dbProfile.Profile);
    dbProfileMockUpdate.mockResolvedValueOnce(undefined);
    const response = await request
      .put('/api/profiles/profileId')
      .send({
        role: 'mom',
        bio: 'bio',
        hobbies: 'hobbies',
      })
      .set({
        authorization: `Bearer ${generateJWT({
          email: 'test@gmail.com',
          profileId: 'profileId',
        } as dbUser.User)}`,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
