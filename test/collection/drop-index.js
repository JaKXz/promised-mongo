import test from 'ava';
import initIndexes from '../helpers/init-indexes';

test.beforeEach('init db and collection', initIndexes('collection-drop-index'));

test.afterEach('cleanup', async t => {
  await t.context.db.dropDatabase();
});

test.only('collection.dropIndex removes index from system.indexes', async t => {
  let count = await t.context.db.collection('system.indexes').count({'key.number': 1});
  t.is(count, 1, 'should have an index to remove');

  await t.context.collection.dropIndex('number_1');
  count = await t.context.db.collection('system.indexes').count({'key.number': 1});
  t.is(count, 0, 'should remove the correct index succesfully');
});
