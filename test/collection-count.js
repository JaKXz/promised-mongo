import test from 'ava';
import 'babel/register';
import initContext from '../test-utils/init-db-collection';

test.beforeEach('init db and collection', initContext('collection-count'));

test('count', async t => {
  await t.context.collection.insert([{number: 1}, {number: 2}, {number: 3}]);
  let result = await t.context.collection.count();
  t.is(result, 3, 'should correctly get the number of items in the collection.');
});
