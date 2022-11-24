import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Item
interface ItemAttr {
  name: string;
  description: string;
}

// An interface that describes the properties
// that a Item Document has
interface ItemDoc extends mongoose.Document {
  name: string;
  description: string;
}

// An interface that describes the properties
// that a Item Model has
interface ItemModel extends mongoose.Model<ItemDoc> {
  build(attrs: ItemAttr): ItemDoc;
}

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

itemSchema.statics.build = (attrs: ItemAttr) => {
  return new Item(attrs);
};

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

export { Item };
