import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Movie from '@/models/Movie';

export async function GET() {
    try {
        await connectToDatabase();
        // Return all movies stored
        const movies = await Movie.find({}).lean();
        return NextResponse.json(movies);
    } catch (error) {
        const err = error as Error;
        console.error('MongoDB GET movies error:', err);
        return NextResponse.json({ error: 'Failed to fetch movies', details: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const data = await req.json();
        const newMovie = await Movie.create(data);
        return NextResponse.json(newMovie, { status: 201 });
    } catch (error) {
        const err = error as Error;
        console.error('MongoDB POST movie error:', err);
        return NextResponse.json({ error: 'Failed to create movie', details: err.message }, { status: 500 });
    }
}
