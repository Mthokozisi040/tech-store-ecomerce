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

//apply arcjet rate limiting and security rules
app.use(async (req, res, next) => {
    try {
        const decision = await arcjetInstance.protect(req,{
            requested:1,// number of requests
        })
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ 
                    error: 'Too many requests, please try again later.' 
                });
            } else if (decision.reason.isBot()) {
                res.status(403).json({ 
                    error: 'Access denied for bots.' 
                });
            } else {
                res.status(403).json({ 
                    error: 'Access denied.' 
                });
            }
            return;
        }
        if(decision.results.some((result)=> result.reason.isBot() &&result.reason.isSpoofed())){
            res.status(403).json({ 
                error: 'Access denied for spoofed bots.' 
            });
            return;
        }
    } catch (error) {
        console.log('Arcjet protection error:', error);
        next(error); // Pass the error to the next middleware
    }

    const arcjetInstance = arcjet({
        processId: process.env.ARCJET_KEY,
        characteristics: ["ip.src"],
        rules: [
            shield({ mode: "LIVE" }),
            detectBot({
                mode: "LIVE",
                allow: ["CATEGORY:SEARCH_ENGINE"]
            }),
            tokenBucket({
                mode: "LIVE",
                refillRate: 5, // requests per second
                interval: 10,
                capacity: 10 // maximum burst size
            }),
        ],
    });
    arcjetInstance(req, res, next);
});

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