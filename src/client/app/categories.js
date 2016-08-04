import { Map, List } from 'immutable'

const categories = List([
  Map({
    category: Map({
      name: 'Transporte',
      color: 'orange'
    }),
    items: List()
  }),
  Map({
    category: Map({
      name: 'Educação',
      color: 'blue'
    }),
    items: List()
  }),
  Map({
    category: Map({
      name: 'Segurança pública',
      color: 'brown'
    }),
    items: List()
  }),
  Map({
    category: Map({
      name: 'Saúde',
      color: 'green'
    }),
    items: List()
  }),
  Map({
    category: Map({
      name: 'Outros',
      color: 'gray'
    }),
    items: List()
  })
]);

export default categories;