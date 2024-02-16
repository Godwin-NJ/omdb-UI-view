import { useEffect, useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import { setBaseUrl } from "./SetApiCall";
import axios from "axios";
// const { useDebounce }  = require("use-debounce") ;
import { useDebounce } from "use-debounce";
import { useDebouncedCallback } from "use-debounce";
import styled from "styled-components";

// axios

function App() {
  useEffect(() => {
    setBaseUrl();
  }, []);
  const [searchTitle, setSearchTitle] = useState<string>();
  const [movieId, setMovieId] = useState<string>();
  const [searchData, setSearchData] = useState<{
    Response: boolean;
    Search: any[];
    totalResults: string;
  }>();
  console.log(searchData, "searchData");
  const [debouncedValue] = useDebounce(searchTitle, 1000);
  // console.log(debouncedValue, "debouncedValue");
  //const [debouncedIDValue] = useDebounce(movieId, 500);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const fetchAPi = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw Error("Errow fetching data");
    }
  };

  // useEffect(() => {

  // },)

  const searchMovieByTitle = async () => {
    const data = await fetchAPi(
      `/Movie/getmoviebytitle?title=${debouncedValue}`
    );
    setSearchData(data);
  };

  // console.log(searchMovieByTitle, "searchMovieByTitle");

  const getMovieByID = (id: string) => {
    return fetchAPi(`/Movie/getmoviebyid?id=${id}`);
  };

  return (
    <Wrapper>
      <h4>OMDB Movie</h4>
      {/* search and result view */}
      <section className="searchSeaction">
        <div>
          <label htmlFor="search">Search Movie By Title</label>
          <input
            type="text"
            name="search"
            value={searchTitle}
            onChange={handleOnchange}
            style={{ margin: "0px 5px" }}
          />
          <input
            type="submit"
            value="submit"
            onClick={searchMovieByTitle}
            style={{ margin: "0px 5px" }}
          />
        </div>

        {/* search results will come in here */}
        <div>
          {searchData &&
            searchData?.Search?.map((item: any) => {
              const { Title, Year, imdbID, Type, Poster } = item;
              return (
                <div className="movieData">
                  <p>{Title}</p>
                  <p>{Year}</p>
                  <p>{imdbID}</p>
                  <p>{Type}</p>
                  <p>{Poster}</p>
                </div>
              );
            })}
        </div>
      </section>
      {/* This will be my horizontal rule across each view */}
      <span></span>
      {/* search queries view */}
      <section>
        <h4>5 Latest Search Queries</h4>
      </section>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .searchSeaction {
    display: flex;
    flex-direction: column;
  }
`;
