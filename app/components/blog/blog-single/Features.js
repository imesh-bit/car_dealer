const Features = ({ features }) => {
  const firstHalf = features.slice(0, Math.ceil(features.length / 2));
  const secondHalf = features.slice(Math.ceil(features.length / 2));

  return (
    <>
      <div className="col-lg-6">
        <div className="ui_page_heading">
          <ul className="order_list list-style-check-circle">
            {firstHalf.map((feature, index) => (
              <li key={index}>
                <a href="#">{feature}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="ui_page_heading">
          <ul className="order_list list-style-check-circle">
            {secondHalf.map((feature, index) => (
              <li key={index}>
                <a href="#">{feature}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Features;
