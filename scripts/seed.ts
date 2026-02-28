import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MovieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        funds: { type: String, required: true },
        img: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

const initialMovies = [
    {
        title: "F1",
        funds: "$7.55M",
        img: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        slug: "f1"
    },
    {
        title: "Fire Girl",
        funds: "$2.67M",
        img: "https://www.themoviedb.org/t/p/w1280/nbuWvW6AJy4Kd6kgfEWyU8rVWqU.jpg",
        slug: "fire-girl"
    },
    {
        title: "London Has Fallen",
        funds: "$1.55M",
        img: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        slug: "london-has-fallen"
    },
    {
        title: "Oopirey",
        funds: "$5.95M",
        img: "https://www.themoviedb.org/t/p/w1280/dOpnJnhABTw85CG80BhBdBH9Teh.jpg",
        slug: "oopirey"
    },
    {
        title: "Varisu",
        funds: "$3.20M",
        img: "https://www.themoviedb.org/t/p/w1280/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
        slug: "varisu"
    },
    {
        title: "Final Destination 5",
        funds: "$6.20M",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRY-xDKrIC0cj-mHHeX9A6K3s3fXn4FjsycWtbRBx2Jd3HcuF",
        slug: "final-destination-5"
    },
    {
        title: "Avatar",
        funds: "$4.20M",
        img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJfdu01GP05dCCbubLMIXZgxz4SqKIpQx92wu9zHT7pXovv-Sn",
        slug: "avatar"
    },
];

async function seed() {
    try {
        console.log("Connecting to MongoDB:", MONGODB_URI.replace(/:([^:@]+)@/, ':***@'));
        await mongoose.connect(MONGODB_URI);
        console.log("Connected successfully.");

        // Clear existing movies to avoid duplicate slugs during testing
        await Movie.deleteMany({});
        console.log("Cleared existing movies.");

        const result = await Movie.insertMany(initialMovies);
        console.log(`Successfully inserted ${result.length} movies!`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
        process.exit(0);
    }
}

seed();
