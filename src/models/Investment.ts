import mongoose from 'mongoose';

export interface IInvestment {
    investorAddress: string;
    movieSlug: string;
    amount: string;
    tokens: string;
}

const InvestmentSchema = new mongoose.Schema<IInvestment>(
    {
        investorAddress: { type: String, required: true },
        movieSlug: { type: String, required: true },
        amount: { type: String, required: true },
        tokens: { type: String, required: true },
    },
    { timestamps: true }
);

// Prevent multiple recompilations in dev mode
const Investment = mongoose.models.Investment || mongoose.model<IInvestment>('Investment', InvestmentSchema);

export default Investment;
