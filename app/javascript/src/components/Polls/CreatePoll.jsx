import React, { useState } from "react";

import Input from "components/Input";
import Button from "components/Button";
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
    e.preventDefault();
    setLoading(true);
    await pollsApi.create({ poll: { title, options_attributes: options } });
    setLoading(false);
  };

  const handleChange = (e, idx) => {
    e.preventDefault();
    setOptions(preState => {
      const curState = [...preState];
      curState[idx].option = e.target.value;
      return curState;
    });
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="w-3/4">
        <Input
          label="First option"
          placeholder="First option"
          value={options[0].content}
          onChange={e => handleChange(e, 0)}
        />
        <Input
          label="Second option"
          placeholder="Second option"
          value={options[1].content}
          onChange={e => handleChange(e, 1)}
        />
        <Input
          label="Third option"
          placeholder="Third option"
          value={options[2].content}
          onChange={e => handleChange(e, 2)}
        />
        <Input
          label="Fourth option"
          placeholder="Fourth option"
          value={options[3].content}
          onChange={e => handleChange(e, 3)}
        />
      </div>
      <div className="mt-6">
        <Button type="submit" buttonText={"Create poll"} loading={loading} />
      </div>
    </form>
  );
};

export default CreatePoll;
