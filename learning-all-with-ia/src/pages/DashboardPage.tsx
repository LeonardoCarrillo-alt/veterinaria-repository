import Dashboard from '../components/dashboard.tsx';
import React, { useState, useEffect } from 'react';
import Product from '../components/products.tsx';
import backgroundImage from '../assets/images.png';
import ProductModal from '../components/ProductModal';

function DashboardPage() {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5004/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Error al cargar productos", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#07dee9',
                backgroundSize: '50%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%'
            }}
        >
            <Dashboard onCreateProduct={() => setShowModal(true)} />

            <div>
                {products.map((p) => (
                    <Product
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        description={p.description}
                        price={p.price}
                    />
                ))}
            </div>

            {showModal && (
                <ProductModal
                    onClose={() => setShowModal(false)}
                    onProductCreated={fetchProducts}
                />
            )}
        </div>
    );
}

export default DashboardPage;