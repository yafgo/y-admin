import { createProdMockServer } from 'vite-plugin-mock/client'

import mocks from './modules'

export function setupProdMockServer() {
  createProdMockServer([...mocks])
}
