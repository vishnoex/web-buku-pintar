import Image from 'next/image';
import React from 'react';

interface InspirationCardProps {
  imageSrc: string;
  date: string;
  title: string;
  author: string;
  onReadClick: () => void;
  onPlayClick: () => void;
}

const InspirationCard: React.FC<InspirationCardProps> = ({
  imageSrc,
  date,
  title,
  author,
  onReadClick,
  onPlayClick,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {date}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{author}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={onReadClick}
            className="flex-1 mr-2 bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
          >
            BACA
          </button>
          <button
            onClick={onPlayClick}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
             <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
