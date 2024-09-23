import { useState, useEffect } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = 'ESSQhHb1zCBXURnhwpYfkKwpXUaM08Dfn5EDHl0NikF1W9Odpo823gIU';

const useFetchImages = (tourNames) => {
  const [imagesMap, setImagesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [hoveredTour, setHoveredTour] = useState(null);
  const [videosCache, setVideosCache] = useState({}); // Cache to store fetched videos

  // Fetch videos for a single tour name when hovered
  const fetchVideoForTour = async (tourName) => {
    // Check if the video is already cached
    if (videosCache[tourName]) {
      setHoveredVideo(videosCache[tourName]);
      return;
    }

    try {
      const response = await axios.get('https://api.pexels.com/videos/search', {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query: tourName,
          per_page: 1, // Only fetch one video
        },
      });
      const videos = response.data.videos;
      
      if (videos && videos.length > 0 && videos[0].video_files.length > 0) {
        const videoLink = videos[0].video_files[0].link;
        setVideosCache((prevCache) => ({ ...prevCache, [tourName]: videoLink })); // Cache the video
        setHoveredVideo(videoLink);
      } else {
        setHoveredVideo(null); // No video found
      }
    } catch (error) {
      console.error('Error fetching video from Pexels:', error);
      setHoveredVideo(null); // Handle error by setting no video
    }
  };

  // Handle tour name hover event
  const handleTourHover = (tourName) => {
    // Prevent fetching the same video repeatedly
    if (hoveredTour !== tourName) {
      setHoveredTour(tourName);
      fetchVideoForTour(tourName); // Fetch video when a tour is hovered
    }
  };

  useEffect(() => {
    const fetchTourImages = async () => {
      if (!tourNames || tourNames.length === 0) {
        setLoading(false);
        return;
      }

      const newImagesMap = {};

      try {
        // Fetch images for all tours
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
      } catch (error) {
        console.error("Error fetching images from Pexels:", error);
        setError(error);
      } finally {
        setImagesMap(newImagesMap);
        setLoading(false);
      }
    };

    fetchTourImages();
  }, [tourNames]);

  return { imagesMap, hoveredVideo, loading, error, handleTourHover };
};

export default useFetchImages;
