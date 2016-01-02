import test from 'ava';
import initIndexes from '../helpers/init-indexes';

const NUM_INDICES = 2;
test.beforeEach('init db and collection', initIndexes('collection-drop-indexes', NUM_INDICES));

test.afterEach('cleanup', async t => {
  await t.context.db.dropDatabase();
});

test('collection.dropIndexes removes indexes from system.indexes', async t => {
  let count = await t.context.db.collection('system.indexes').count({'key.number': 1});
  count += await t.context.db.collection('system.indexes').count({'key.number': 2});
  t.is(count, NUM_INDICES, 'should have multiple indexes to delete');

  await t.context.collection.dropIndexes();
  count = await t.context.db.collection('system.indexes').count({'key.number': 1});
  t.is(count, 0, 'should remove the correct indexes succesfully');
});
