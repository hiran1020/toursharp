import { useState, useEffect } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = 'ESSQhHb1zCBXURnhwpYfkKwpXUaM08Dfn5EDHl0NikF1W9Odpo823gIU';


const useFetchImages = (tourNames) => {
  const [imagesMap, setImagesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videosMap, setVideosMap] = useState({});

  const fetchVideos = async (tourNames) => {
    try {
      const response = await axios.get('https://api.pexels.com/videos/search', {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query: tourNames.join(', '),
          per_page: 5,
        },
      });
      return response.data.videos;
    } catch (error) {
      console.error('Error fetching videos from Pexels', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchTourImagesAndVideos = async () => {
      if (!tourNames || tourNames.length === 0) {
        setLoading(false);
        return;
      }

      const newImagesMap = {};
      const newVideosMap = {};

      try {
        // Fetch images
        for (const tourName of tourNames) {
          const query = tourName.split(" in ").pop();
          const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          });
          const data = await response.json();

          if (data.photos && data.photos.length > 0) {
            newImagesMap[tourName] = data.photos[0].src.landscape;
          } else {
            newImagesMap[tourName] = ''; // No images found
          }
        }

        // Fetch videos
        const videos = await fetchVideos(tourNames);
        for (const tourName of tourNames) {
          const video = videos.find(v => v.name.toLowerCase() === tourName.toLowerCase());
          newVideosMap[tourName] = video ? video.video_files[0].link : null; // Get the first video link
        }
      } catch (error) {
        console.error("Error fetching data from Pexels:", error);
        setError(error);
      } finally {
        setImagesMap(newImagesMap);
        setVideosMap(newVideosMap);
        setLoading(false);
      }
    };

    fetchTourImagesAndVideos();
  }, [tourNames]);

  return { imagesMap, videosMap, loading, error };
};

export default useFetchImages;
