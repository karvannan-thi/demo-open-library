import { success, notFound ,error} from '../../services/response/'
import { Catalog } from '.'

export const create = ({user, bodymen: { body } }, res, next) =>{
  body.created_by = user.id
  Catalog.findOne({$or:[{'title':body.title},{'ISBN':body.ISBN}]})
    .then((catalog) => {
      if(catalog)  
        throw "Book already exist";
      return Catalog.create(body);
    })
    .then((catalog) => catalog.view(true))
    .then(success(res, 201))
    .catch(next)
}
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Catalog.count(query)
    .then(count => Catalog.find(query, select, cursor)
      .then((catalogs) => ({
        count,
        rows: catalogs.map((catalog) => catalog.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Catalog.findById(params.id)
    .then(notFound(res))
    .then((catalog) => catalog ? catalog.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({user, bodymen: { body }, params }, res, next) =>
  Catalog.findById(params.id)
    .then(notFound(res))
    .then((catalog) => catalog.created_by==user.id  ? Object.assign(catalog, body).save() : null)
    .then((catalog) => catalog ? catalog.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({user, params }, res, next) =>
  Catalog.findById(params.id)
    .then(notFound(res))
    .then((catalog) => catalog.created_by==user.id  ? catalog.remove() : null)
    .then(success(res, 204))
    .catch(next)
