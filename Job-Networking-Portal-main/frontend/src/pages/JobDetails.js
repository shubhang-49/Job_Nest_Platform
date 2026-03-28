import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  
  // Redirect to the correct JobDetail page
  return <Navigate to={`/jobs/${id}`} replace />;
};

export default JobDetails;
