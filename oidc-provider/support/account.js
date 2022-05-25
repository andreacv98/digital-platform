const store = new Map();
const logins = new Map();
const { nanoid } = require('nanoid');

const dao = require('./dao')

class Account {
  constructor(id, profile) {
    this.accountId = id || nanoid();
    this.profile = profile;
  }

  /**
   * @param use - can either be "id_token" or "userinfo", depending on
   *   where the specific claims are intended to be put in.
   * @param scope - the intended scope, while oidc-provider will mask
   *   claims depending on the scope automatically you might want to skip
   *   loading some claims from external resources etc. based on this detail
   *   or not return them in id tokens but only userinfo and so on.
   */
  async claims(use, scope) { // eslint-disable-line no-unused-vars
    if (this.profile) {
      return {
        sub: this.accountId, // it is essential to always return a sub claim
        dateOfBirth: this.profile.dateOfBirth,
        familyName: this.profile.familyName,
        name: this.profile.name,
        fiscalNumber: this.profile.fiscalNumber
      };
    }
    return {};
  }

  static async findByFederated(provider, claims) {
    const id = `${provider}.${claims.sub}`;
    if (!logins.get(id)) {
      logins.set(id, new Account(id, claims));
    }
    return logins.get(id);
  }

  static async findByLogin(login, password) {

    const accountDAO = await dao.getAccount(login, password)
    const account = new Account(accountDAO.id, accountDAO.profile)
    
    return account
  }

  static async findAccount(ctx, id, token) { // eslint-disable-line no-unused-vars
    // token is a reference to the token used for which a given account is being loaded,
    //   it is undefined in scenarios where account claims are returned from authorization endpoint
    // ctx is the koa request context

    const accountDAO = await dao.getAccountByID(id)
    const account = new Account(accountDAO.id, accountDAO.profile)
    
    return account

    /*if (!store.get(id)) new Account(id); // eslint-disable-line no-new
    return store.get(id);*/
  }
}

module.exports = Account;
