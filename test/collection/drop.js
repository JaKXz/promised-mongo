import test from 'ava';
import {expect} from 'chai';

import Database from '../../lib/Database';

test('collection.drop returns true if the collection existed', async t => {
  const db = new Database('pmongo_test', {emitError: true});
  await db.createCollection('collection-drop');
  const collection = db.collection('collection-drop');
  const drop = await collection.drop();
  t.is(drop, true, 'should return true when the collection is declared');

  const collectionNames = await db.getCollectionNames();
  expect(collectionNames).to.not.include.members(['collection-drop'],
    'the db should not contain the dropped collection');
});

test('collection.drop returns false if the collection did not exist', async t => {
  let db = new Database('pmongo_test', {emitError: true});
  let result = await db.collection('notexistant').drop();
  t.is(result, false, 'should return false when dropping non-existant collections');
});
