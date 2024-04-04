import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// destructure values from ant components
const { RangePicker } = DatePicker;
const { Option } = Select;

const Search = () => {
  const navigate = useNavigate();
  //state
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [bed, setBed] = useState("");

  const handleSubmit = () => {
    console.log("PATITHIKE");
    let queryString = `/search-result?`;
    console.log(location, fromDate, toDate, bed);
    if (location) {
      queryString += `location=${location}&`;
    }
    if (fromDate) {
      queryString += `fromDate=${fromDate}&`;
    }
    if (toDate) {
      queryString += `toDate=${toDate}&`;
    }
    if (bed) {
      queryString += `bed=${bed}&`;
    }

    // Remove the trailing '&' if it exists
    queryString = queryString.replace(/&$/, "");
    console.log(queryString);
    navigate(`${queryString}`, { replace: true });
    // navigate(0);
  };

  return (
    <div className="d-flex pb-1">
      <div className="w-100">
        <ReactGoogleAutocomplete
          className="form-control m-2"
          placeholder="Location"
          apiKey={process.env.REACT_APP_GOOGLEPLACES_API_KEY}
          onPlaceSelected={(place) => {
            setLocation(place.formatted_address);
          }}
          style={{ height: "50px", margin: "8px" }}
          onChange={(e) => setLocation(e.target.value)}
          //prevent submit on enter select an autocomplete location
          //   onKeyDown={handleKeyPress}
        />
      </div>
      <RangePicker
        style={{ height: "50px", marginTop: "8px", marginLeft: "15px" }}
        className="w-100 custom-range-picker"
        onChange={(value, dateString) => {
          setFromDate(dateString[0]);
          setToDate(dateString[1]);
        }}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <Select
        style={{ height: "65px", padding: "8px" }}
        onChange={(value) => setBed(value)}
        className="w-100"
        size="large"
        placeholder="Number of beds"
        // value={bed} // Set the value of the Select component
      >
        <Option key={1}> {1}</Option>
        <Option key={2}> {2}</Option>
        <Option key={3}> {3}</Option>
        <Option key={4}> {4}</Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square"
      />
    </div>
  );
};

export default Search;
