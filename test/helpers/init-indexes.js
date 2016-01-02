import {all} from 'bluebird';
import {range} from 'lodash';
import Database from '../../lib/Database';

export default function initIndexes (uniqueCollection, num = 1) {
  return async ({context}) => {
    context.db = new Database(uniqueCollection, {emitError: true}, [uniqueCollection]);
    context.collection = context.db.collection(uniqueCollection);
    await all(range(1, num + 1)
      .map(val => context.collection.createIndex({number: val})));
  };
};
