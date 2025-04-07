const RoomSchema = require('../../schemas/RoomSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const deleteRoom = catchAsync(async (req, res, next) => {
  const { hotelId } = req.user;
  if (!hotelId) {
    return sendResponse(
      res,
      403,
      false,
      "Not authorized to delete rooms from someone else's hotel",
      {}
    );
  }
  const { roomId } = req.params;
  const deletedRoom = await RoomSchema.findOneAndDelete({
    _id: roomId,
    hotelId,
  });
  if (!deletedRoom) {
    return sendResponse(
      res,
      404,
      false,
      'Room not found or you are not authorized to delete it',
      {}
    );
  }
  sendResponse(res, 200, true, 'Room deleted successfully', {
    room: deletedRoom,
  });
});

const deleteMultipleRooms = catchAsync(async (req, res, next) => {
  const { hotelId } = req.user;
  if (!hotelId) {
    return sendResponse(
      res,
      403,
      false,
      "Not authorized to delete rooms from someone else's hotel",
      {}
    );
  }
  const { roomIds } = req.body;
  if (!Array.isArray(roomIds) || roomIds.length === 0) {
    return sendResponse(res, 400, false, 'Invalid room IDs provided', {});
  }

  const deletedRooms = await RoomSchema.deleteMany({
    _id: { $in: roomIds },
    hotelId,
  });

  if (deletedRooms.deletedCount === 0) {
    return sendResponse(
      res,
      404,
      false,
      'No rooms found to delete or you are not authorized to delete them',
      {}
    );
  }

  sendResponse(res, 200, true, 'Rooms deleted successfully', {
    deletedCount: deletedRooms.deletedCount,
  });
});

module.exports = {
  deleteRoom,
  deleteMultipleRooms,
};
