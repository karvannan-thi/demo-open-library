import mongoose, { Schema } from 'mongoose'

const catalogSchema = new Schema({
  type: {
    type: String
  },
  title: {
    type: String
  },
  ISBN: {
    type: String
  },
  author: {
    type: String
  },
  created_by: {
    type: String
  },
  Additional_info: { type: mongoose.Schema.Types.Mixed }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
  
})

catalogSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      type: this.type,
      title: this.title,
      ISBN: this.ISBN,
      author: this.author,
      created_by: this.created_by,
      
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view,
      // add properties for a full view
      Additional_info: this.Additional_info,
    } : view
  }
}

const model = mongoose.model('Catalog', catalogSchema)

export const schema = model.schema
export default model
