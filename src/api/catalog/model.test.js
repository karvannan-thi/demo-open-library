import { Catalog } from '.'

let catalog

beforeEach(async () => {
  catalog = await Catalog.create({ type: 'test', title: 'test', ISBN: 'test', author: 'test', created_by: 'test', Additional_info: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = catalog.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(catalog.id)
    expect(view.type).toBe(catalog.type)
    expect(view.title).toBe(catalog.title)
    expect(view.ISBN).toBe(catalog.ISBN)
    expect(view.author).toBe(catalog.author)
    expect(view.created_by).toBe(catalog.created_by)
    expect(view.Additional_info).toBe(catalog.Additional_info)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = catalog.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(catalog.id)
    expect(view.type).toBe(catalog.type)
    expect(view.title).toBe(catalog.title)
    expect(view.ISBN).toBe(catalog.ISBN)
    expect(view.author).toBe(catalog.author)
    expect(view.created_by).toBe(catalog.created_by)
    expect(view.Additional_info).toBe(catalog.Additional_info)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
