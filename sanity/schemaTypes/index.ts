import { type SchemaTypeDefinition } from 'sanity'
import product         from './product'
import category        from './category'
import specDefinition  from './specDefinition'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, specDefinition],
}
