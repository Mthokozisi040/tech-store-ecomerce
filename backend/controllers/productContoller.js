import { sql } from '../config/db.js'; // Importing sql from server.js

//CRUD operations for products
export const getProduct = async (req, res) => {
    try {
        await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
        console.log('Products fetched successfully', products);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({success: false, error: 'Internal Server Error' });
        
    }
};

export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;
        console.log('Product created successfully', newProduct);
        res.status(201).json({ success: true, data: newProduct });

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await sql`
            SELECT * FROM products WHERE id = ${id}
        `;
        if (product.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${id}
            RETURNING *
        `;
        console.log('Product updated successfully');
        res.status(200).json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        console.log('Error updating product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await sql`
            DELETE FROM products WHERE id = ${id}
        `;
        console.log('Product deleted successfully');
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};