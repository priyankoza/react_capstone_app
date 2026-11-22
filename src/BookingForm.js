import { useState, useEffect } from 'react';

// Today's date as YYYY-MM-DD (local time), used as the earliest bookable date
const getToday = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

function BookingForm({ availableTimes, dispatch, submitForm }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState(availableTimes[0] || '');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('');
    const [touched, setTouched] = useState({});

    const today = getToday();

    // When the list of times changes, select the first available one
    useEffect(() => {
        if (!availableTimes.includes(time)) {
            setTime(availableTimes[0] || '');
        }
    }, [availableTimes, time]);

    // ----- React validation rules -----
    const errors = {};
    if (!date) {
        errors.date = 'Please choose a date.';
    } else if (date < today) {
        errors.date = 'Please choose today or a future date.';
    }
    if (!time) {
        errors.time = 'Please choose an available time.';
    }
    const guestCount = Number(guests);
    if (!guests || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
        errors.guests = 'Number of guests must be between 1 and 10.';
    }
    if (!occasion) {
        errors.occasion = 'Please select an occasion.';
    }

    const isFormValid = Object.keys(errors).length === 0;

    const handleBlur = (field) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        if (newDate) {
            dispatch({ type: 'UPDATE_TIMES', date: newDate });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            // Show every error if someone gets past the disabled button
            setTouched({ date: true, time: true, guests: true, occasion: true });
            return;
        }
        submitForm({ date, time, guests: guestCount, occasion });
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit} noValidate={false}>
            {/* Date */}
            <label htmlFor="res-date">Choose date</label>
            <input
                type="date"
                id="res-date"
                value={date}
                min={today}
                required
                onChange={handleDateChange}
                onBlur={handleBlur('date')}
                aria-invalid={touched.date && !!errors.date}
                aria-describedby="date-error"
            />
            {touched.date && errors.date && (
                <p id="date-error" className="field-error" role="alert">{errors.date}</p>
            )}

            {/* Time */}
            <label htmlFor="res-time">Choose time</label>
            <select
                id="res-time"
                value={time}
                required
                onChange={(e) => setTime(e.target.value)}
                onBlur={handleBlur('time')}
                aria-invalid={touched.time && !!errors.time}
                aria-describedby="time-error"
            >
                {availableTimes.length === 0 && (
                    <option value="">No times available</option>
                )}
                {availableTimes.map((availableTime) => (
                    <option key={availableTime} value={availableTime}>
                        {availableTime}
                    </option>
                ))}
            </select>
            {touched.time && errors.time && (
                <p id="time-error" className="field-error">{errors.time}</p>
            )}

            {/* Guests */}
            <label htmlFor="guests">Number of guests</label>
            <input
                type="number"
                placeholder="1"
                min="1"
                max="10"
                step="1"
                id="guests"
                required
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onBlur={handleBlur('guests')}
                aria-invalid={touched.guests && !!errors.guests}
                aria-describedby="guests-error"
            />
            {touched.guests && errors.guests && (
                <p id="guests-error" className="field-error">{errors.guests}</p>
            )}

            {/* Occasion */}
            <label htmlFor="occasion">Occasion</label>
            <select
                id="occasion"
                value={occasion}
                required
                onChange={(e) => setOccasion(e.target.value)}
                onBlur={handleBlur('occasion')}
                aria-invalid={touched.occasion && !!errors.occasion}
                aria-describedby="occasion-error"
            >
                <option value="" disabled>
                    Select an occasion
                </option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
            {touched.occasion && errors.occasion && (
                <p id="occasion-error" className="field-error">{errors.occasion}</p>
            )}

            <input
                type="submit"
                value="Make Your reservation"
                disabled={!isFormValid}
                aria-label="On Click"
            />
        </form>
    );
}

export default BookingForm;