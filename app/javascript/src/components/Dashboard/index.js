import React, { useEffect, useState } from "react";
import { isNil, isEmpty, either } from "ramda";
import { Link } from "react-router-dom";

import PageLoader from "components/PageLoader";
import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import pollsApi from "apis/polls";
import { getFromLocalStorage } from "helpers/storage";

const Dashboard = ({ history }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="my-5 text-xl leading-5 text-center">
            No polls have been created, be the first one to create the poll.🥳
          </h1>
          <Link
            to={"/polls/new"}
            className="inline-block relative px-5 py-2 text-white text-sm font-medium bg-blue-500 border hover:shadow-md hover:bg-blue-700 leading-5 w-max rounded"
          >
            <i className="ri-add-line text-2xl pr-1 align-middle"></i>
            Create New Poll
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-indigo-500 text-4xl font-medium">Polls</h1>
        {isLoggedIn && (
          <Link
            to={"/polls/new"}
            className="inline-block relative px-5 py-2 text-white text-sm font-medium bg-blue-500 border hover:shadow-md hover:bg-blue-700 leading-5 w-max rounded"
          >
            <i className="ri-add-line text-2xl pr-1 align-middle"></i>
            Create New Poll
          </Link>
        )}
      </div>
      <ListPolls polls={polls} history={history} isLoggedIn={isLoggedIn} />
    </Container>
  );
};

export default Dashboard;
