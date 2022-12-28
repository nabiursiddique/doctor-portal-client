import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ContactUs = () => {
    return (
        <div className='py-8' style={{ background: `url(${appointment})` }}>
            <div className='text-center mt-8'>
                <h4 className="text-xl text-primary font-bold">Contact Us</h4>
                <h2 className="text-3xl text-white">Stay connected with us</h2>
            </div>
            <div className='text-center mt-8'>
                <div className='mt-4'>
                    <input type="text" placeholder="Email Address" className="input w-full max-w-sm" />
                </div>
                <div className='mt-4'>
                    <input type="text" placeholder="Subject" className="input w-full max-w-sm" />
                </div>
                <div className='mt-4'>
                    <textarea className="textarea" rows="5" cols="50" placeholder="Bio"></textarea>
                </div>
                <div className='mt-4'>
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;