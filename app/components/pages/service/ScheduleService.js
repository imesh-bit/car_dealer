const ScheduleService = () => {
  return (
    <form className="contact_form">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              required
              placeholder="Your Name"
              type="text"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input
              className="form-control email"
              required
              placeholder="your@email.com"
              type="email"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control"
              required
              placeholder="+1 (555) 000-0000"
              type="tel"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Destination Country</label>
            <input
              className="form-control"
              required
              placeholder="e.g., USA, UK, UAE"
              type="text"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Vehicle Type Needed</label>
            <input
              className="form-control"
              required
              placeholder="e.g., Used vehicles, Auto parts, Machinery"
              type="text"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Quantity</label>
            <input
              className="form-control"
              required
              placeholder="Number of units needed"
              type="number"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb-4">
            <label className="form-label">Additional Details</label>
            <textarea
              className="form-control"
              placeholder="Describe your import requirements, budget, timeline, etc."
              rows="4"
            ></textarea>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb-0">
            <button type="submit" className="btn btn-thm">
              Get Import Quote
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ScheduleService;
