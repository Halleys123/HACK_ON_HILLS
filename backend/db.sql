CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'owner')),
    phone VARCHAR(10),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Hotels (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES Users(id),
    hotel_name VARCHAR(255) NOT NULL,
    description TEXT DEFAULT 'This is a good hotel that is located in your city',
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    images TEXT[],
    rating FLOAT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    coordinates POINT NOT NULL,
    primary_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL REFERENCES Hotels(id),
    room_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) DEFAULT '2 Double Beds, 1 King Bed',
    description TEXT DEFAULT 'This is a good room that is located in your hotel. It has all the basic amenities and is very comfortable.',
    type VARCHAR(50) DEFAULT 'single' CHECK (type IN ('single', 'double', 'suite')),
    price_per_night FLOAT NOT NULL,
    max_adults INTEGER DEFAULT 2,
    max_children INTEGER DEFAULT 2,
    rating FLOAT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    is_available BOOLEAN DEFAULT TRUE,
    images TEXT[],
    amenities TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(id),
    hotel_ids INTEGER[] NOT NULL,
    room_ids INTEGER[] NOT NULL,
    contact JSON,
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP NOT NULL,
    actual_check_in TIMESTAMP,
    actual_check_out TIMESTAMP,
    total_price FLOAT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'cancelled', 'completed')),
    check_in_status VARCHAR(50) DEFAULT 'notCheckedIn' CHECK (check_in_status IN ('checked-in', 'upcoming', 'checked-out')),
    valid_until TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '15 minutes'),
    special_requests TEXT,
    guests JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES Bookings(id),
    user_id INTEGER NOT NULL REFERENCES Users(id),
    amount FLOAT,
    payment_method VARCHAR(50) CHECK (payment_method IN ('card', 'upi', 'netbanking', 'wallet', 'cash')),
    status VARCHAR(50) CHECK (status IN ('success', 'failed')),
    transaction_date TIMESTAMP
);

CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(id),
    hotel_id INTEGER NOT NULL REFERENCES Hotels(id),
    rating FLOAT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);