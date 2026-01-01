import { useState } from 'react';
import API from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminProductForm = ({ product, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    countInStock: product?.countInStock || '',
    image: product?.image || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product) {
      await API.put(`/products/${product._id}`, form);
      toast.success('Product Updated successfully');
    } else {
      await API.post('/products', form);
      toast.success('Product Added successfully');
    }

    onSuccess();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await API.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setForm({ ...form, image: data.imageUrl });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-full max-w-md rounded"
      >
        <h2 className="text-xl mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Stock"
          type="number"
          value={form.countInStock}
          onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="file"
          className="border p-2 w-full mb-2"
          onChange={(e) => handleImageUpload(e)}
        />

        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-black text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
