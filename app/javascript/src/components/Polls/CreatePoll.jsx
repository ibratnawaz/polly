import React, { useState } from "react";

import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { option: "" },
    { option: "" },
    { option: "" },
    { option: "" },
  ]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      await pollsApi.create({ poll: { title, options_attributes: options } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <PollForm
      title={title}
      options={options}
      loading={loading}
      setTitle={setTitle}
      setOptions={setOptions}
      handleSubmit={handleSubmit}
      buttonText={"Create Poll"}
    />
  );
};

export default CreatePoll;
