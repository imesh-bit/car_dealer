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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

const BlogSingleDynamic = async ({ params }) => {
  const resolvedParams = await params;
  const post = blogPosts.find((item) => item.id.toString() === resolvedParams.id);

  if (!post) {
    return <div className="wrapper">Post not found.</div>;
  }

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

      <HeaderTop />
      <DefaultHeader />
      <MobileMenu />

      <section className="blog_post_container bt1 pt50 pb0 mt70-992">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto">
              <div className="for_blog blog_single_post">
                <div className="details">
                  <div className="wrapper">
                    <h2 className="title">{post.title}</h2>
                    <Meta post={post} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  src={post.heroImg || post.imgSrc}
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog_post_container pt50 pb70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  {post.description.map((paragraph, index) => (
                    <p key={index} className="para mb25 mt20">
                      {paragraph}
                    </p>
                  ))}

                  <div className="mbp_blockquote">
                    <Blockquote text={post.blockquote.text} author={post.blockquote.author} />
                  </div>

                  <div className="row mb40">
                    <div className="col-lg-12">
                      <h4 className="mb20">What you&apos;ll learn</h4>
                    </div>
                    <Features features={post.features} />
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <Image
                        width={796}
                        height={465}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        src={post.secondaryImg || post.imgSrc}
                        alt={post.title}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="custom_bsp_grid mt50">
                        <h4 className="mb30">What Makes It Special</h4>
                        <Requirements requirements={post.requirements} />
                      </div>
                    </div>
                  </div>

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
                </div>

                <hr className="mt50" />
                <Pagination />
                <hr />

                <div className="product_single_content mt50 mb50">
                  <div className="mbp_pagination_comments">
                    <h4 className="title mb10">Comment</h4>
                    <Comments />
                  </div>
                </div>

                <div className="bsp_reveiw_wrt">
                  <CommentForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-blog pb90 bgc-f9">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Recent Articles</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <Blog />
          </div>
        </div>
      </section>

      <Footer />

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
    </div>
  );
};

export default BlogSingleDynamic;
