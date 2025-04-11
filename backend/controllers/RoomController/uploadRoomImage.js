const fs = require('fs');
const path = require('path');
const RoomSchema = require('../../schemas/RoomSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const HotelSchema = require('../../schemas/HotelSchema');

const uploadRoomImage = catchAsync(async (req, res) => {
  const { roomId, hotelId } = req.query;
  const user = req.user;

  const hotel = await HotelSchema.findOne({
    _id: hotelId,
    ownerId: user._id,
  });
  if (!hotel) {
    return sendResponse(
      res,
      403,
      false,
      "Not authorized to upload images to someone else's hotel",
      {}
    );
  }

  const room = await RoomSchema.findOne({
    _id: roomId,
    hotelId: hotel._id,
  });
  if (!room) {
    return sendResponse(
      res,
      404,
      false,
      'Room not found or you are not the owner of this room',
      null
    );
  }
  if (!req.file) {
    return sendResponse(res, 400, false, 'No file uploaded', null);
  }

  const file = req.file;

  const extension = path.extname(file.originalname);
  const fileName = `${roomId}${extension}`;
  const filePath = path.join(__dirname, '../../public/images/', fileName);

  // Ensure the directory exists
  const dir = path.join(__dirname, '../../public/images/');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.renameSync(file.path, filePath);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, false, 'Error moving file', null);
  }

  if (!room.images) {
    room.images = []; // Initialize images array if it doesn't exist
  }
  if (!room.images.includes(fileName)) {
    room.images.push(fileName); // Add the new image to the array
  }

  const updatedRoom = await room.save();
  if (!updatedRoom) {
    return sendResponse(res, 500, false, 'Error updating room', null);
  }

  sendResponse(res, 200, true, 'Room image uploaded successfully', {
    room: updatedRoom,
  });
});

module.exports = { uploadRoomImage };
