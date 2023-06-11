import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./home.css";
// import { posts } from "../../dummyData";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { fetchPosts } from "../../redux/apiCalls/postsApiCall";
import  { ThreeDots } from 'react-loader-spinner'

const Home = () => {
  const dispatch = useDispatch()
  const {posts}=useSelector( state => state.post)
  const { loading } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(fetchPosts(1))

    window.scrollTo(0,0);
  }, []);
  return (
    <>
    {
      loading? <>
      <div className="loading-screen-container">
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName="loading-screen"
        visible={true}
      />
      </div>
      </>
      :
      <>
      <section className="home">
      <div className="home-hearo-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to Blog</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest Posts</div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts-link">
        <Link className="home-link" to="/posts">
          See All Posts
        </Link>
      </div>
      </section>
      </>
    }
     </>
    
  );
};

export default Home;
