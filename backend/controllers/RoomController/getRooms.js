const RoomSchema = require('../../schemas/RoomSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const getRooms = catchAsync(async (req, res, next) => {
  let {
    hotelId,
    roomId,
    roomNumber,
    type,
    minPrice,
    maxPrice,
    minCapacity,
    maxCapacity,
    isAvailable,
    page = 1,
    limit = 10,
  } = req.query;

  hotelId = hotelId ? hotelId.split(',') : hotelId;
  roomNumber = roomNumber ? roomNumber.split(',') : roomNumber;
  roomId = roomId ? roomId.split(',') : roomId;
  type = type ? type.split(',') : type;

  const query = {};

  // Apply filters only if query parameters are provided
  if (roomId) query._id = { $in: Array.isArray(roomId) ? roomId : [roomId] };
  if (hotelId)
    query.hotelId = { $in: Array.isArray(hotelId) ? hotelId : [hotelId] };
  if (roomNumber)
    query.roomNumber = {
      $in: Array.isArray(roomNumber) ? roomNumber : [roomNumber],
    };
  if (type) query.type = { $in: Array.isArray(type) ? type : [type] };
  if (minPrice || maxPrice) {
    query.pricePerNight = {};
    if (minPrice) query.pricePerNight.$gte = Number(minPrice);
    if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
  }
  if (minCapacity || maxCapacity) {
    query.capacity = {};
    if (minCapacity) query.capacity.$gte = Number(minCapacity);
    if (maxCapacity) query.capacity.$lte = Number(maxCapacity);
  }
  if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';

  // Pagination
  const skip = (page - 1) * limit;
  const totalRooms = await RoomSchema.countDocuments(query);
  const totalPages = Math.ceil(totalRooms / limit);

  // Fetch rooms based on query
  const rooms = await RoomSchema.find(query).skip(skip).limit(Number(limit));

  // Send response
  sendResponse(
    res,
    200,
    true,
    'List of all rooms with required query options',
    {
      page: page,
      totalPages,
      rooms,
      query,
    }
  );
});

module.exports = { getRooms };
