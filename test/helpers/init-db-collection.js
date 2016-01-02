import Database from '../../lib/Database';

export default function initContext (collection) {
  return async ({context}) => {
    context.db = new Database('pmongo_test', {emitError: true}, [collection]);
    context.collection = context.db.collection(collection);
    await context.collection.drop();
  };
};
