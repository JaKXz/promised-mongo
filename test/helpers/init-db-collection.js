import Database from '../../lib/Database';

export default function initContext (uniqueCollectionName) {
  return async ({context}) => {
    context.db = new Database('pmongo_test', {emitError: true}, [uniqueCollectionName]);
    context.collection = context.db.collection(uniqueCollectionName);
    await context.collection.drop();
  };
};
