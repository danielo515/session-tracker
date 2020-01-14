/* eslint-env jest */

const jwt = require('jsonwebtoken');

const decodeToken = require('./decodeToken');

describe('decodeToken util', () => {
  const audience = 'time-tracking';
  const issuer = 'danielorodriguez.com';
  const secret = 'super-secret';
  const userId = 'user1';


  const token = jwt.sign(
    { foo: 'bar' },
    secret,
    {
      audience, issuer, subject: userId, expiresIn: 5,
    },
  );

  const authorization = `Bearer ${token}`;

  it('should decode correct token', async () => {
    const decoded = await decodeToken({
      authorization,
      audience,
      issuer,
      secret,
    });

    expect(decoded.foo).toEqual('bar');
  });

  it('should reject incorrect secret', async () => {
    const option = {
      authorization,
      audience,
      issuer,
      secret: 'invalid-secret',
    };

    await expect(decodeToken(option)).rejects.toThrow({
      message: 'Authorization header is invalid',
      source: { data: 'invalid signature' },
    });
  });

  it('should reject incorrect audience', async () => {
    const option = {
      authorization,
      audience: 'invalid audience',
      issuer,
      secret,
    };

    await expect(decodeToken(option)).rejects.toThrow({
      message: 'Authorization header is invalid',
      source: { data: 'jwt audience invalid. expected: invalid audience' },
    });
  });

  it('should reject incorrect issuer', async () => {
    const option = {
      authorization,
      audience,
      issuer: 'invalid issuer',
      secret,
    };

    await expect(decodeToken(option)).rejects.toThrow({
      message: 'Authorization header is invalid',
      source: { data: 'jwt issuer invalid. expected: invalid issuer' },
    });
  });

  it('should reject expired token', async () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NDUwNjg1MzUsImV4cCI6MTU0NTA2ODU0MCwiYXVkIjoiaGFuZGluLmF1bGEuZWR1Y2F0aW9uIiwiaXNzIjoiYXVsYS5lZHVjYXRpb24iLCJzdWIiOiJ1c2VyMSJ9.9chLrOI55WUggRZ7Vj_E0_qWWD7YovOhofvO0qk1M9w';
    const option = {
      authorization: `Bearer ${expiredToken}`,
      audience,
      issuer,
      secret,
    };

    await expect(decodeToken(option)).rejects.toThrow({
      message: 'Authorization header is invalid',
      source: { data: 'jwt expired' },
    });
  });

  it('should reject invalid type', async () => {
    const option = {
      authorization: `Invalid ${token}`,
      audience,
      issuer,
      secret,
    };

    await expect(decodeToken(option)).rejects.toThrow({
      message: 'Authorization header is invalid',
      source: { data: 'authorization is invalid' },
    });
  });

  it('should reject request without authorization', async () => {
    const option = {
      audience,
      issuer,
      secret,
    };

    await expect(decodeToken(option)).rejects.toThrow({
      message: 'Authorization header is missing',
      source: { data: 'authorization is missing' },
    });
  });
});
