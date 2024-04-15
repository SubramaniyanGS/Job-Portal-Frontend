import React from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import './Jobcard.css'

const Jobcard = ({ job }) => {
  // Destructure job object for cleaner code
  const { _id, title, jobLocation, jobType, createdAt } = job;
  const companyLogoUrl = job.companyLogoUrl.src;

  return (
    <Link to={`/jobdetails/${_id}`} className="job-card-link ">
      <div className="job-item p-4 mb-4">
        <div className="row g-4">
          <div className="col-sm-12 col-md-8 d-flex align-items-center">
            <img
              className="flex-shrink-0 img-fluid border rounded"
              src={companyLogoUrl}
              alt="Company Logo"
              style={{ width: '80px', height: '80px' }}
            />
            <div className="text-start ps-4">
              <h5 className="mb-3 greentext">{title}</h5>
              <span className="text-truncate text-dark me-3">
                <i className="fa fa-map-marker-alt greentext me-2"></i> {jobLocation}
              </span>
              <span className="text-truncate text-dark me-3">
                <i className="far fa-clock greentext me-2"></i>{jobType}
              </span>
              {/* Displaying a static salary range for demonstration */}
              <span className="text-truncate text-dark  me-0">
                <i className="far fa-money-bill-alt greentext me-2"></i>${job?.salary?.min} - ${job?.salary?.max}
              </span>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
            <div className="d-flex mb-3">
              {/* Using a button for favorite instead of a link */}
              <button className="btn btn-light btn-square me-3">
                <i className="far fa-heart greentext"></i>
              </button>
              {/* Apply Now button redirects to the job detail page */}
              <Link className="btn greenbtn" to={`/jobdetails/${_id}`}>
                Apply Now
              </Link>
            </div>
            <small className="text-truncate text-dark">
              <i className="far fa-calendar-alt greentext  me-2"></i>
              Date Line: {moment(createdAt).fromNow()}
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Jobcard;
