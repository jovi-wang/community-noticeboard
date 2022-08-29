import supertest from 'supertest';
import * as dbUser from '../models/User';
import * as dbProfile from '../models/Profile';
import { hashPassword, generateJWT } from '../helper';
import app from '../server';

const dbUserMockFindByPk = jest.spyOn(dbUser.User, 'findByPk');
const dbUserMockCreate = jest.spyOn(dbUser.User, 'create');
const dbProfileMockFindByPk = jest.spyOn(dbProfile.Profile, 'findByPk');
const dbProfileMockCreate = jest.spyOn(dbProfile.Profile, 'create');

jest.mock('../sequelize', () => {
  return {
    sequelize: {
      sync: jest.fn(),
    },
  };
});

const request = supertest(app);

process.env.JWT_SECRET = 'test';

describe('POST /api/users/login', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });
  test('login with empty input', async () => {
    const response = await request.post('/api/users/login').send({
      email: '',
      password: '',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Please provide all fields' });
  });

  test('login with invalid email', async () => {
    const response = await request.post('/api/users/login').send({
      email: 'test',
      password: 'password',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid email address' });
  });

  test('login with user not found', async () => {
    dbUserMockFindByPk.mockResolvedValueOnce(undefined);
    const response = await request.post('/api/users/login').send({
      email: 'test@gmail.com',
      password: 'password',
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'User was not found' });
  });

  test('login with invalid password', async () => {
    dbUserMockFindByPk.mockResolvedValueOnce({
      passwordHash: 'test',
    } as dbUser.User);
    const response = await request.post('/api/users/login').send({
      email: 'test@gmail.com',
      password: 'password',
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Password was invalid' });
  });

  test('login with success', async () => {
    dbUserMockFindByPk.mockResolvedValueOnce({
      email: 'test@gmail.com',
      profileId: 'profileId',
      passwordHash: await hashPassword('password'),
    } as dbUser.User);
    dbProfileMockFindByPk.mockResolvedValueOnce({
      profileId: 'profileId',
    } as dbProfile.Profile);
    const response = await request.post('/api/users/login').send({
      email: 'test@gmail.com',
      password: 'password',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      email: 'test@gmail.com',
      profileId: 'profileId',
      token: generateJWT({
        email: 'test@gmail.com',
        profileId: 'profileId',
      } as dbUser.User),
    });
  });
});

describe('POST /api/users/', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });
  test('register with empty input', async () => {
    const response = await request.post('/api/users').send({
      email: '',
      name: '',
      password: '',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Please provide all fields' });
  });

  test('register with invalid email', async () => {
    const response = await request.post('/api/users').send({
      email: 'test',
      name: 'test name',
      password: 'password',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid email address' });
  });

  test('register with user exist', async () => {
    dbUserMockFindByPk.mockResolvedValueOnce({
      email: 'test@gmail.com',
    } as dbUser.User);
    const response = await request.post('/api/users').send({
      email: 'test@gmail.com',
      name: 'test name',
      password: 'password',
    });
    expect(response.status).toBe(422);
    expect(response.body).toEqual({ message: 'User already exists.' });
  });

  test('register success', async () => {
    dbUserMockFindByPk.mockResolvedValueOnce(undefined);
    dbUserMockCreate.mockResolvedValueOnce(undefined);
    dbProfileMockCreate.mockResolvedValueOnce(undefined);

    const response = await request.post('/api/users').send({
      email: 'test@gmail.com',
      name: 'test name',
      password: 'password',
    });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@gmail.com');
    expect(response.body.name).toBe('test name');
  });
});
