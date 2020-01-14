const jwt = require('jsonwebtoken');

const generateToken = require('./generateToken');

const EXPIRATION_LENGTH = 60 * 60 * 24; // 1 day

describe('generateToken service', () => {
  const beforeGenerating = new Date();

  let decodedToken;
  let decodedError;

  beforeAll(async (done) => {
    const token = await generateToken({
      secret: 'super-secret',
      baseDomain: 'test.com',
    })({
      userId: 'user1',
      aud: 'test',
    });

    jwt.verify(token, 'super-secret', {}, (error, decoded) => {
      decodedError = error;
      decodedToken = decoded;

      done();
    });
  });

  it('should not throw error', () => {
    expect(decodedError).toBeNull();
  });

  it('token should include: `data: { }`, iat, exp, aud, iss, sub', () => {
    expect(Object.keys(decodedToken).includes(
      'iat',
      'exp',
      'aud',
      'iss',
      'sub',
    ));
  });


  it('sub should be userId', () => {
    expect(decodedToken.sub).toEqual('user1');
  });

  it('should expire in one day', () => {
    expect(new Date(decodedToken.exp * 1000) - new Date() > EXPIRATION_LENGTH);
    expect(new Date(decodedToken.exp * 1000) - beforeGenerating < EXPIRATION_LENGTH);
  });

  it('should throw error', async () => {
    const tokenPromise = generateToken({
      secret: undefined,
      baseDomain: 'test.com',
    })({
      userId: 'user1',
      aud: 'test',
    });

    await expect(tokenPromise).rejects.toThrow('secretOrPrivateKey must have a value');
  });
});
