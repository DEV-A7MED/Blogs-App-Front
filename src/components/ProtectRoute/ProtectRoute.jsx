import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function ProtectedRoute() {

    const{user}=useSelector(state=>state.auth);
    if(!user){
        return <Navigate to='/login'/>;
    }
    else{
        return <Navigate to='/'/>;
    } 




}