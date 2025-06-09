import React from 'react';
import { Banner } from '@/models/Banner';
import Link from 'next/link';

interface BannerCardProps {
  banner?: Banner;
  loading?: boolean;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner, loading }) => {
  if (loading) {
    return (
      <div className="flex-1 w-[300px] md:w-[500px] h-40 rounded-xl bg-gray-200 animate-pulse" />
    );
  }

  if (!banner) return null;

  const CardContent = (
    <div key={banner.id}
      className="relative flex flex-col justify-between h-40 rounded-xl overflow-hidden p-4"
      style={{ backgroundColor: banner.backgroundColor || '#F3F0FF' }}
    >
      <div className="flex-1 w-[300px] md:w-[500px]">
        <h3 className="text-lg font-bold mb-1 text-white drop-shadow-md">{banner.title}</h3>
        {banner.description && (
          <p className="text-sm text-white/90 mb-2 drop-shadow-md">{banner.description}</p>
        )}
      </div>
      {banner.ctaLabel && (
        <button className="mt-2 px-4 py-2 bg-white text-[#7B61FF] rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
          {banner.ctaLabel}
        </button>
      )}
    </div>
  );

  if (banner.link) {
    return (
      <Link href={banner.link} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default BannerCard; 