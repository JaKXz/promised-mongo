import Database from '../dist/lib/Database';
import {expect} from 'chai';
import test from 'ava';

test.beforeEach('init db and collection', async t => {
  t.context.db = new Database('pmongo_test', {emitError: true});
  await t.context.db.dropDatabase();
  t.context.collection = t.context.db.collection('docs');
});

test('Collection aggregate $group', async t => {
  await t.context.collection.insert([
    { name: 'Squirtle', type: 'water' },
    { name: 'Starmie', type: 'water' },
    { name: 'Charmander', type: 'fire' },
    { name: 'Lapras', type: 'water' }
  ]);

  let result = await t.context.collection.aggregate({'$group': {_id: '$type'}});
  expect(result).to.deep.have.members([{_id: 'water' }, {_id: 'fire'}],
                                     '$group should be supported.');
});
