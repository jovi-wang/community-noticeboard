import supertest from 'supertest';
import * as dbUser from '../models/User';
import * as dbPost from '../models/Post';
import * as dbProfile from '../models/Profile';
import { generateJWT } from '../helper';
import app from '../server';

const dbProfileMockFindByPk = jest.spyOn(dbProfile.Profile, 'findByPk');
const dbProfileMockFindAll = jest.spyOn(dbProfile.Profile, 'findAll');

const dbPostMockCreate = jest.spyOn(dbPost.Post, 'create');
const dbPostMockDestroy = jest.spyOn(dbPost.Post, 'destroy');
const dbPostMockFindAll = jest.spyOn(dbPost.Post, 'findAll');

jest.mock('../sequelize', () => {
  return {
    sequelize: {
      sync: jest.fn(),
    },
  };
});

const request = supertest(app);

process.env.JWT_SECRET = 'test';

describe('GET /api/posts', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('get all posts success', async () => {
    dbProfileMockFindAll.mockResolvedValueOnce([
      {
        profileId: 'profileId',
        name: 'test name',
      },
    ] as dbProfile.Profile[]);
    dbPostMockFindAll.mockResolvedValueOnce([
      {
        profileId: 'profileId',
        text: 'text',
      },
    ] as dbPost.Post[]);

    const response = await request.get('/api/posts/').set({
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
      text: 'text',
    });
  });
});

describe('DELETE /api/posts/:postId', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('delete one post success', async () => {
    dbPostMockDestroy.mockResolvedValueOnce(undefined);

    const response = await request.delete('/api/posts/:postId').set({
      authorization: `Bearer ${generateJWT({
        email: 'test@gmail.com',
        profileId: 'profileId',
      } as dbUser.User)}`,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});

describe('POST /api/posts/', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('create post with empty input', async () => {
    const response = await request
      .post('/api/posts')
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

  test('create post invalid profileId in token', async () => {
    dbProfileMockFindByPk.mockResolvedValueOnce(undefined);

    const response = await request
      .post('/api/posts')
      .send({
        date: 'date',
        text: 'text',
      })
      .set({
        authorization: `Bearer ${generateJWT({
          email: 'test@gmail.com',
          profileId: 'profileId',
        } as dbUser.User)}`,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid auth token' });
  });

  test('create one post success', async () => {
    dbProfileMockFindByPk.mockResolvedValueOnce({
      profileId: 'profileId',
      name: 'test name',
    } as dbProfile.Profile);
    dbPostMockCreate.mockResolvedValueOnce(undefined);
    const response = await request
      .post('/api/posts')
      .send({
        date: 'date',
        text: 'text',
      })
      .set({
        authorization: `Bearer ${generateJWT({
          email: 'test@gmail.com',
          profileId: 'profileId',
        } as dbUser.User)}`,
      });
    expect(response.status).toBe(200);
    expect(response.body.profileId).toBe('profileId');
    expect(response.body.text).toBe('text');
    expect(response.body.date).toBe('date');
    expect(response.body.name).toBe('test name');
  });
});
