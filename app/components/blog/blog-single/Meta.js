const Meta = ({ post }) => {
  const metaItems = [
    {
      icon: "flaticon-user",
      text: post.author,
      href: "#",
    },
    {
      icon: "flaticon-chat",
      text: `${post.numComments} Comments`,
      href: "#",
    },
    {
      icon: "flaticon-calendar-1",
      text: post.date,
      href: "#",
    },
  ];

  return (
    <div className="bp_meta">
      <ul className="mb0">
        {metaItems.map((item, index) => (
          <li key={index} className="list-inline-item">
            <a href={item.href}>
              <span className={item.icon} />
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meta;
