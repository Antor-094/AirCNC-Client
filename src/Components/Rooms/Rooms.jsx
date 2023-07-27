// import React from 'react';

import { useEffect, useState } from "react";
import Container from "../shared/Container/Container";
import Card from "./Card";
import Loader from "../shared/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [params] = useSearchParams();

  const category = params.get("category");
  console.log(category);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("rooms.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (category) {
          const filtered = data.filter((room) => room.category === category);
          setRooms(filtered);
        } else {
          setRooms(data);
        }

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category]);
  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {rooms.map((room, index) => (
            <Card key={index} room={room}></Card>
          ))}
        </div>
      ) : (
        <div className="pt-12">
          <Heading
            title="No Rooms Available in this category!"
            subtitle="Please Select Other Category"
            center={true}
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
