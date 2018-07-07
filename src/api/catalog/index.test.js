import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Catalog } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, catalog

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  catalog = await Catalog.create({})
})

test('POST /catalogs 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, type: 'test', title: 'test', ISBN: 'test', author: 'test', created_by: 'test', Additional_info: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.type).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.ISBN).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.created_by).toEqual('test')
  expect(body.Additional_info).toEqual('test')
})

test('POST /catalogs 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /catalogs 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /catalogs 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /catalogs 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /catalogs 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /catalogs 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /catalogs/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${catalog.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(catalog.id)
})

test('GET /catalogs/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${catalog.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /catalogs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${catalog.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /catalogs/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${catalog.id}`)
  expect(status).toBe(401)
})

test('GET /catalogs/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /catalogs/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${catalog.id}`)
    .send({ access_token: adminSession, type: 'test', title: 'test', ISBN: 'test', author: 'test', created_by: 'test', Additional_info: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(catalog.id)
  expect(body.type).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.ISBN).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.created_by).toEqual('test')
  expect(body.Additional_info).toEqual('test')
})

test('PUT /catalogs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${catalog.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /catalogs/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${catalog.id}`)
  expect(status).toBe(401)
})

test('PUT /catalogs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, type: 'test', title: 'test', ISBN: 'test', author: 'test', created_by: 'test', Additional_info: 'test' })
  expect(status).toBe(404)
})

test('DELETE /catalogs/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${catalog.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /catalogs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${catalog.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /catalogs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${catalog.id}`)
  expect(status).toBe(401)
})

test('DELETE /catalogs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
