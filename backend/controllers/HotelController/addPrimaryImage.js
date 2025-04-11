const fs = require('fs');
const path = require('path');
const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const addPrimaryImage = catchAsync(async (req, res) => {
  const { hotelId } = req.params;
  const user = req.user;
  console.log(hotelId, user._id);
  const hotel = await HotelSchema.findOne({
    _id: hotelId,
    ownerId: user._id,
  });
  if (!hotel) {
    return sendResponse(
      res,
      404,
      false,
      'Hotel not found or you are not the owner of this hotel',
      null
    );
  }
  if (!req.file) {
    return sendResponse(res, 400, false, 'No file uploaded', null);
  }

  const file = req.file;

  if (!file) {
    console.log('Not working at 1');
  }
  const extension = path.extname(file.originalname);
  if (!extension) {
    console.log('Not working at 2');
  }
  const fileName = `${hotelId}${extension}`;
  if (!fileName) {
    console.log('Not working at 3');
  }
  const filePath = path.join(__dirname, '../../public/images/', fileName);
  if (!filePath) {
    console.log('Not working at 4');
  }

  // Ensure the directory exists
  const dir = path.join(__dirname, '../../public/images/');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Move the file to the target directory
  try {
    fs.renameSync(file.path, filePath);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, false, 'Error moving file', null);
  }

  // Update the hotel's primary image
  hotel.primaryImage = `${fileName}`;
  await hotel.save();

  sendResponse(res, 200, true, 'Primary image added successfully', {
    primaryImage: hotel.primaryImage,
  });
});

module.exports = { addPrimaryImage };
