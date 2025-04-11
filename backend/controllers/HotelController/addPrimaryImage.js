const fs = require('fs');
const path = require('path');
const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const addPrimaryImage = catchAsync(async (req, res) => {
  const { hotelId } = req.params;
  const user = req.user;

  const hotel = await HotelSchema.findOne({
    _id: hotelId,
    owner: user._id,
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
  // just add extension to hotelId
  const extension = path.extname(file.originalname);
  const filePath = path.join(
    __dirname,
    '../../public/images/',
    hotelId,
    extension
  );

  // create directory if not exists
  const dir = path.join(__dirname, '../../public/images/', hotelId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // move file to directory
  fs.rename(file.path, filePath, (err) => {
    if (err) {
      return sendResponse(res, 500, false, 'Error moving file', null);
    }
  });
  // update hotel primary image
  sendResponse(res, 200, true, 'Primary image added successfully', {
    primaryImage: filePath,
  });
});

module.exports = { addPrimaryImage };
