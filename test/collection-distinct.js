import test from 'ava';

import 'babel/register';
import initContext from '../test-utils/init-db-collection';

test.beforeEach('init db and collection', initContext('collection-distinct'));

test('return distinct values', async t => {
  await t.context.collection.insert([{number: 1}, {number: 1}, {number: 2}, {number: 3}, {number: 3}]);
  let result = await t.context.collection.distinct('number');
  t.same(result, [1,2,3], 'should not return duplicate values');
});
