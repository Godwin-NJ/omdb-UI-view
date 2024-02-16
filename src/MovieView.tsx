import { useEffect } from "react";
import styled from "styled-components";

const MovieView = (props: {
  data: any;
  closeview: () => void;
  loadingSingle: boolean;
}) => {
  const { data, closeview, loadingSingle } = props;
  //   const {} = data;
  //   console.log(data, "data-movie-view");
  //   console.log(loadingSingle, "loadingSingle");

  useEffect(() => {
    if (loadingSingle) {
      return () => {
        <div>
          <p>fetching....</p>
        </div>;
      };
    }
  }, [loadingSingle]);
  return (
    <Wrapper>
      <div className="singleBackgroud">
        <section className="singleMovieContainer">
          <button onClick={closeview} style={{ color: "red" }}>
            close
          </button>
          <img
            src={`${data?.Poster}`}
            alt={`${data?.Title}`}
            width="300"
            height="300"
          />
          <p>Title - {data?.Title}</p>
          <p>Year - {data?.Year}</p>
          <p>Released - {data?.Released}</p>
          <p>Director - {data?.Director}</p>
          <p>Actors - {data?.Actors}</p>
          <p>Metascore - {data?.Metascore}</p>
        </section>
      </div>
    </Wrapper>
  );
};

export default MovieView;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  /* .singleBackgroud {
    width: 100%;
    height: 100%;
    border: 10px solid white;
    background-color: rgba(0, 0, 0, 0.4);
    background: blue;
    display: flex;
    justify-self: center;
    align-self: center;
    justify-content: center;
    align-content: center;
 
  } */

  /* position: fixed; */
  /* width: ; */
  /* top: 0px; */

  /* background: rgba(255, 255, 255, 0.5); */

  .singleMovieContainer {
    box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.2);
    background: rgb(255, 255, 255);
    /* margin-top: ; */
    /* width: 100%; */
    min-width: 20vw;
    min-height: 20vw;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    gap: 10px;
    z-index: 10;
    padding: 10px;
    /* justify-content: center; */
    /* align-self: center; */
    /* margin: 0px auto; */
    /* align-item: center; */
    position: relative;
    /* transform: translate(-50%, -50%); */
    /* top: 40%; */
    /* left: 50%; */
  }
`;
