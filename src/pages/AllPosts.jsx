import { useState } from "react";
import appWriteService from "../appwrite/appwritconfig";
import { useEffect } from "react";
import { Container, PostCart } from "../components";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appWriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className=" w-full  py-8">
      <div className="flex flex-wrap">
        <Container>
          {posts.map((post) => (
            <div className="py-2 w-1/3 " key={post.$id}>
              <PostCart post={post} />
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default AllPosts;
