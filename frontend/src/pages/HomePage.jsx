import { PlusCircleIcon, RefreshCwIcon } from 'lucide-react';
import React from 'react'

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className='max-w-6xl max-auto px-4 py-8'>
      <div className="flex justify-between items-center mb-8">
        <button className='btn btn-primary' >
          <PlusCircleIcon className='size-4 mr-2' />
          New Product
        </button>

        <button className='btn btn-ghost btn-circle' onClick={fetchProducts}>
          <RefreshCwIcon className='size-5' />
        </button>
      </div>

      {error && <div className='text-red-500 mb-4'>Error: {error}</div>}

      {loading ? (
        <div className='text-center'>Loading products...</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map(product => (
            <div key={product.id} className='card bg-base-100 shadow-md'>
              <figure>
                <img src={product.image} alt={product.name} className='w-full h-48 object-cover' />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>{product.name}</h2>
                <p>{product.description}</p>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  )
}

export default HomePage
