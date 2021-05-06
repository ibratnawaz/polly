import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import Toastr from "components/Common/Toastr";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";

const ShowPoll = () => {
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [choice, setChoice] = useState(-1);
  const [showResult, setShowResult] = useState(false);

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

  const clickHandler = id => setChoice(id);

  const handleSubmit = async () => {
    setOptions(state => {
      state.map(obj => {
        if (obj.id == choice) obj.vote = ++obj["vote"];
      });
      return state;
    });

    setShowResult(true);
    await pollsApi.update(id, {
      poll: { title, options_attributes: options },
    });
    Toastr.success("Thanks for voting!");
  };

  const totalVote = () => {
    let total = 0;
    options.map(option => (total += option.vote));
    return total;
  };

  const calcVote = vote => {
    const totalVotes = totalVote();

    if (totalVotes == 0) return 0;

    return (vote * 100) / totalVotes;
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="w-3/4 mx-auto py-6 mt-10">
        <h1 className="pb-4 px-6 text-xl font-bold border-b text-bb-purple">
          {title}
        </h1>
        <ul className={`mb-6 mt-3 px-6 ${showResult && "pointer-events-none"}`}>
          {options.map(option => (
            <li
              className="my-6 block w-full"
              key={option.id}
              onClick={() => clickHandler(option.id)}
            >
              <span
                className={`border rounded-full p-3 w-3/4 inline-block cursor-pointer hover:bg-blue-300 hover:text-white ${
                  choice == option.id && "bg-blue-300 text-white"
                }`}
              >
                {option.option}
              </span>
              {showResult && (
                <span className="w-1/4 pl-4">
                  {calcVote(option.vote).toFixed(2)}%
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-center px-6">
          <Button
            loading={false}
            onClick={handleSubmit}
            buttonText="Submit"
            showResult={showResult}
          />
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;
