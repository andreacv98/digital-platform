const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

// open the database
const db = new sqlite.Database('./oidc.db', (err) => {
  if (err) throw err;
});

exports.getAccount = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT account.id as idAccount, account.password, profile.* FROM account, profile WHERE account.username = ? AND account.userdetail = profile.id';
        db.get(sql, [username], (err, row) => {
        if (err)
            reject(err);
        else if (row === undefined) {
            resolve(false);
        }
        else {
            const account = {
                id: row.idAccount,
                profile: {
                    name: row.name,
                    familyName: row.familyName,
                    dateOfBirth: row.dateOfBirth,
                    fiscalNumber: row.fiscalNumber
                }                
            };

            bcrypt.compare(password, row.password).then(result => {
            if (result)
                resolve(account);
            else
                resolve(false);
            });
        }
        });
    });
};

exports.getAccountByID = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT account.id as idAccount, account.password, profile.* FROM account, profile WHERE account.id = ? AND account.userdetail = profile.id';
        db.get(sql, [id], (err, row) => {
        if (err)
            reject(err);
        else if (row === undefined) {
            resolve(false);
        }
        else {
            const account = {
                id: row.idAccount,
                profile: {
                    name: row.name,
                    familyName: row.familyName,
                    dateOfBirth: row.dateOfBirth,
                    fiscalNumber: row.fiscalNumber
                }                
            };

            resolve(account);
        }
        });
    });
};
  