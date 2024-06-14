import { useEffect, useState } from "react";
import appWriteService from "../appwrite/appwritconfig";
import { Container, Postform } from "../components";
import { useNavigate, useParams } from "react-router-dom";



const EditPost = () => {
  const [posts, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    }else{
        navigate("/")
    }

    return () => {

    };
  }, [slug, navigate]);

  return posts ? <div className="py-8">
    <Container>
        <Postform post={posts}/>
    </Container>
  </div> : null;
};

export default EditPost;
