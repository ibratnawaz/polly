import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Toastr from "components/Common/Toastr";
import PageLoader from "components/PageLoader";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";

const EditPoll = ({ history }) => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      setOptions(response.data.poll.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      await pollsApi.update(id, {
        poll: { title, options_attributes: options },
      });
      setLoading(false);
      Toastr.success("Poll updated successfully!");
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <PollForm
      title={title}
      options={options}
      loading={loading}
      setTitle={setTitle}
      setOptions={setOptions}
      handleSubmit={handleSubmit}
      buttonText={"Update Poll"}
    />
  );
};

export default EditPoll;
