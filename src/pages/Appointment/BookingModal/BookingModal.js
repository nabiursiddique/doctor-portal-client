import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
    //treatment is just another name of appointment
    const { name, slots } = treatment;

    const handleBooking = event => {
        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const email = from.email.value;
        const slot = from.slot.value;
        const phone = from.phone.value;

        const booking = {
            appointmentDate: format(selectedDate, 'PPP'),
            treatment: name,
            PatientName: name,
            slot: slot,
            phone: phone,
            email, //we can also write it like that because the name are the same
        }
        console.log(booking);
        // TODO: send data to the server and once data is saved then close the modal and display success toast
        setTreatment(null);
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" value={format(selectedDate, 'PPP')} className="input w-full" disabled />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <input name='email' type="text" placeholder="Email Address" className="input input-bordered w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" />
                        <input type="submit" className="w-full btn btn-accent" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;