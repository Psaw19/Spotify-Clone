"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    player.setId(data.id);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 hover:bg-neutral-800/50 cursor-pointer w-full p-2 rounded-md"
    >
      <div className=" relative rounded-md overflow-hidden min-h-[48px] min-w-[48px]">
        <Image
          src={imageUrl || "/images/liked.png"}
          fill
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex overflow-hidden flex-col gap-y-1">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
