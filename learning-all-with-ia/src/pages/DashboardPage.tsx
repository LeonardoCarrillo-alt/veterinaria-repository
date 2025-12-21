import Dashboard from '../components/dashboard.tsx';
import React from 'react';
import Product from '../components/products.tsx';

function DashboardPage() {
    return (
        <div >
            <Dashboard />

            <div>
                <Product id={1} name="Producto 1" description="Descripción del producto 1" price={100} />
                <Product id={2} name="Producto 2" description="Descripción del producto 2" price={200} />
                <Product id={3} name="Producto 3" description="Descripción del producto 3" price={300} />   
            </div>
        </div>
    )
};

export default DashboardPage;
