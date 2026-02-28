import { Play } from "lucide-react";
import Link from 'next/link';

export function MovieRow() {
  const movies = [
    {
      title: "F1",
      funds: "$7.55M",
      img: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    },
    {
      title: "Fire Girl",
      funds: "$2.67M",
      img: "https://www.themoviedb.org/t/p/w1280/nbuWvW6AJy4Kd6kgfEWyU8rVWqU.jpg",
    },
    {
      title: "London Has Fallen",
      funds: "$1.55M",
      img: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    },
    {
      title: "Oopirey",
      funds: "$5.95M",
      img: "https://www.themoviedb.org/t/p/w1280/dOpnJnhABTw85CG80BhBdBH9Teh.jpg",
    },
    {
      title: "Varisu",
      funds: "$3.20M",
      img: "https://www.themoviedb.org/t/p/w1280/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
    },
    {
      title: "Final Destination 5",
      funds: "$6.20M",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRY-xDKrIC0cj-mHHeX9A6K3s3fXn4FjsycWtbRBx2Jd3HcuF",
    },
    {
      title: "Avatar",
      funds: "$4.20M",
      img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJfdu01GP05dCCbubLMIXZgxz4SqKIpQx92wu9zHT7pXovv-Sn",
    },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
      {movies.map((m, i) => (
        <Link
          href="/project/avatar"
          key={i}
          className="block min-w-70 h-40 relative rounded-2xl overflow-hidden shadow-sm group snap-center shrink-0 cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${m.img})` }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-[10px] text-white/70 uppercase tracking-wider mb-0.5">
              Total funds raised
            </p>
            <p className="text-xl font-semibold leading-none">{m.funds}</p>
          </div>

          <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
            Play trailer <Play className="w-3 h-3 fill-current" />
          </button>
        </Link>
      ))}
    </div>
  );
}
