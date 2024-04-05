import { useState, useEffect } from "react";
import queryString from "query-string";
import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
  //state
  const [hotels, setHotels] = useState([]);

  //when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, fromDate, toDate, bed } = queryString.parse(
      window.location.search
    );
    console.table({ location, fromDate, toDate, bed });
    searchListings({ location, fromDate, toDate, bed }).then((res) => {
      console.log("SEARCH RESULTS ===> " + res.data);
      setHotels(res.data);
    });
  }, []);

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((h) => (
            <SmallCard key={h._id} h={h} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
