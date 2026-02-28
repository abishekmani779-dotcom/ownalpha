import mongoose from 'mongoose';

export interface IMovie {
    title: string;
    funds: string; // e.g. "$7.55M"
    img: string; // URL
    slug: string; // used for routing to /project/[slug]
    contractAddress?: string; // Optional: Smart contract address mapping
}

const MovieSchema = new mongoose.Schema<IMovie>(
    {
        title: { type: String, required: true },
        funds: { type: String, required: true },
        img: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        contractAddress: { type: String, required: false },
    },
    { timestamps: true }
);

// Prevent multiple recompilations of the model in development mode
const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie;
