import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Movie from '@/models/Movie';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await connectToDatabase();
        const { slug } = await params;
        const movie = await Movie.findOne({ slug }).lean();

        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        return NextResponse.json(movie);
    } catch (error) {
        const err = error as Error;
        console.error('MongoDB GET movie error:', err);
        return NextResponse.json({ error: 'Failed to fetch movie', details: err.message }, { status: 500 });
    }
}
