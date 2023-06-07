import "./posts-page.css";
import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postsApiCall";

const size=3
const PostsPage = () => {
  const{postsCount,posts}=useSelector(state =>state.post);
  
  const dispatch=useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil((postsCount) / (size));
  

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);
  useEffect(() => {
    dispatch(getPostsCount());
   
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>
      <Pagination 
      pages={pages} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostsPage;
