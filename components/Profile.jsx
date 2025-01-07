import { useSession } from "next-auth/react";
import NewsCardList from "./NewsCardList";
import CategoryNewsList from "./CategoryNewsList";

const Profile = ({ name, desc, newsData = [], handleEdit, handleDelete }) => {
  const { data: session } = useSession();

  const categories = [
    "General",
    "Business",
    "Entertainment",
    "Sports",
    "Science",
    "Technology",
    "Education",
    "History",
  ];

  const getNewsByCategory = (category) => {
    if(session?.user?.email === "jacobtecqworld@gmail.com"){
      return newsData?.filter((news) => news.category === category) || [];
    } else {
      return newsData;
    }
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-center">
        {session?.user?.email !== "jacobtecqworld@gmail.com" ? (
          <div>
            <span className="blue_gradient">{name} Bookmarks</span>
          </div>
        ) : (
          <div>
            <span className="blue_gradient">{name} Portal</span>
          </div>
        )}
      </h1>
      <p className="text-center">{desc}</p>

      {session?.user?.email === "jacobtecqworld@gmail.com" ? (
        <div className="mt-10">
          {categories.map((category) => (
            <NewsCardList
              key={category}
              newsData={getNewsByCategory(category)}
              category={category}
              handleEdit={handleEdit ? handleEdit : null}
              handleDelete={handleDelete ? handleDelete : null}
            />
          ))}
        </div>
      ) : (
        <div className="items-center ml-12">
          <CategoryNewsList newsData={newsData} />
        </div>
      )}
    </section>
  );
};

export default Profile;
