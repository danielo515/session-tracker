/* eslint-env jest */
const getAuthFromAccessToken = require('./getAuthFromAccessToken');
const { BASE_DOMAIN, AUDIENCE } = require('../users/constats');

const audience = AUDIENCE;
const issuer = BASE_DOMAIN;
const secret = 'super-secret';
const userId = 'user1';

const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg3NDcwMzIsImV4cCI6MTU3ODgzMzQzMiwiYXVkIjoidGltZS10cmFja2luZy1hcHAuZGFuaWVsb1JvZHJpZ3Vlei5jb20iLCJpc3MiOiJkYW5pZWxvUm9kcmlndWV6LmNvbSIsInN1YiI6ImFkNTM3ZTA0LWExNGQtNDgyYS05ZjRhLWU5MzQ5NWE4MmMxZSJ9.uYdsliktpa0hrnaOMFKbY2rX3ap-C52iRQALQjk4Jgg';
const headers = { authorization };

describe('getAuthFromAccessToken util', () => {
  it('should return userId', async () => {
    const role = await getAuthFromAccessToken({
      audience,
      issuer,
      secret,
    })({ headers });

    expect(role).toEqual({
      userId,
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6eyJzcGFjZXMiOnsic3BhY2UxIjoic3R1ZGVudCIsInNwYWNlMiI6ImVkdWNhdG9yIn19LCJpYXQiOjE1NTkxMjE4MzcsImV4cCI6MTkwMDAwMDAwMCwiYXVkIjoiaGFuZGluLmF1bGEuZWR1Y2F0aW9uIiwiaXNzIjoiYXVsYS5lZHVjYXRpb24iLCJzdWIiOiJ1c2VyMSJ9.phiaXQX03sLAzb5mgWqVPClmPshrqnECc73CVMwxkmo',
    });
  });

  it('should throw error on invalid jwt info', async () => {
    await expect(getAuthFromAccessToken({
      audience,
      issuer,
      secret: 'invalid-secret',
    })({ headers })).rejects.toThrow({
      message: 'Authorization header is invalid',
      source: { data: 'jwt issuer invalid. expected: invalid issuer' },
    });
  });
});
