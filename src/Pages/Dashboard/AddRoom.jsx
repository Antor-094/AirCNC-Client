import { useState } from "react";
import AddRoomForm from "../../Components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { addRoom } from "../../api/rooms";
import { toast } from "react-hot-toast";

const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [dates,setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const {user} = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const location = e.target.location.value;
    const title = e.target.title.value;
    const from = dates.startDate
    const to = dates.endDate
    const price = e.target.price.value;
    const total_guest = e.target.total_guest.value;
    const bedrooms = e.target.bedrooms.value;
    const bathrooms = e.target.bathrooms.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    const image = e.target.image.files[0];

    //Upload image
    imageUpload(image)
      .then((data) => {
        const roomData = {
          
          location,
          title,
          from,
          to,
          price:parseFloat(price),
          total_guest,
          bedrooms,
          bathrooms,
          description,
          image: data.data.display_url,
          host:{
            name:user?.displayName,
            image:user?.photoURL ,
            email:user?.email
          },
          category,

        };
      
        //post room data to server
        addRoom(roomData).then(data=>{
          console.log(data)
          toast.success("Room Added successfully");
        }).catch(err=>{
          console.log(err)
        })

        // console.log(roomData)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name.slice(0, 25));
  };

  const handleDates = ranges =>{
    setDates(ranges.selection)

  }
  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      loading={loading}
      handleImageChange={handleImageChange}
      uploadButtonText={uploadButtonText}
      dates={dates}
      handleDates={handleDates}
    />
  );
};

export default AddRoom;
