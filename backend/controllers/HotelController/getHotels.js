const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const getAllHotels = catchAsync(async (req, res, next) => {
  let {
    ownerId,
    city,
    state,
    country,
    zipcode,
    minRating,
    maxRating,
    page = 1,
    limit = 10,
    bounds, // New parameter for map bounds
  } = req.query;

  state = state ? state.split(',') : state;
  city = city ? city.split(',') : city;
  country = country ? country.split(',') : country;
  zipcode = zipcode ? zipcode.split(',') : zipcode;

  const query = {};

  // Apply filters only if query parameters are provided
  if (ownerId)
    query.ownerId = { $in: Array.isArray(ownerId) ? ownerId : [ownerId] };
  if (city) query.city = { $in: Array.isArray(city) ? city : [city] };
  if (state) query.state = { $in: Array.isArray(state) ? state : [state] };
  if (country)
    query.country = { $in: Array.isArray(country) ? country : [country] };
  if (zipcode)
    query.zipcode = { $in: Array.isArray(zipcode) ? zipcode : [zipcode] };
  if (minRating || maxRating) {
    query.rating = {};
    if (minRating) query.rating.$gte = Number(minRating);
    if (maxRating) query.rating.$lte = Number(maxRating);
  }

  // Add geospatial query if bounds are provided
  if (bounds) {
    try {
      // Parse the bounds parameter (format: "west,south,east,north")
      const [west, south, east, north] = bounds.split(',').map(Number);

      // Create a geospatial query using $geoWithin and $box
      query.coordinates = {
        $geoWithin: {
          $box: [
            [west, south], // Southwest corner [lng, lat]
            [east, north], // Northeast corner [lng, lat]
          ],
        },
      };
    } catch (error) {
      console.error('Error parsing map bounds:', error);
      // Continue without the geospatial filter if bounds are invalid
    }
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Count total matching hotels for pagination info
  const totalHotels = await HotelSchema.countDocuments(query);

  // Fetch hotels based on query
  const hotels = await HotelSchema.find(query).skip(skip).limit(Number(limit));

  // Send response
  sendResponse(res, 200, true, 'List of hotels within the specified criteria', {
    query,
    hotels,
    pagination: {
      total: totalHotels,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(totalHotels / Number(limit)),
    },
  });
});

const getHotel = catchAsync(async (req, res, next) => {
  const { hotelId } = req.params;
  const hotel = await HotelSchema.findById(hotelId);

  if (!hotel) {
    return sendResponse(res, 404, false, 'Hotel not found', {});
  }
  sendResponse(res, 200, true, 'Hotel details found', { hotel });
});

module.exports = { getAllHotels, getHotel };
