"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email === "jacobtecqworld@gmail.com") {
     
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsData(data);
      } else {

        const response = await fetch(`/api/users/${session?.user.id}/bookmarks`);
        const data = await response.json();
        setNewsData(data);
      }
    };

    if (session?.user?.id) fetchData();
  }, [session?.user?.id]);

  const handleEdit = (news) => {
    router.push(`/update-news?id=${news}`);
  };

  const handleDelete = async (news) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this news item?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/news/${news}`, {
          method: "DELETE",
        });

        const filteredNews = newsData.filter((item) => item._id !== news._id);

        setNewsData(filteredNews);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={session?.user?.email === "jacobtecqworld@gmail.com" ?  "Admin" : "My"}
      desc={session?.user?.email === "jacobtecqworld@gmail.com" ? "Welcome to the Admin Portal. Add, Edit, or Delete news based on your choice!" :  "Explore all your bookmarked news here."}
      newsData={newsData}
      handleEdit={session?.user?.email === "jacobtecqworld@gmail.com" ? handleEdit : null}
      handleDelete={session?.user?.email === "jacobtecqworld@gmail.com" ? handleDelete : null}
    />
  );
};

export default MyProfile;
