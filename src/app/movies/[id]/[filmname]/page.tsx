import { Navbar } from '@/components/Navbar';
import connectToDatabase from '@/lib/mongodb';
import Movie from '@/models/Movie';
import { notFound } from 'next/navigation';

export default async function MoviePage({ params }: { params: { id: string; filmname: string } }) {
    await connectToDatabase();

    // Fetch from MongoDB
    const movie = await Movie.findById(params.id).lean();

    if (!movie) {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col px-4 lg:px-8 py-2 w-full max-w-[1600px] mx-auto bg-slate-50/50">
            <div className="mb-6 -mx-4 lg:-mx-8 border-b-0">
                <Navbar />
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                {/* Hero Image */}
                <div className="relative w-full aspect-video md:h-[420px] rounded-2xl overflow-hidden bg-black/5">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${movie.img})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-5xl font-extrabold text-white tracking-tight text-center">{movie.title}</h1>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold text-slate-800">Total Funds Raised: <span className="text-green-600 font-bold">{movie.funds}</span></p>
                </div>
            </div>
        </main>
    );
}
