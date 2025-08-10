import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'; // CORS middleware
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import postgres from 'postgres'; // Importing postgres for database connection

// Importing express module
dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified in .env
// Database connection using environment variables
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;
const sql = postgres(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Security middleware that helps secure my Express apps by setting various HTTP headers
app.use(morgan('dev')); // Logging middleware

app.use('/api/product', productRoutes); // Use the product routes});

async function initDB() {
    try {        
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `
        console.log('Database connected and table created if not exists');

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process if the database connection fails
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});