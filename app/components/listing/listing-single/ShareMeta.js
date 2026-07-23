const ShareMeta = () => {
  const shareOptions = [
    {
      iconClassName: "flaticon-email",
      label: "Email",
    },
    {
      iconClassName: "flaticon-printer",
      label: "Print",
    },
    {
      iconClassName: "flaticon-heart",
      label: "Save",
    },
    {
      iconClassName: "flaticon-share",
      label: "Share",
    },
  ];

  return (
    <ul className="list-inline share_buttons">
      {shareOptions.map((option, index) => (
        <li className="list-inline-item" key={index}>
          <a className="share_button" href="#" aria-label={option.label} title={option.label}>
            <span className={option.iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ShareMeta;
