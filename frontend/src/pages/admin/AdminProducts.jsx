import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';
import AdminProductForm from '../../components/admin/AdminProductForm';
import { Plus, Pencil, Trash2 } from 'lucide-react';

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

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Products</h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Form modal */}
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

      {/* Table wrapper for responsiveness */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
        <table className="w-full text-sm md:text-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Price</th>
              <th className="px-4 py-2 text-left font-medium">Stock</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">${p.price}</td>
                <td className="px-4 py-2">{p.countInStock}</td>

                <td className="px-4 py-2">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
