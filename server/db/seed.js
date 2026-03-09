require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./connection');

const sampleProducts = [
  {
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life.',
    price: 149.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
  },
  {
    name: 'Minimalist Watch',
    description: 'Sleek stainless steel watch with genuine leather strap.',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Accessories',
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, sustainable cotton tee. Available in multiple colors.',
    price: 29.99,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Apparel',
  },
  {
    name: 'Smart Fitness Tracker',
    description: 'Track steps, heart rate, sleep, and more. Water-resistant design.',
    price: 79.99,
    image_url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400',
    category: 'Electronics',
  },
  {
    name: 'Leather Messenger Bag',
    description: 'Handcrafted full-grain leather bag. Perfect for daily commutes.',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    category: 'Accessories',
  },
  {
    name: 'Blue Light Glasses',
    description: 'Reduce eye strain from screens. Lightweight frame.',
    price: 49.99,
    image_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400',
    category: 'Accessories',
  },
];

async function seed() {
  try {
    const count = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(count.rows[0].count) > 0) {
      console.log('✓ Database already has products. Skipping seed.');
      process.exit(0);
      return;
    }
    for (const product of sampleProducts) {
      await pool.query(
        `INSERT INTO products (name, description, price, image_url, category) 
         VALUES ($1, $2, $3, $4, $5)`,
        [product.name, product.description, product.price, product.image_url, product.category]
      );
    }
    console.log(`✓ Seeded ${sampleProducts.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
}

seed();
