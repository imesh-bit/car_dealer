import Footer from "@/app/components/common/Footer";
import DefaultHeader from "@/app/components/common/DefaultHeader";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import HeaderTop from "@/app/components/common/HeaderTop";
import MobileMenu from "@/app/components/common/MobileMenu";
import LoginSignupModal from "@/app/components/common/login-signup";
import Image from "next/image";
import Blog from "@/app/components/common/Blog";
import Meta from "@/app/components/blog/blog-single/Meta";
import Blockquote from "@/app/components/blog/blog-single/Blockquote";
import Features from "@/app/components/blog/blog-single/Features";
import Requirements from "@/app/components/blog/blog-single/Requirements";
import Share from "@/app/components/blog/blog-single/Share";
import Tag from "@/app/components/blog/blog-single/Tag";
import Pagination from "@/app/components/blog/blog-single/Pagination";
import Comments from "@/app/components/blog/blog-single/Comments";
import CommentForm from "@/app/components/blog/blog-single/CommentForm";
import blogPosts from "@/data/blog";

const defaultPost = blogPosts[0];

export const metadata = {
  title: "Young Jackfruit in Brine || Premium Sri Lankan Import | RAIKO GROUP",
};

const BlogDynamicSingle = () => {
  return (
    <div className="wrapper">
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <HeaderSidebar />
      </div>
      {/* Sidebar Panel End */}

      {/* header top */}
      <HeaderTop />
      {/* End header top */}

      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Main Header Nav For Mobile */}
      <MobileMenu />
      {/* End Main Header Nav For Mobile */}

      {/* Blog Single Post */}
      <section className="blog_post_container bt1 pt50 pb0 mt70-992">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto">
              <div className="for_blog blog_single_post">
                <div className="details">
                  <div className="wrapper">
                    <h2 className="title">
                      Young Jackfruit in Brine: Premium Sri Lankan Import for Global Kitchens
                    </h2>
                    <Meta post={defaultPost} />
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}

        <div className="container-fluid p0">
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-single-post-thumb">
                <Image
                  width={1519}
                  height={475}
                  priority
                  style={{ objectFit: "cover" }}
                  className="img-whp"
                  src="/images/listing/Genral-items-inner-listing/jackfruit1.jpg"
                  alt="Young Jackfruit in Brine"
                />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End container-fluid */}
      </section>
      {/* Blog Single Post */}

      {/* Start Blog Single Post Description */}
      <section className="blog_post_container pt50 pb70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  <h4>Description</h4>
                  <p className="para mb25 mt20">
                    Discover our Young Jackfruit in Brine, imported directly from Sri Lanka’s fertile coastal estates. Every can preserves tender jackfruit in a natural brine solution, delivering a fresh, clean texture that performs beautifully in global recipes.
                  </p>
                  <p className="para mb20">
                    Harvested at the perfect stage, this young jackfruit is packed with care to maintain its mild flavor and versatile meat-like bite. It is a plant-powered ingredient designed for chefs, home cooks, and retailers seeking premium, ready-to-use produce.
                  </p>
                  <p className="para mb40">
                    Packed in Sri Lanka and shipped worldwide, our jackfruit is ideal for curries, sandwiches, tacos, stews, and healthy vegan dishes. It offers the authenticity of Ceylon heritage with the convenience of modern global distribution.
                  </p>
                  <div className="mbp_blockquote">
                    <Blockquote text={defaultPost.blockquote.text} author={defaultPost.blockquote.author} />
                  </div>
                  {/* End .mbp_blockquote */}

                  <div className="row mb40">
                    <div className="col-lg-12">
                      <h4 className="mb20">What you&apos;ll learn</h4>
                    </div>
                    <Features features={defaultPost.features} />
                  </div>
                  {/* End .row */}

                  <div className="row">
                    <div className="col-lg-12">
                      <Image
                        width={796}
                        height={465}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        src="/images/listing/Genral-items-inner-listing/jackfruit2.jpg"
                        alt="Jar of Young Jackfruit in Brine"
                      />
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="custom_bsp_grid mt50">
                        <h4 className="mb30">What Makes It Special</h4>
                        <Requirements requirements={defaultPost.requirements} />
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <hr className="mb40" />
                  <div className="row">
                    <div className="col-lg-9">
                      <Share />
                    </div>
                    <div className="col-lg-3 p0">
                      <div className="bsp_tags text-center text-md-start mt10 mt20-md mb30-767">
                        <Tag />
                      </div>
                    </div>
                  </div>
                  {/* End .row */}
                </div>
                {/* End mbp_thumb_post */}

                <hr className="mt50" />
                <Pagination />
                <hr />

                <div className="product_single_content mt50 mb50">
                  <div className="mbp_pagination_comments">
                    <h4 className="title mb10">Comment</h4>
                    <Comments />
                  </div>
                </div>
                {/* End comments */}

                <div className="bsp_reveiw_wrt">
                  <CommentForm />
                </div>
                {/* End CommentForm */}
              </div>
              {/* End main_blog_post_content */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Blog Single Post Description */}

      {/* Our Blog Recent Articles */}
      <section className="our-blog pb90 bgc-f9">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Recent Articles</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Blog />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* Our Blog Recent Articles */}

      {/* Our Footer */}
      <Footer />
      {/* End Our Footer */}

      {/* Modal */}
      <div
        className="sign_up_modal modal fade"
        id="logInModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
      >
        <LoginSignupModal />
      </div>
      {/* End Modal */}
    </div>
    // End wrapper
  );
};

export default BlogDynamicSingle;
