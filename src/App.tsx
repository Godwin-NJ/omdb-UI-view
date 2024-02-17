import { useEffect, useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import { setBaseUrl } from "./SetApiCall";
import axios from "axios";
// const { useDebounce }  = require("use-debounce") ;
import { useDebounce } from "use-debounce";
// import { useDebouncedCallback } from "use-debounce";
import styled from "styled-components";
import MovieView from "./MovieView";

// axios

function App() {
  useEffect(() => {
    setBaseUrl();
  }, []);
  // var searchQUeries: string[] = [];
  // console.log(searchQUeries, "searchQUeries");
  const [searchTitle, setSearchTitle] = useState<string>();
  const [searchQueries, setSearchQueries] = useState<string[]>([""]);
  const [openModal, setOpenModal] = useState(false);
  // console.log(openModal, "openModal");
  console.log(searchQueries, "searchQueries");
  // const [movieId, setMovieId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  // console.log(loading, "loading");
  const [searchData, setSearchData] = useState<{
    Response: boolean;
    Search: any[];
    totalResults: string;
  }>();
  const [singleData, setSingleData] = useState<any>();
  // console.log(singleData, "singleData");
  const [debouncedValue] = useDebounce(searchTitle, 500);
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
      setLoading(false);
      setLoadingSingle(false);
      // searchQUeries.push(response.request.responseURL);
      // console.log(response.request.responseURL, "data-fromaxios");
      // const queryData = response.request.responseURL.join(",");
      // console.log(queryData, "queryData");
      setSearchQueries((current) => [...current, response.request.responseURL]);
      return response.data;
    } catch (error) {
      throw Error("Errow fetching data");
    }
  };

  const searchMovieByTitle = async () => {
    const data = await fetchAPi(
      `/Movie/getmoviebytitle?title=${debouncedValue}`
    );
    setSearchData(data);
  };

  // console.log(searchMovieByTitle, "searchMovieByTitle");

  const getMovieByID = async (id: string) => {
    const data = await fetchAPi(`/Movie/getmoviebyid?id=${id}`);
    setSingleData(data);
  };

  return (
    <Wrapper>
      {/* search and result view */}
      <section className="searchSeaction">
        <h4>OMDB Movie</h4>
        <div>
          <label htmlFor="search">Search Movie By Title</label>
          <input
            type="text"
            name="search"
            value={loading ? "Fetching data....." : searchTitle}
            onChange={handleOnchange}
            style={{ margin: "0px 5px" }}
            disabled={loading ? true : false}
          />
          <input
            type="submit"
            value="submit"
            onClick={() => {
              setLoading(true);
              searchMovieByTitle();
            }}
            disabled={loading ? true : false}
            style={{ margin: "0px 5px" }}
          />
        </div>

        {/* search results will come in here */}
        <div className="movieContainer">
          {searchData &&
            searchData?.Search?.map((item: any) => {
              const { Title, Year, imdbID, Type, Poster } = item;
              return (
                <div className="movieData">
                  <div style={{ display: "flex" }}>
                    {/* <p>{Type} - </p> */}
                    <p>{Title}</p>
                  </div>
                  <img
                    src={`${Poster}`}
                    alt={`${Title}`}
                    width="300"
                    height="250"
                  />
                  <p>{Year}</p>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setLoadingSingle(true);
                      getMovieByID(`${imdbID}`);
                    }}
                  >
                    view info
                  </button>
                  {/* <p>{imdbID}</p> */}
                  {/* <div> */}
                  {/* <p className="poster-link">{Poster}</p> */}
                </div>
              );
            })}
        </div>
      </section>
      {/* This will be my horizontal rule across each view */}
      <span></span>
      {/* search queries view */}
      <section className="queryContainer">
        <h4>5 Latest Search Queries</h4>
        {searchQueries &&
          searchQueries
            .filter((item: any) => item !== "" || null)
            .reverse()
            .filter((item, index, self) => self.indexOf(item) === index)
            .slice(0, 5)
            .map((data: any) => {
              // console.log(data, "data");
              return (
                <div>
                  <p>{data}</p>
                </div>
              );
            })}
      </section>

      {
        openModal && (
          <MovieView
            data={singleData}
            loadingSingle={loadingSingle}
            closeview={() => {
              setOpenModal(false);
            }}
          />
        )
        // () => return (
        //   <div>
        //     <section>{singleData.Year}</section>
        //   </div>
        // )
      }
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
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 10px;
  }
  .movieData {
    border: 1px solid black;
    /* width: 30px; */
    width: 25vw;
    overflow-y: hidden;
    padding: 10px;
    .poster-link {
      /* width: 50px; */
    }
  }
  .movieContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
  }
  .movieContainer {
    /* padding-top: 5px; */
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0px auto;
    z-index: 1px;
  }
  .queryContainer {
    /* margin: 0px auto; */
    border: 1px solid black;
    max-width: 70vw;
    align-self: center;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 20px;
  }
`;
