import Image from "next/image";

const AboutTextBlock = () => {
  return (
    <>
      <div className="col-lg-6">
        <div className="about_thumb mb30-md">
          <Image
            width={636}
            height={667}
            priority
            style={{ objectFit: "cover" }}
            className="thumb1"
            src="/images/about/1.jpg"
            alt="1.jpg"
          />
          <Image
            width={365}
            height={238}
            priority
            style={{ objectFit: "cover" }}
            className="img-fluid thumb2"
            src="/images/about/2.jpg"
            alt="2.jpg"
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-5 offset-lg-1">
        <div className="about_content">
          <h2 className="title">Welcome To The RAIKO GROUP 株式会社</h2>
          <p className="mb30">
            Welcome to Raiko Group Co., Ltd. – your trusted partner for sourcing and exporting quality products from Japan to customers worldwide.

We specialize in exporting a wide range of products including vehicles, machinery, machinery parts, vehicle spare parts, industrial equipment, and many other Japanese products based on your requirements.

Our mission is to provide high-quality Japanese products at reasonable prices while ensuring fast, reliable, and efficient service. With strong sourcing networks in Japan and a commitment to customer satisfaction, we make international purchasing simple and hassle-free.

Whether you are looking for construction machinery, commercial vehicles, automotive parts, or specialized equipment, Raiko Group Co., Ltd. is ready to deliver the right products to your doorstep anywhere in the world.

Why Choose Us?
* Export from Japan to worldwide destinations
* Competitive and reasonable pricing
* Fast and reliable service
* Genuine Japanese products
* Professional customer support
* Secure and efficient shipping solutions

Exporting quality from Japan to the world.
          </p>
          <p className="mb50">
           Address: 924-1 Tenma, Fuji, Shizuoka 419-0205, Japan
           Phone: +81 90-6360-9950
          </p>
          <a className="btn btn-thm about-btn" href="#">
           COntact Us
          </a>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default AboutTextBlock;
