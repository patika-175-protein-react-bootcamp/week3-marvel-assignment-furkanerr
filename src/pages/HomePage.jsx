import React, { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import style from "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const HomePage = () => {
  const [heros, setheros] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [offset, setoffset] = useState(0);

  useEffect(() => {
    // scroll to top after every change of page
    window.scrollTo(0, 0)
    // fetch data from api
    const fetchData = async () => {
      await api.getAllCharacters(offset).then((res) => {
        setheros(res.data.data.results);
        localStorage.setItem(
          `Page${currentPage}`,
          JSON.stringify(res.data.data.results)
        );
      });
    };
    // fetch data from local storage and set heros if exist
    if (localStorage.getItem(`Page${currentPage}`) !== null) {
      setheros(JSON.parse(localStorage.getItem(`Page${currentPage}`)));
    } else {
      // fetch data from api if local storage is empty
      fetchData();
    }
  }, [currentPage]);

  const handleNextIcon = () => {// handle next icon click
    
    setcurrentPage(currentPage + 1);
    setoffset(offset + 20);
  };
  const handlePreviousIcon = () => {// handle previous icon click
    setcurrentPage(currentPage - 1);
    setoffset(offset - 20);
  };
  const handleNext = (Event) => {// handle next click
    Event.preventDefault();// prevent default behaviour
    let targetPage = Event.target.innerHTML;  // get target page number
    setcurrentPage(parseInt(targetPage));// set current page to target page
    setoffset((targetPage - 1) * 20);// calculate offset
  };

  const handlePrevious = (Event) => {
    Event.preventDefault();
    let targetPage = Event.target.innerHTML;
    setcurrentPage(parseInt(targetPage));
    setoffset((targetPage - 1) * 20);
    
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container">
        {heros.map((hero, index) => ( // map heros to card
          <Card key={index} hero={hero} />
        ))}
      </div>
      <div className="paginationContainer">
        <div className="pagination">
          {currentPage !== 1 && (
            <>
              <div className="prev" onClick={() => handlePreviousIcon()}>
                <FontAwesomeIcon className="icon" icon={faAngleLeft} />
              </div>
            </>
          )}

          {currentPage > 1 && (
            <>
              {currentPage > 4 && (
                <>
                  <div className="first" onClick={(e) => handlePrevious(e)}>
                    1
                  </div>
                  <span className="dots">. . .</span>
                </>
              )}

              {currentPage - 2 !== 0 && (
                <div
                
                  onClick={(e) => handlePrevious(e)}
                >
                  {currentPage - 2}
                </div>
              )}

              <div
               
                onClick={(e) => handlePrevious(e)}
              >
                {currentPage - 1}
              </div>
            </>
          )}

          <div className="currentPage">{currentPage}</div>
          {currentPage < 75 && (
            <>
              {" "}
              <div  onClick={(e) => handleNext(e)}>
                {currentPage + 1}
              </div>
              <div  onClick={(e) => handleNext(e)}>
                {currentPage + 2}
              </div>
             
              <span className="dots">. . .</span>
            </>
          )}
          {currentPage < 78 && (
            <div className="last" onClick={(e) => handleNext(e)}>
              78
            </div>
          )}

          {currentPage !== 78 && (
            <div className="next" onClick={() => handleNextIcon()}>
              <FontAwesomeIcon className="icon" icon={faAngleRight} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
