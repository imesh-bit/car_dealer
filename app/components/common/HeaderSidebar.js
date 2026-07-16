const HeaderSidebar = () => {
    return (
        <div className="offcanvas-body">
            <div className="siderbar_left_home pt20 active">
                <button
                    className="sidebar_switch sidebar_close_btn float-end"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    X
                </button>
                {/* End .cose button */}

                <div className="footer_contact_widget mt100">
                    <h3 className="title">Quick contact info</h3>
                    <p>
                        RAICO GROUP is a leading automotive and car dealer company, providing top-notch services and a wide range of vehicles to meet your needs. Contact us for more information or to schedule a visit.   
                    </p>
                </div>
                {/* End widget */}

                <div className="footer_contact_widget">
                    <h5 className="title">CONTACT</h5>
                    <div className="footer_phone">+81 90-6360-9950</div>
                    <p>info@raicogroup.com</p>
                </div>
                {/* End widget */}

                <div className="footer_about_widget">
                    <h5 className="title">OFFICE</h5>
                    <p>
                        Japan<br />
                        924-1 Tenma,Fuji,Shizuoka 419-0205
                    </p>
                </div>
                {/* End widget */}

                <div className="footer_contact_widget">
                    <h5 className="title">OPENING HOURS</h5>
                    <p>
                        Monday – Friday: 09:00AM – 09:00PM
                        <br />
                        Saturday: 09:00AM – 07:00PM
                        <br />
                        Sunday: Closed
                    </p>
                </div>
                {/* End widget */}
            </div>
        </div>
    );
};

export default HeaderSidebar;
