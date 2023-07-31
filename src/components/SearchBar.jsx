import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

export const SearchBar = (props) => {
  const { handleFetchLocationWeather } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleFetchLocationWeather(searchQuery, true);
    }
  };

  return (
    <div className="search">
      <TextField
        variant="outlined"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => handleFetchLocationWeather(searchQuery, true)}
            >
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />
    </div>
  );

  //   const { handleSearchPlaceChange } = props;

  //   const inputRef = useRef();

  //   const handlePlaceChanged = () => {
  //     const [place] = inputRef.current.getPlaces();
  //     if (place) {
  //       handleSearchPlaceChange(place);
  //       console.log(place);
  //     }
  //   };

  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  //     libraries: ["places"],
  //   });

  //   return (
  //     isLoaded && (
  //       <>
  //         <StandaloneSearchBox
  //           onLoad={(ref) => (inputRef.current = ref)}
  //           onPlacesChanged={handlePlaceChanged}
  //         >
  //           <input
  //             type="text"
  //             className="form-control"
  //             placeholder="Enter Location"
  //           />
  //         </StandaloneSearchBox>
  //       </>
  //     )
  //   );
};
