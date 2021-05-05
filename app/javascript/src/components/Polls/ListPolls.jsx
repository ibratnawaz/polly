import React from "react";

const ListPolls = ({ polls, history, isLoggedIn }) => {
  const routeHandler = id => {
    if (isLoggedIn) history.push(`/polls/${id}/show`);
    else history.push("/login");
  };

  return (
    <ul className="mt-2">
      {polls.map(poll => (
        <li
          key={poll.id}
          className="hover:text-purple-700 text-lg font-medium cursor-pointer py-1"
          onClick={() => routeHandler(poll.id)}
        >
          {poll.title}
        </li>
      ))}
    </ul>
  );
};

export default ListPolls;
