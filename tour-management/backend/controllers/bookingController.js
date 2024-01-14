import Booking from '../models/Booking.js'


//create new booking
export const createBooking = async (req, res) =>{
    const newBooking = new Booking(req.body);
    console.log('Received booking request:', req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({success:true, message:'Your tour is booked',data:savedBooking});
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(503).json({ success: false, message: 'Internal server error', error: err.message });

    }
};


//get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Booking.findById(id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, message: 'Successful', data: book });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



//get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find();
        res.status(200).json({ success: true, message: 'Successful', data: books });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
