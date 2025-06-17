import React from 'react';
import { Button } from '@/components/atoms/button';
import { Bookmark, X } from 'lucide-react';

interface BookmarksListProps {
  bookmarks: Array<{
    cfi: string;
    page: number;
    timestamp: string;
    text: string;
  }>;
  onSelectBookmark: (cfi: string) => void;
  onRemoveBookmark: (cfi: string) => void;
}

const BookmarksList: React.FC<BookmarksListProps> = ({ 
  bookmarks, 
  onSelectBookmark, 
  onRemoveBookmark 
}) => {
  // Format the bookmark date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (bookmarks.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center p-4 text-gray-500">
          <Bookmark className="mr-2 h-5 w-5" />
          <p>No bookmarks yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-[50vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Bookmarks</h3>
      <ul className="space-y-2">
        {bookmarks.map((bookmark, index) => (
          <li key={index} className="border-b border-gray-200 pb-2 last:border-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <button 
                  onClick={() => onSelectBookmark(bookmark.cfi)}
                  className="text-left hover:text-blue-600 transition-colors"
                >
                  <p className="font-medium">{bookmark.text}</p>
                  <p className="text-xs text-gray-500">{formatDate(bookmark.timestamp)}</p>
                </button>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-red-500"
                onClick={() => onRemoveBookmark(bookmark.cfi)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarksList;