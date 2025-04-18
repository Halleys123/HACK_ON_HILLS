const HotelSchema = require('../../schemas/HotelSchema');
const RoomSchema = require('../../schemas/RoomSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const addRoom = catchAsync(async (req, res, next) => {
  const { hotelId } = req.body;
  const { user } = req;
  let hotel;
  if (user.role == 'owner') {
    hotel = await HotelSchema.find({
      ownerId: user._id,
    });
  }
  if (!hotel) {
    return sendResponse(
      res,
      403,
      false,
      "Not authorized to add rooms to someone else's hotel",
      {}
    );
  }
  const {
    roomNumber,
    type,
    pricePerNight,
    maxAdults = 1,
    maxChildren = 0,
  } = req.body;
  const newRoom = new RoomSchema({
    hotelId,
    roomNumber,
    type,
    pricePerNight,
    maxAdults,
    maxChildren,
  });
  const roomSave = await newRoom.save();
  if (!roomSave) {
    throw new Error('Unable to add room to the Hotel, Please try again later');
  }
  sendResponse(res, 200, true, 'Room added successfully', { room: roomSave });
});

const addMultipleRooms = catchAsync(async (req, res, next) => {
  const { hotelId } = req.body;
  const { user } = req;

  let hotel = null;
  if (user.role == 'owner') {
    hotel = await HotelSchema.find({
      ownerId: user.id,
    });
  }

  if (!hotel) {
    return sendResponse(
      res,
      403,
      false,
      "Not authorized to add rooms to someone else's hotel",
      {}
    );
  }
  const { rooms } = req.body;
  if (!Array.isArray(rooms) || rooms.length === 0) {
    return sendResponse(res, 400, false, 'Invalid rooms data provided', {});
  }

  console.log(rooms);
  const newRooms = rooms.map((room) => ({
    hotelId,
    roomNumber: room.roomNumber,
    type: room.type,
    pricePerNight: room.pricePerNight,
    maxAdults: room.maxAdults,
    maxChildren: room.maxChildren,
  }));

  console.log(newRooms);

  try {
    // Validate each room instance before saving
    for (const room of newRooms) {
      const validationRoom = new RoomSchema(room);
      await validationRoom.validate(); // Ensure each room passes schema validation
    }

    const savedRooms = await RoomSchema.insertMany(newRooms);
    sendResponse(res, 200, true, 'Rooms added successfully', {
      rooms: savedRooms,
    });
  } catch (error) {
    console.error('Error while adding multiple rooms:', error.message);
    return sendResponse(
      res,
      500,
      false,
      'Unable to add rooms to the Hotel, Please try again later',
      { error: error.message }
    );
  }
});

module.exports = {
  addRoom,
  addMultipleRooms,
};
