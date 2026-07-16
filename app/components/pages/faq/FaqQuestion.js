const FaqQuestion = () => {
  const faqItems = [
    {
      question: "What kind of products does Raiko Group Co., Ltd. export?",
      answer:
        "We specialize in exporting a wide range of products, including vehicles, machinery, machinery parts, vehicle spare parts, industrial equipment, and many other high-quality Japanese products tailored to your requirements.",
    },
    {
      question: "Do you offer shipping to my country?",
      answer:
        "Yes, Raiko Group Co., Ltd. exports from Japan to customers worldwide. We provide secure and efficient shipping solutions to ensure your products reach their destination reliably.",
    },
    {
      question: "Why should I choose Raiko Group for my sourcing needs?",
      answer:
        "We combine strong sourcing networks in Japan with a commitment to high-quality products at reasonable prices. Our professional support team ensures a fast, reliable, and hassle-free international purchasing experience.",
    },
    {
      question: "Are the products genuine?",
      answer:
        "Absolutely. We are committed to providing genuine Japanese products, maintaining strict quality standards to ensure our customers receive the best value and performance from their purchases.",
    },
    {
      question: "How can I get started with an order?",
      answer:
        "Getting started is simple. Contact our professional customer support team with your specific requirements for vehicles, parts, or industrial equipment, and we will guide you through the process of sourcing and shipping your order.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample">
      {faqItems.map((item, index) => (
        <div className="card" key={index}>
          <div className="card-header" id={`heading${index}`}>
            <h4 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                {item.question}
              </button>
            </h4>
          </div>
          <div
            id={`collapse${index}`}
            className={`collapse ${index === 0 ? "show" : ""}`}
            aria-labelledby={`heading${index}`}
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <p className="mb30">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqQuestion;