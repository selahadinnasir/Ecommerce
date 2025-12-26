import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';
import AdminProductForm from '../../components/admin/AdminProductForm';

const fetchProducts = async () => {
  const { data } = await API.get('/products');
  return data;
};

const AdminProducts = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-products'],
    queryFn: fetchProducts,
  });

  console.log('admin product', products);

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2">{p.countInStock}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => {
                    setEditingProduct(p);
                    setShowForm(true);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
