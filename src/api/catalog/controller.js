import { success, notFound } from '../../services/response/'
import { Catalog } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Catalog.create(body)
    .then((catalog) => catalog.view(true))
    .then(success(res, 201))
    .catch(next)

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

export const update = ({ bodymen: { body }, params }, res, next) =>
  Catalog.findById(params.id)
    .then(notFound(res))
    .then((catalog) => catalog ? Object.assign(catalog, body).save() : null)
    .then((catalog) => catalog ? catalog.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Catalog.findById(params.id)
    .then(notFound(res))
    .then((catalog) => catalog ? catalog.remove() : null)
    .then(success(res, 204))
    .catch(next)
