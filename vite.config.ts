import {defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

//Necessario para que o vitest entenda as inportações configuradas no tsconfig.json "paths": {"@/*":["./src/*"]},
export default defineConfig({
  plugins:[tsconfigPaths()]
})