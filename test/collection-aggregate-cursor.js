import test from 'ava';
import {expect} from 'chai';
import Cursor from '../dist/lib/Cursor';

import 'babel/register';
import initContext from '../test-utils/init-db-collection';

test.beforeEach('init db and collection', initContext('collection-aggregate-cursor'));

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
