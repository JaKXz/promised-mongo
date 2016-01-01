import test from 'ava';
import {expect} from 'chai';
import 'babel/register';
import initContext from '../test-utils/init-db-collection';

test.beforeEach('init db and collection', initContext('collection-aggregate'));

test('supports $group operator', async t => {
  await t.context.collection.insert([
    { name: 'Squirtle', type: 'water' },
    { name: 'Starmie', type: 'water' },
    { name: 'Charmander', type: 'fire' },
    { name: 'Lapras', type: 'water' }
  ]);

  let result = await t.context.collection.aggregate({'$group': {_id: '$type'}});
  expect(result).to.deep.have.members([{_id: 'water' }, {_id: 'fire'}],
    'collection.aggregate should support the $group operator.');
});
