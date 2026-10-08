import { seedProducts } from './seedProducts';

// Run the seed function
seedProducts()
    .then((result) => {
        if (result.success) {
            console.log(`\n✅ Seeding completed successfully!`);
            console.log(`📦 Total products added: ${result.count}`);
            process.exit(0);
        } else {
            console.error('\n❌ Seeding failed:', result.error);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('\n❌ Unexpected error:', error);
        process.exit(1);
    });
