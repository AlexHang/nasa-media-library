import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssetById } from '../api/nasa-api';
import Loader from '../utils/Loader';

const ShowPage = () => {
  const { nasaId } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const data = await getAssetById(nasaId);
        
        // Store the collection metadata
        if (data && data.collection && data?.collection?.items?.length > 0) {
          const metadata = data?.collection?.items?.find(item => item?.href?.includes('metadata.json'));
          
          if (metadata) {
            const metadataResponse = await fetch(metadata.href);
            const metadataJson = await metadataResponse.json();
            setCollection(metadataJson);
            
            const imageItems = data.collection.items.filter(item => 
              item.href.endsWith('.jpg') || 
              item.href.endsWith('.png') || 
              item.href.endsWith('.jpeg') ||
              item.href.endsWith('.gif')
            );
            
            const uniqueImages = [];
            const imageMap = new Map();
            
            imageItems.forEach(item => {
              /* couldn't find a collection with multiple images,
               so if you want to test it, uncomment the next line
               and you will see the same image multiple times with multiple resolutions */
              // uniqueImages.push(item);
              const filename = item.href.split('/').pop().split('~')[0];
              if (!imageMap.has(filename)) {
                imageMap.set(filename, item);
                uniqueImages.push(item);
              }
            });
            
            setImages(uniqueImages);
          }
        }
      } catch (err) {
        setError('Failed to fetch collection details. Please try again.');
        console.log('Error fetching collection:', err);
      } finally {
        setLoading(false);
      }
    };

    if (nasaId) {
      fetchCollection();
    }
  }, [nasaId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageSelect = (index) => {
    setActiveImage(index);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={handleGoBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">Collection not found</div>
        <button 
          onClick={handleGoBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    title = 'Untitled',
    location = 'Unknown location',
    photographer = 'Unknown photographer',
    description = 'No description available',
    keywords = [],
    date_created = null
  } = collection['AVAIL:MediaMetadata'] || {};

  return (
    <div className="max-w-4xl mx-auto bg-black rounded-lg shadow-md overflow-hidden">
      <div className="p-4 md:p-6">
        <button 
          onClick={handleGoBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          Back to search results
        </button>

        <h1 data-testid="title-result" className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
        
        {images.length > 0 ? (
          <div className="mb-6">
            <div className="bg-gray-100 p-2 rounded-lg mb-2">
              <img 
                src={images[activeImage].href} 
                alt={title}
                className="w-full h-auto rounded-md max-h-96 object-contain mx-auto"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto py-2">
                {images.map((image, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleImageSelect(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded ${activeImage === idx ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img 
                      src={image.href} 
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/80x80?text=NA';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-200 h-64 flex items-center justify-center mb-6 rounded-lg">
            <p className="text-gray-500">No images available</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Location</h2>
              <p>{location}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Photographer</h2>
              <p>{photographer}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Date</h2>
              <p>{date_created ? date_created : 'Unknown'}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Description</h2>
            <p data-testid="description-result" className="mt-1">{description}</p>
          </div>
          
          {keywords && keywords.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Keywords</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPage;