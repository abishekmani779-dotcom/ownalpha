import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Investment from '@/models/Investment';

export async function GET() {
    try {
        await connectToDatabase();
        const investments = await Investment.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(investments);
    } catch (error) {
        const err = error as Error;
        console.error('MongoDB GET investments error:', err);
        return NextResponse.json({ error: 'Failed to fetch investments', details: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const data = await req.json();
        const newInvestment = await Investment.create(data);
        return NextResponse.json(newInvestment, { status: 201 });
    } catch (error) {
        const err = error as Error;
        console.error('MongoDB POST investment error:', err);
        return NextResponse.json({ error: 'Failed to save investment', details: err.message }, { status: 500 });
    }
}
