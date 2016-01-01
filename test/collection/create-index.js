import test from 'ava';

import 'babel/register';
import initContext from '../helpers/init-db-collection';

test.beforeEach('init db and collection', initContext('collection-create-index'));

test('collection.createIndex adds index to system.indexes', async t => {
  await t.context.collection.createIndex({number: 1});
  let count = await t.context.db.collection('system.indexes').count({'key.number': 1});
  t.is(count, 1, 'should have the correct count for the given index');
});

test('collection.createIndex adds index to system.indexes with all text options', async t => {
  await t.context.collection.createIndex({name: 'text', tags: 'text'}, {default_language: 'english', weights: {name: 10, tags: 5}, name: 'testFtIndex'});
  let index = await t.context.db.collection('system.indexes').findOne({'name': 'testFtIndex'});
  t.same(index.weights, {name: 10, tags: 5}, 'should get the options back');
});
