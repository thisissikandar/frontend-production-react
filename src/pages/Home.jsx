import { useEffect, useState } from "react";
import appwriteService from "../appwrite/appwritconfig";
import { Container, PostCart } from "../components";

function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, [post]);

  if (post.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="py-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login To read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((item) => (
            <div key={item.$id} className="py-2 w-1/4">
              <PostCart post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
