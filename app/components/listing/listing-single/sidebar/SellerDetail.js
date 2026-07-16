import Image from "next/image";

const SellerDetail = () => {
  const phoneNumber = "819063609950"; 
  const message = "Hello, I am interested in your listing."; 

  return (
    <div className="d-flex align-items-center mb30">
      <div className="flex-shrink-0">
        <Image
          width={60}
          height={60}
          className="mr-3 author_img w60"
          src="/images/team/seller.png"
          alt="author.png"
        />
      </div>

      <div className="flex-grow-1 ms-3">
        <h5 className="mt0 mb5 fz16 heading-color fw600">
          Damith Harshana
        </h5>
        
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb0 tdu text-decoration-none"
          style={{ color: "inherit", cursor: "pointer" }}
        >
          <p className="mb0">
            <span className="flaticon-phone-call pr5 vam" />
            +81 90-6360-9950
          </p>
        </a>
      </div>
    </div>
  );
};

export default SellerDetail;

