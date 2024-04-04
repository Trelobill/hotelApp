import React, { useState, useEffect } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { DatePicker, Select } from "antd";
import moment from "moment";
const dayjs = require("dayjs");

const { Option } = Select;

const HotelEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  handleKeyPress,
}) => {
  const { title, content, location, price, bed, from, to } = values;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    if (from) {
      const fromDateFormatted = dayjs(from, "YYYY-MM-DD");
      setFromDate(fromDateFormatted);
    }

    if (to) {
      const toDateFormatted = dayjs(to, "YYYY-MM-DD");
      setToDate(toDateFormatted);
    }
  }, [from, to]);

  const handleFromDateChange = (date, dateString) => {
    const previousDate = document.getElementById("toDate").value;
    const dateAfter = new Date(dateString);
    const dateBefore = new Date(previousDate);
    if (dateAfter > dateBefore) {
      setValues({ ...values, from: dateString, to: dateString });
    } else setValues({ ...values, from: dateString });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        <ReactGoogleAutocomplete
          className="form-control m-2"
          placeholder="Location"
          apiKey={process.env.REACT_APP_GOOGLEPLACES_API_KEY}
          onPlaceSelected={(place) => {
            setValues({ ...values, location: place.formatted_address });
          }}
          style={{ height: "50px" }}
          onChange={(e) => setValues({ ...values, location: e.target.value })}
          defaultValue={location}
          //prevent submit on enter select an autocomplete location
          onKeyDown={handleKeyPress}
        />

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number Of Beds"
          value={bed}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      <DatePicker
        value={fromDate}
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) => {
          handleFromDateChange(date, dateString);
        }}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days").valueOf()
        }
      />

      <DatePicker
        id="toDate"
        value={toDate}
        placeholder="To date"
        name="toDate"
        className="form-control m-2"
        onChange={(date, dateString) => {
          setValues({ ...values, to: dateString });
        }}
        disabledDate={(current) =>
          current && current.valueOf() < moment(from).subtract()
        }
      />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default HotelEditForm;
