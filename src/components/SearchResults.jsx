import React from 'react';
import ImageCard from './ImageCard';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Results ({results.length})</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item, index) => {
          // Extract the data & links
          const data = item.data?.[0] || {};
          const links = item.links || [];
          
          // Only render if we have a thumbnail and the required data
          if (links.length > 0 && data) {
            return (
              <ImageCard 
                key={data.nasa_id || index}
                nasaId={data.nasa_id}
                title={data.title || 'Untitled'}
                location={data.location || 'Unknown location'}
                photographer={data.photographer || 'Unknown photographer'}
                thumbnail={links[0]?.href || ''}
                dateCreated={data.date_created || 'Unknown date'}
              />
            );
          }
          return null;
        })}
      </div>
      
      {results.length > 0 && (
        <div className="mt-8 text-center text-gray-600">
          End of results
        </div>
      )}
    </div>
  );
};

export default SearchResults;