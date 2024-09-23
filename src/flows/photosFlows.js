require('dotenv').config();
const axios = require('axios');

const pixabayKey = process.env.PIXABAY_API_KEY;
const PIXABAY_URL = `https://pixabay.com/api/?key=${pixabayKey}`;
const MIN_PER_PAGE = 3;
const MAX_PER_PAGE = 200;

// I am saving the cached photos in an array because
// in this specific flow, Pixabay always returns the same photos in the same order.
// If random photos were fetched I would use an indexable key for efficiency
const cache = [];

async function fetchPhotos(req, res) {
  console.log('Fetching photos...');
  const numPhotos = parseInt(req.params.count);

  if (cache.length >= numPhotos) {
    console.log('Returning photos from cache');
    return res.json({ photos: cache.slice(0, numPhotos) });
  }
  const numPhotosToFetch = numPhotos - cache.length;

  try {
    console.log('Fetching photos from Pixabay');
    const photos = await fetchPhotosFromPixabay(numPhotosToFetch);
    cache.push(...photos);

    console.log('Photos fetched successfully!', numPhotos);
    return res.json({ photos: cache.slice(0, numPhotos) });
  } catch (error) {
    console.log('Error fetching photos from Pixabay!', error.message);   
    return res.status(500).json({ error: 'Failed to fetch photos' });
  }
}

async function fetchPhotosFromPixabay(photosToFetch) { 
  const batches = Math.ceil(photosToFetch / MAX_PER_PAGE);
  const allPhotos = [];

  for (let i = 0; i < batches; i++) {
    const photosInBatch = Math.min(photosToFetch - allPhotos.length, MAX_PER_PAGE);
    const numPhotosToFetch = Math.max(photosInBatch, MIN_PER_PAGE);

    const reqUrl = `${PIXABAY_URL}&per_page=${numPhotosToFetch}`;
    const response = await axios.get(reqUrl);
  
    const photos = response.data.hits.map(photo => photo.pageURL);
    allPhotos.push(...photos);
  }

  return allPhotos;
}

module.exports = { fetchPhotos };
