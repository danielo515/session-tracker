const setupServices = require('./setupServices');

const secret = Symbol('s2sSecret');
const baseDomain = Symbol('baseDomain');

describe('setup services ', () => {
  it('should include all services', () => {
    const services = setupServices({ secret, baseDomain });

    expect(services.generateToken).toBeInstanceOf(Function);
    expect(services.saveUser).toBeInstanceOf(Function);
    expect(services.findUser).toBeInstanceOf(Function);
    expect(services.createSession).toBeInstanceOf(Function);
    expect(services.findSession).toBeInstanceOf(Function);
    expect(services.getAuth).toBeInstanceOf(Function);
  });
});
