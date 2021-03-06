const Database = require('./lib/Database');
const Collection = require('./lib/Collection');
const mongodb = require('mongodb-core');
const coreJs = require('babel-runtime/core-js').default;
const Proxy = require('harmony-proxy');

function createDatabase(connectionString, options, collections) {
  let db = new Database(connectionString, options, collections);

  db.ObjectId = mongodb.BSON.ObjectId;
  db.DBRef = mongodb.BSON.DBRef;
  db.Timestamp = mongodb.BSON.Timestamp;
  db.MinKey = mongodb.BSON.MinKey;
  db.MaxKey = mongodb.BSON.MaxKey;
  db.NumberLong = mongodb.BSON.Long;

  return new Proxy(db, {
    get: function (target, property) {
      if (target[property]) {
        return target[property];
      } else {
        return target[property] = target.collection(property);
      }
    }
  });
}


module.exports = createDatabase;

createDatabase.compatible = function () {
  coreJs.Promise.prototype.done = function (resolve, reject) {
    this.then(
      function (result) {
        try {
          if (resolve) {
            resolve(result);
          }
        } catch (err) {
          process.nextTick(function () { throw err; });
        }
      },
      function (err) {
        if (reject) {
          reject(err);
        } else {
          process.nextTick(function () { throw err; });
        }
      });
  };

  coreJs.Promise.prototype.fail = coreJs.Promise.prototype.catch;

  coreJs.Promise.prototype.fin = coreJs.Promise.prototype.finally = function (callback) {
      return this.then(callback, function (err) { callback(); throw err; });
  };

  let findAndModify = Collection.prototype.findAndModify;
  Collection.prototype.findAndModifyEx = findAndModify;

  Collection.prototype.findAndModify = function () {
    return findAndModify.apply(this, Array.prototype.slice.call(arguments))
      .then(function (result) {
        return result.result;
      });
  };

  Database.prototype.db = Database.prototype.getSiblingDb;

  return this;
};

createDatabase.ObjectId = mongodb.BSON.ObjectId;
createDatabase.DBRef = mongodb.BSON.DBRef;
createDatabase.Timestamp = mongodb.BSON.Timestamp;
createDatabase.MinKey = mongodb.BSON.MinKey;
createDatabase.MaxKey = mongodb.BSON.MaxKey;
createDatabase.NumberLong = mongodb.BSON.Long;
