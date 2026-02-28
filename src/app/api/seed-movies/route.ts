import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Movie from '@/models/Movie';

export async function GET() {
    try {
        await connectToDatabase();

        const moviesToSeed = [
            {
                title: "F1",
                funds: "$7.55M",
                img: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
                slug: "f1",
            },
            {
                title: "Fire Girl",
                funds: "$2.67M",
                img: "https://www.themoviedb.org/t/p/w1280/nbuWvW6AJy4Kd6kgfEWyU8rVWqU.jpg",
                slug: "fire-girl",
            },
            {
                title: "London Has Fallen",
                funds: "$1.55M",
                img: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
                slug: "london-has-fallen",
            },
            {
                title: "Oopirey",
                funds: "$5.95M",
                img: "https://www.themoviedb.org/t/p/w1280/dOpnJnhABTw85CG80BhBdBH9Teh.jpg",
                slug: "oopirey",
            },
            {
                title: "Varisu",
                funds: "$3.20M",
                img: "https://www.themoviedb.org/t/p/w1280/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
                slug: "varisu",
            },
            {
                title: "Final Destination 5",
                funds: "$6.20M",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRY-xDKrIC0cj-mHHeX9A6K3s3fXn4FjsycWtbRBx2Jd3HcuF",
                slug: "final-destination-5",
            },
            {
                title: "Avatar",
                funds: "$4.20M",
                img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJfdu01GP05dCCbubLMIXZgxz4SqKIpQx92wu9zHT7pXovv-Sn",
                slug: "avatar"
            }
        ];

        // Clear existing to avoid duplicates (optional, but safe for seeding)
        await Movie.deleteMany({});

        const seededMovies = await Movie.insertMany(moviesToSeed);

        return NextResponse.json({ message: 'Seeded successfully', count: seededMovies.length, movies: seededMovies });
    } catch (error) {
        const err = error as Error;
        console.error('MongoDB seed error:', err);
        return NextResponse.json({ error: 'Failed to seed movies', details: err.message }, { status: 500 });
    }
}
