// "use client";
// import GridComponent from "./GridComponent";
// import { useEffect, useState } from "react";

// const ParentComponent = () => {
//   const [latestNews, setLatestNews] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchLatestNews = async () => {
//     try {
//       const res = await fetch("/api/news/latest");

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       setLatestNews(data);
//     } catch (error) {
//       console.error("Failed to fetch latest news:", error);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchLatestNews();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div 
//        className="parent-container">
//       <div className="my-3 items-center bg-white text-lg">
//         <div className="p-2 text-center items-center font-serif text-5xl">Latest News</div>
//       </div>
//       {latestNews.length > 0 ? (
//         <GridComponent latestNews={latestNews} />
//       ) : (
//         <p>No news available</p>
//       )}
//     </div>
//   );
// };

// export default ParentComponent;

"use client";
import GridComponent from "./GridComponent";
import { useEffect, useState } from "react";

const ParentComponent = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchLatestNews = async () => {
    try {
      const res = await fetch("/api/news/latest");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setLatestNews(data);
    } catch (error) {
      console.error("Failed to fetch latest news:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="parent-container">
      
      <div className="items-center bg-white text-lg">
        <div className="text-center items-center font-serif text-5xl pb-2">Latest News</div>
      </div>
      {latestNews.length > 0 ? (
        <GridComponent latestNews={latestNews} />
      ) : (
        <p>No news available</p>
      )}
      <hr/>
    </div>
  );
};

export default ParentComponent;
