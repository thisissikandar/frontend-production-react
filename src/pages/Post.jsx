import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appWriteService from '../appwrite/appwritconfig'
import { parse } from 'postcss'
import { Buttons, Container } from '../components'

function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const isAuthor = post &&  userData ? post.userId === userData.$id : false;
    useEffect(() => {
     if (slug) {
        appWriteService.getPost(slug)
        .then((postt)=>{
            if(postt) setPost(postt)
                else navigate("/")
        })
     }
    }, [slug, navigate])

    const deletePost = () => {
        appWriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appWriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appWriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Buttons bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Buttons>
                            </Link>
                            <Buttons bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Buttons>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post