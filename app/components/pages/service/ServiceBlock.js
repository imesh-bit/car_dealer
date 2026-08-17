import Image from "next/image";

const ServiceBlock = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-6 col-xl-5">
                    <div className="service_thumb mb30-sm">
                        <Image
                            width={526}
                            height={354}
                            priority
                            layout="responsive"
                            src="/images/service/2.jpg"
                            alt="2.jpg"
                        />
                    </div>
                </div>
                <div className="col-md-6 col-xl-5 offset-xl-1">
                    <div className="service_include2 mt0-md">
                        <h3 className="title">Professional Vehicle Sourcing</h3>
                        <p className="para">
                            Access Japan's finest dealerships and auction houses with RAIKO GROUP. We maintain direct relationships with authorized dealers, ensuring authentic, well-maintained vehicles at competitive prices. Each vehicle's complete history is verified before selection.
                        </p>
                        <p>
                            Our sourcing experts help select vehicles that meet your specific requirements—mileage, condition, year, and price point. Whether you need one vehicle or a bulk shipment, we have the inventory and expertise to deliver.
                        </p>
                    </div>
                </div>
            </div>
            {/* End .row */}

            <div className="row mt120 mt50-sm">
                <div className="col-md-6 col-xl-5">
                    <div className="service_include2 mt0-md mb30-sm">
                        <h3 className="title">Expert Customs Clearance</h3>
                        <p className="para">
                            Navigating international customs regulations can be complex. Our certified customs experts handle all documentation, tariff calculations, and compliance requirements for over 150 countries. We expedite clearance while maintaining full legal compliance.
                        </p>
                        <p>
                            From emission standards to safety certifications, we ensure your shipment meets destination country requirements. Our networks with customs brokers worldwide ensure smooth, efficient clearance at your port of entry.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 col-xl-5 offset-xl-1">
                    <div className="service_thumb">
                        <Image
                            width={526}
                            height={354}
                            priority
                            layout="responsive"
                            src="/images/service/3.jpg"
                            alt="3.jpg"
                        />
                    </div>
                </div>
            </div>
            {/* End .row */}

            <div className="row mt120 mt50-sm">
                <div className="col-md-6 col-xl-5">
                    <div className="service_thumb mb30-sm">
                        <Image
                            width={526}
                            height={354}
                            priority
                            layout="responsive"
                            src="/images/service/3.jpg"
                            alt="3.jpg"
                        />
                    </div>
                </div>
                <div className="col-md-6 col-xl-5 offset-xl-1">
                    <div className="service_include2 mt0-md">
                        <h3 className="title">Comprehensive Quality Inspections</h3>
                        <p className="para">
                            Every vehicle undergoes rigorous inspection at over 200 checkpoints before export. Our certified inspectors verify mechanical condition, authenticity, accident history, and overall quality. You receive detailed inspection reports with service history documentation.
                        </p>
                        <p>
                            Know exactly what you're importing. Our transparent inspection process eliminates surprises and builds confidence in every purchase. We only export vehicles that meet our stringent quality standards.
                        </p>
                    </div>
                </div>
            </div>
            {/* End .row */}

            <div className="row mt120 mt50-sm">
                <div className="col-md-6 col-xl-5">
                    <div className="service_include2 mt0-md mb30-sm">
                        <h3 className="title">Secure International Shipping</h3>
                        <p className="para">
                            From Japan's ports to your destination worldwide, RAIKO GROUP arranges secure, insured shipping on dedicated automotive transport routes. Our network includes certified marine shippers with flawless safety records and real-time tracking systems.
                        </p>
                        <p>
                            Transit times vary by destination (typically 2-6 weeks), with full insurance coverage on every shipment. We handle all logistics coordination—you track your vehicle from port of origin to final delivery.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 col-xl-5 offset-xl-1">
                    <div className="service_thumb">
                        <Image
                            width={526}
                            height={354}
                            priority
                            layout="responsive"
                            src="/images/service/5.jpg"
                            alt="5.jpg"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceBlock;
