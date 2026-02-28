# 🎬 OwnAlpha — The Onchain Film Studio

> **Fund movies. Own scenes. Earn every time someone watches.**

OwnAlpha is a decentralized movie launchpad on BNB Chain where fans participate in **Initial Movie Offerings (IMOs)**, own tokenized film scenes as NFTs, and receive **real streaming revenue share** every time their film is watched on the OwnAlpha OTT platform.

We are not a speculation platform. Movie tokens have one mandatory use — buying Scene NFTs — which unlocks perpetual streaming revenue. The AMM exists so late fans can join a film they love, not to gamble on price.

---

## The Problem → Solution in One Line  

| ❌ Today | ✅ OwnAlpha |
|---|---|
| Fans watch movies. Studios capture 100% of value. | Fans fund movies, own scenes, and earn every stream — forever. |

---

## Who Is This For?

| User | What They Get |
|---|---|
| 🎥 **Film Producers** | Decentralized crowdfunding at fair market price; milestone-gated capital release |
| 🎟️ **Film Fans** | Own a piece of the film; earn streaming revenue share from every watch |
| 💹 **DeFi Users** | Participate in an IMO auction; trade movie tokens on the AMM post-launch |
| 🏗️ **$OWNALPHA Holders** | Protocol fees from all movie AMM pools flow back to the protocol token |

---

## Core Value Propositions

**For producers:** Raise capital in a transparent, market-priced public auction. No VCs, no gatekeepers. 80% of raised funds released in production milestones. The community that funded you is also your distribution network.

**For fans:** The only way to own a Scene NFT — which earns real streaming revenue — is via the movie token. This creates intrinsic, non-speculative demand that persists long after the IMO closes.

**For the ecosystem:** Every movie that launches on OwnAlpha generates AMM trading fees. Those fees compound into $OWNALPHA buybacks, making the protocol token a claim on the aggregate success of every film on the platform.

---

## Quick Links

| Resource | Link |
|---|---|
| 🌐 Live Demo | https://ownalpha-ie1i.vercel.app/ |
| 📄 Project Details | [`docs/PROJECT.md`](docs/PROJECT.md) |
| 🔧 Technical Docs | [`docs/TECHNICAL.md`](docs/TECHNICAL.md) |
| 🎥 Demo & Slides | [`docs/EXTRAS.md`](docs/EXTRAS.md) |
| 📋 Contract Addresses | [`bsc.address`](bsc.address) |

---

## User Journey (Mermaid)

```mermaid
journey
    title Fan Participates in OwnAlpha
    section Discover
      Browse launchpad: 5: Fan
      Read movie pitch + trailer: 4: Fan
    section Fund
      Connect wallet (BSC): 5: Fan
      Place bid in IMO auction: 5: Fan
      IMO closes, tokens claimed at clearing price: 4: Fan, Protocol
    section Own
      Buy Scene NFT with movie token: 5: Fan
      NFT represents ownership of a film scene: 5: Fan
    section Earn
      Movie releases on OwnAlpha OTT: 5: Producer, Platform
      Viewer streams the film: 5: Viewer
      Streaming revenue distributed to Scene NFT holders: 5: Fan, Protocol
    section Trade
      Fan buys more tokens on AMM to own more scenes: 4: Fan
      Box office rev triggers buyback + LP deepening: 5: Protocol
```

---

## System Architecture

```mermaid
flowchart TD
    subgraph IMO["🎟️ IMO — Initial Movie Offering"]
        A[Producer creates IMO] --> B[Auction window opens\n bidders place orders]
        B --> C{Auction closes\nat clearing price}
    end

    subgraph SPLIT["💰 Fund Split"]
        C --> D[80% → MilestoneEscrow\nreleased on production gates]
        C --> E[20% → LiquidityBootstrapper\nconcentrated LP on PancakeSwap v3]
    end

    subgraph AMM["🔄 AMM — Secondary Market"]
        E --> F[Protocol-owned\nPancakeSwap v3 Pool\nTOKEN/USDC]
        F --> G[Fans buy tokens\npost-IMO]
    end

    subgraph NFT["🎞️ Scene NFT"]
        G --> H[Fan spends movie token\nto mint Scene NFT\nERC-1155, token-gated]
        H --> I[Fan owns a scene\nof the film forever]
    end

    subgraph OTT["📺 OTT Platform"]
        J[Viewer streams film\nvia OwnAlpha OTT] --> K[Ad + subscription rev\nallocated per movie]
        K --> L[RevenueDistributor\npro-rata to Scene NFT holders]
        L --> I
    end

    subgraph BOXOFFICE["🎬 Box Office Revenue"]
        M[15% box office rev\nflows to contract] --> N[60% Buyback\nfrom AMM]
        M --> O[40% Single-sided LP\nabove current price]
        N --> F
        O --> F
    end

    subgraph PROTOCOL["🪙 $OWNALPHA Token"]
        F --> P[AMM trading fees\ncollected by FeeCollector]
        P --> Q[$OWNALPHA buyback\non open market]
    end

    style IMO fill:#1a1a2e,color:#e0e0ff,stroke:#4444aa
    style SPLIT fill:#16213e,color:#e0e0ff,stroke:#4444aa
    style AMM fill:#0f3460,color:#e0e0ff,stroke:#4444aa
    style NFT fill:#533483,color:#e0e0ff,stroke:#9955cc
    style OTT fill:#1b262c,color:#e0e0ff,stroke:#4444aa
    style BOXOFFICE fill:#2d4a22,color:#e0ffcc,stroke:#44aa44
    style PROTOCOL fill:#4a2200,color:#ffe0cc,stroke:#cc7722
```

---

## The Flywheel

```mermaid
flowchart LR
    A[🎬 Producer\nlaunches IMO] -->|fair price discovery| B[💰 Fans fund\nthe film]
    B -->|80% milestone\nreleased| C[🎥 Film gets\nproduced]
    B -->|20% seeds| D[🔄 Protocol-owned\nAMM liquidity]
    D -->|late fans buy| E[🎞️ Fans buy\nScene NFTs]
    C -->|film streams\non OTT| F[📺 Streaming\nrevenue generated]
    F -->|pro-rata to\nnft holders| E
    F -->|15% box office\nbuyback + LP| D
    D -->|AMM fees| G[🪙 $OWNALPHA\nbuyback]
    G -->|protocol value| A
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Web3 | wagmi, viem |
| Smart Contracts | Solidity, BNB Chain (BSC) |
| DEX / AMM | PancakeSwap v3 (concentrated liquidity) |
| Token Standards | ERC-20 (movie tokens), ERC-1155 (scene NFTs) |
| Auction Mechanism | CCA-inspired pro-rata clearing auction |

---

## Repo Structure

```
ownalpha/
├── src/                   # Next.js 14 App Router frontend
│   ├── app/               # Pages & routing
│   ├── components/        # UI components
│   ├── hooks/             # Web3 / wagmi hooks
│   ├── lib/               # ABIs, chain config, helpers
│   └── types/             # TypeScript types
├── scripts/               # Deployment & contract interaction scripts
├── public/                # Static assets
├── docs/
│   ├── PROJECT.md         # Problem, solution, business model, limitations
│   ├── TECHNICAL.md       # Architecture deep-dive, setup, demo guide
│   └── EXTRAS.md          # Demo video & presentation links
├── bsc.address            # Deployed contract addresses
├── check-contract.js      # Deployment verification utility
├── next.config.ts
└── package.json
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## License

MIT
