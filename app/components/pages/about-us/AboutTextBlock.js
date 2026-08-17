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
          <h2 className="title">Japan's Trusted Import & Export Leader</h2>
          <p className="mb30">
            <strong>RAIKO GROUP Co., Ltd. — Your Certified Global Import/Export Partner Since 2005</strong>
            <br/><br/>
Raiko Group Co., Ltd. is Japan's premier import and export business group, trusted by over 5,000 international clients across 150+ countries. For two decades, we've specialized in sourcing and exporting premium quality products including vehicles, machinery, auto parts, industrial equipment, and specialty goods with uncompromising standards.
          </p>

          <h4 style={{ marginTop: "25px", marginBottom: "15px", color: "#173B68" }}>Why Importers Trust RAIKO GROUP</h4>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>✓ <strong>ISO-Certified & Compliance-Ready:</strong> All shipments meet international quality standards</li>
            <li>✓ <strong>Proven Track Record:</strong> 20+ years of seamless export operations with zero compliance violations</li>
            <li>✓ <strong>Transparent Sourcing:</strong> Direct relationships with Japan's authorized dealers and manufacturers</li>
            <li>✓ <strong>Expert Customs Navigation:</strong> Specialized teams for 150+ countries ensure smooth clearance</li>
            <li>✓ <strong>Competitive Pricing:</strong> Direct sourcing eliminates middleman markups</li>
            <li>✓ <strong>Real-Time Tracking:</strong> 24/7 visibility from Japan to your destination</li>
            <li>✓ <strong>Secure Payments:</strong> Multiple payment options including letter of credit and escrow</li>
            <li>✓ <strong>Full Insurance Coverage:</strong> Marine and cargo insurance on every shipment</li>
          </ul>

          <h4 style={{ marginTop: "25px", marginBottom: "15px", color: "#173B68" }}>Our Commitment</h4>
          <p className="mb30">
            Every vehicle, part, and product is professionally inspected before shipment. We provide detailed documentation, service history reports, and accident records so you know exactly what you're importing. Our customs experts handle complex international regulations, ensuring your shipments clear efficiently while maintaining full compliance.
          </p>

          <h4 style={{ marginTop: "25px", marginBottom: "15px", color: "#173B68" }}>Location & Contact</h4>
          <p className="mb50">
            <strong>RAIKO GROUP Co., Ltd.</strong><br/>
            924-1 Tenma, Fuji, Shizuoka 419-0205, Japan<br/>
            <strong>Phone:</strong> +81 90-6360-9950<br/>
            <strong>Email:</strong> raikogroupjpn@gmail.com<br/>
            <strong>Headquarters:</strong> Fuji City (Gateway to Japan's Manufacturing Hub)
          </p>

          <a className="btn btn-thm about-btn" href="/contact">
            Start Your Import Journey
          </a>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default AboutTextBlock;
