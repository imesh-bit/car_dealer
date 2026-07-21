const Requirements = ({ requirements }) => {
  return (
    <ul className="list-style-type-bullet">
      {requirements.map((requirement, index) => (
        <li key={index}>
          <a href="#">{requirement}</a>
        </li>
      ))}
    </ul>
  );
};

export default Requirements;
