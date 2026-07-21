const Blockquote = ({ text, author }) => {
  return (
    <blockquote className="blockquote">
      <h4 className="title">
        <em>{text}</em>
      </h4>
      <figcaption className="blockquote-footer">{author}</figcaption>
    </blockquote>
  );
};

export default Blockquote;
