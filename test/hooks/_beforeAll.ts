import { initializeApp } from '../../src/app';
import { GraphQLClient } from '../util';

// jest beforeAll code that is common to all tests
export async function _beforeAll() {
  const { port } = await initializeApp(Math.floor(Math.random() * 10000) + 3000, {
    logger: false,
    abortOnError: false,
  });
  const api = new GraphQLClient(`http://localhost:${port}/graphql`);
  await api.login();

  // multiple items can be returned in an object
  return { api };
}
