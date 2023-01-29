import { destroyApp } from '../../src/app';

export async function _afterAll() {
  await destroyApp();
}
