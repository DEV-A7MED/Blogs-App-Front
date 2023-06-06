import { RouterProvider, createBrowserRouter, Navigate, createHashRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/forms/Register";
import Login from "./pages/forms/Login";
import PostDetails from "./pages/post-details/PostDetails";
import PostsPage from "./pages/posts-page/PostsPage";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import Profile from "./pages/profile/Profile";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
// import { ToastContainer } from "react-toastify";
import Layout from "./components/layout/Layout";
import Category from "./pages/category/Category";
import CommentsTable from "./pages/admin/CommentsTable";
import NotFound from "./pages/not-found/NotFound";

import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(state => state.auth);
  
  let routers = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: '/register', element: !user ? <Register /> : <Navigate to='/' /> },
        { path: '/login', element: !user ? <Login /> : <Navigate to='/' /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/reset-password', element: <ResetPassword /> },
        { path: '/profile/:id', element: user ? <Profile /> : <Navigate to='/' /> },
        { path: '/posts', element: <PostsPage /> },
        { path: '/posts/create', element: user ? <CreatePost /> : <Navigate to='/' /> },
        { path: '/posts/details/:id', element: <PostDetails /> },
        { path: '/posts/categories/:category', element: <Category /> },
        { path: '/admin-dashboard', element: user?.role === "Admin" ? <AdminDashboard /> : <Navigate to='/' /> },
        { path: '/admin-dashboard/users-table', element: user?.role === "Admin" ? <UsersTable /> : <Navigate to='/' /> },
        { path: '/admin-dashboard/posts-table', element:user?.role === "Admin" ? <PostsTable /> : <Navigate to='/' /> },
        { path: '/admin-dashboard/categories-table', element: user?.role === "Admin" ? <CategoriesTable /> : <Navigate to='/' /> },
        { path: '/admin-dashboard/comments-table', element: user?.role === "Admin" ? <CommentsTable /> : <Navigate to='/' /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])
  return (

    <RouterProvider router={routers}></RouterProvider>
  );
}

export default App;
