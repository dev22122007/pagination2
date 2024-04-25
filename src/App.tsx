import { useEffect, useState } from "react";
import { CarTypes } from "./types";
import Car from "./components/cars";

function App() {
const [cars, setCars] = useState<CarTypes[]>([]);
const [fetching, setFetching] = useState<boolean>(true);
const [currentPage, setCurrentPage] = useState<number>(1);

async function getData(limit: number, currentPage: number) {
    try {
      const data = await fetch(
        `http://localhost:3000/machines?limit=${limit}&page=${currentPage}`
      );
      const response = await data.json();
      setCars([...cars, ...response.results]);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (fetching) {
        getData(6, currentPage);
    }
  }, [fetching, currentPage])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function() {
        document.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  function scrollHandler() {
    const target = document.documentElement;
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
        setFetching(true);
        setCurrentPage(currentPage => currentPage + 1)
    }
    
}


  return (
   <>
         <h1 className="text-center mt-3 text-lg">Cars</h1>
            <div className="container mt-3 d-flex justify-content-between flex-wrap">
                {cars && cars.map((el, index) => <Car data={el} key={index} />)}
            </div>
   </>
  );
}

export default App;