import test from 'ava';
import {expect} from 'chai';

import Database from '../dist/lib/Database';
import Cursor from '../dist/lib/Cursor';

test.beforeEach('init db and collection', async t => {
  t.context.db = new Database('pmongo_test', {emitError: true});
  await t.context.db.dropDatabase();
  t.context.collection = t.context.db.collection('docs');
});

test('$group', async t => {
  await t.context.collection.insert([
    { name: 'Squirtle', type: 'water' },
    { name: 'Starmie', type: 'water' },
    { name: 'Charmander', type: 'fire' },
    { name: 'Lapras', type: 'water' }
  ]);

  const cursor = t.context.collection.aggregateCursor({'$group': {_id: '$type'}});
  expect(cursor).to.be.an.instanceof(Cursor);

  const result = await cursor.toArray();
  expect(result).to.deep.have.members([{_id: 'water' }, {_id: 'fire'}],
    'collection.aggregateCursor should support the $group operator.');
});
