import { Link } from "react-router-dom";
import appWriteService from "../appwrite/appwritconfig";

// eslint-disable-next-line react/prop-types
function PostCart({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appWriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCart;
