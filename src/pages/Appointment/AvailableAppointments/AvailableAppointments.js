import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

    // Fetching using the react hooks 
    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: () => fetch(`http://localhost:5000/v2/appointmentOptions?date=${date}`)
            .then(res => res.json())
    });
    if (isLoading) {
        return <Loading></Loading>
    }

    // We are using react/tanstack query that's why we do not need to use fetch
    /*  useEffect(() => {
         fetch('http://localhost:5000/appointmentOptions')
             .then(res => res.json())
             .then(data => setAppointmentOptions(data))
     }, []) */

    return (
        <section className='my-16 mx-5'>
            <p className='text-center text-secondary font-bold'>Available Services on {format(selectedDate, 'PPP')}</p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 my-8 '>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;