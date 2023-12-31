// import React from 'react';

import { useContext, useState } from "react";
import Button from "../Button/Button";
import Calender from "./Calender";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../Modal/BookingModal";
import { formatDistance } from "date-fns";
import { addBooking, updateStatus } from "../../api/bookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomReservation = ({ roomData }) => {
  const { user, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
  };
  // console.log(isOpen)
  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData.to), new Date(roomData.from)).split(
        " "
      )[0]
    ) * roomData.price;

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });
  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData.host.email,
    location: roomData.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: roomData.title,
    roomId: roomData._id
  });
  const handleSelect = () => {
    setValue({ ...value });
  };
  const modalHandler = () => {
    addBooking(bookingInfo)
      .then((data) => {
        console.log(data);
        updateStatus(roomData._id,true).then(data=>{
          console.log(data)
          toast.success("Booking successful");
          navigate('/dashboard/my-bookings')
          closeModal()
        })
      
      })
      .catch((err) => {
        closeModal()
        console.log(err);
      });
    console.log(bookingInfo);
  };
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {roomData.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />

      <div className="flex justify-center">
        <Calender value={value} handleSelect={handleSelect} />
      </div>
      <hr />
      <div className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData.host.email === user.email || roomData.booked}
          label="Reserve"
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>total</div>
        <div>$ {totalPrice}</div>
      </div>
      <BookingModal
        closeModal={closeModal}
        modalHandler={modalHandler}
        bookingInfo={bookingInfo}
        isOpen={isOpen}
      />
    </div>
  );
};

export default RoomReservation;
