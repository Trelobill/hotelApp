import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { read, updateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HotelEditForm from "../components/forms/HotelEditForm";
import { useNavigate } from "react-router-dom";

const EditHotel = () => {
  const { hotelId } = useParams();
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  // destructuring variables from state
  const { title, content, price, from, to, bed } = values;
  const navigate = useNavigate();

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(hotelId);
    console.log(res.data);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = {
      title: "Title is required",
      content: "Content is required",
      location: "Location is required",
      price: "Price is required",
      bed: "Number of beds is required",
      from: "From date is required",
      to: "To date is required",
    };

    // Check if any required field is missing
    for (const field in requiredFields) {
      if (!eval(field)) {
        toast.error(requiredFields[field]);
        return;
      }
    }

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    try {
      let res = await updateHotel(token, hotelData, hotelId);
      console.log("HOTEL UPDATE RES", res);
      toast.success(`${res.data.title} is updated`);
      setTimeout(() => {
        navigate("/dashboard/seller");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              setLocation={setLocation}
              handleKeyPress={handleKeyPress}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
