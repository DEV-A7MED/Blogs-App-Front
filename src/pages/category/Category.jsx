import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
// import { posts } from "../../dummyData";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsCategory } from "../../redux/apiCalls/postsApiCall";

const Category = () => {
    const { category } = useParams();
    const{postsCat,posts}=useSelector(state =>state.post);
    const dispatch=useDispatch();
    useEffect(() => {
      dispatch(fetchPostsCategory(category))
      window.scrollTo(0,0);
    }, [category]);

    return ( 
    <section className="category">
        {
          postsCat.length===0?
          <>
          <h1 className="category-no-posts">Posts based on {category} not found</h1>
          <Link to='/posts' className="category-no-posts-link">
              Go To Posts Page
          </Link>

          </>
          :
          <>
          <h1 className="category-title">Posts based on {category}</h1>
        <PostList posts={postsCat} />
          </>
        }
    </section> );
}

export default Category;