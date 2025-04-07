const BookingSchema = require('../../schemas/BookingSchema');
const PaymentSchema = require('../../schemas/PaymentSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const dummyPay = catchAsync(async (req, res, next) => {
  // Extract bookingId and (optionally) payment details from the request body.
  const { id: userId } = req.user;
  const { bookingId, amount, paymentMethod } = req.body;

  if (!bookingId) {
    return sendResponse(
      res,
      400,
      false,
      'Booking ID is required for payment processing.',
      {}
    );
  }

  // Find the booking record associated with the bookingId.
  const booking = await BookingSchema.findById(bookingId);
  if (!booking) {
    return sendResponse(res, 404, false, 'Booking not found', {});
  }
  if (booking.userId != userId) {
    return sendResponse(
      res,
      403,
      false,
      'You are not authorized to make a payment for this booking.',
      {}
    );
  }
  if (new Date(Date.now()) > new Date(booking.validUntil)) {
    return sendResponse(
      res,
      400,
      false,
      'Session Time out, Please restart your process',
      {
        currentTime: new Date().toLocaleString(),
        validUntil: new Date(booking.validUntil).toLocaleString(),
        booking,
      }
    );
  }

  // Check if the booking is still in the pending state.
  // (Using a partial TTL index or manual checks, ensure that only pending bookings can be processed.)
  if (booking.status !== 'pending') {
    return sendResponse(
      res,
      409,
      false,
      'Booking is no longer pending. Payment cannot be processed.',
      {}
    );
  }

  // Simulate payment processing.
  // In a real-world scenario, this is where you would call your payment gateway.
  // Here, we assume the payment succeeds immediately.
  // Optionally, introduce a delay (e.g., with setTimeout) to simulate processing time.

  // Create a dummy payment record in our Payment collection.
  const paymentRecord = await PaymentSchema.create({
    bookingId: booking._id,
    userId: booking.userId,
    // Use the provided amount or a default value (or the booking's totalPrice if applicable)
    amount: amount || booking.totalPrice || 100,
    // Use the provided payment method or a default value
    paymentMethod: paymentMethod || 'card',
    status: 'success',
    transactionDate: new Date(),
  });

  // Now that payment is successful, update the booking status to "confirmed".
  booking.status = 'confirmed';
  await booking.save();

  // Optionally, you can update the associated room status.
  // Since the room was already marked as unavailable during the booking creation, no update may be required here.

  return sendResponse(
    res,
    200,
    true,
    'Payment successful. Your booking is now confirmed.',
    {
      booking,
      paymentRecord,
      currentTime: new Date().toLocaleString(),
      validUntil: new Date(booking.validUntil).toLocaleString(),
    }
  );
});

module.exports = { dummyPay };
