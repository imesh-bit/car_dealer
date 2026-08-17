import Image from "next/image";

const ListWithImage = () => {
    const serviceItems = [
        { text: "Vehicle Sourcing & Selection", link: "#" },
        { text: "Quality Inspections (200+ checkpoints)", link: "#" },
        { text: "Customs Documentation & Clearance", link: "#" },
        { text: "International Shipping & Logistics", link: "#" },
        { text: "Marine Insurance Coverage", link: "#" },
        { text: "Certificate of Origin Preparation", link: "#" },
        { text: "Import Compliance Support", link: "#" },
        { text: "Real-Time Shipment Tracking", link: "#" },
        { text: "Port-to-Destination Delivery", link: "#" },
        { text: "Post-Delivery Registration Support", link: "#" },
    ];

    return (
        <div className="row">
            <div className="col-lg-6 col-xl-5">
                <div className="service_include">
                    <h3 className="title">Our Import/Export Services</h3>
                    <p className="para">
                        RAIKO GROUP provides end-to-end import/export solutions with rigorous quality inspections on every vehicle, expert customs navigation for 150+ countries, and secure worldwide shipping with full insurance coverage.
                    </p>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="si_list">
                                <ul className="mb0 order_list list-style-check-circle check_theme_color">
                                    {serviceItems
                                        .slice(0, 5)
                                        .map((item, index) => (
                                            <li key={index}>
                                                <a href={item.link}>
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        {/* End .col */}

                        <div className="col-lg-5">
                            <div className="si_list">
                                <ul className="mb0 order_list list-style-check-circle check_theme_color">
                                    {serviceItems
                                        .slice(5, 10)
                                        .map((item, index) => (
                                            <li key={index}>
                                                <a href={item.link}>
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        {/* End .col */}
                    </div>
                    {/* End .row */}
                </div>
                {/* End service_include */}
            </div>
            {/* End col-6 */}

            <div className="col-lg-6 col-xl-6 offset-xl-1">
                <div className="service_thumb">
                    <Image
                        width={636}
                        height={667}
                        layout="responsive"
                        src="/images/service/1.jpg"
                        alt="1.jpg"
                    />
                </div>
            </div>
            {/* End col-6 */}
        </div>
    );
};

export default ListWithImage;
