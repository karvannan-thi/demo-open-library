import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Catalog, { schema } from './model'

const router = new Router()
const { type, title, ISBN, author, created_by, Additional_info } = schema.tree

/**
 * @api {post} /catalogs Create catalog
 * @apiName CreateCatalog
 * @apiGroup Catalog
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam type Catalog's type.
 * @apiParam title Catalog's title.
 * @apiParam ISBN Catalog's ISBN.
 * @apiParam author Catalog's author.
 * @apiParam created_by Catalog's created_by.
 * @apiParam Additional_info Catalog's Additional_info.
 * @apiSuccess {Object} catalog Catalog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Catalog not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['user'] }),
  body({ type, title, ISBN, author, Additional_info }),
  create)

/**
 * @api {get} /catalogs Retrieve catalogs
 * @apiName RetrieveCatalogs
 * @apiGroup Catalog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of catalogs.
 * @apiSuccess {Object[]} rows List of catalogs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  query({
    title: {
      paths: ['title']
    },
    isbn:{
      paths: ['ISBN']
    }
  }),
  index)

/**
 * @api {get} /catalogs/:id Retrieve catalog
 * @apiName RetrieveCatalog
 * @apiGroup Catalog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} catalog Catalog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Catalog not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  show)

/**
 * @api {put} /catalogs/:id Update catalog
 * @apiName UpdateCatalog
 * @apiGroup Catalog
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam type Catalog's type.
 * @apiParam title Catalog's title.
 * @apiParam ISBN Catalog's ISBN.
 * @apiParam author Catalog's author.
 * @apiParam created_by Catalog's created_by.
 * @apiParam Additional_info Catalog's Additional_info.
 * @apiSuccess {Object} catalog Catalog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Catalog not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['user'] }),
  body({ type, title, ISBN, author, Additional_info }),
  update)

/**
 * @api {delete} /catalogs/:id Delete catalog
 * @apiName DeleteCatalog
 * @apiGroup Catalog
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Catalog not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['user'] }),
  destroy)

export default router
