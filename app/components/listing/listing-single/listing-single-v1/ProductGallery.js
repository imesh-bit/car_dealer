// // "use client";
// // import React, { useRef, useState } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/swiper-bundle.css";
// // import ModalVideo from "react-modal-video";
// // import "react-modal-video/scss/modal-video.scss";

// // // import required modules
// // import { FreeMode, Navigation, Thumbs } from "swiper";
// // import Image from "next/image";

// // const slides = [
// //   {
// //     imageSrc: "/images/listing/lsp1-v1.jpg",
// //     videoId: "VWrJkx6O0L8",
// //   },
// //   {
// //     imageSrc: "/images/listing/lsp1-v2.jpg",
// //     videoId: "TLEyLGWvjII",
// //   },
// //   {
// //     imageSrc: "/images/listing/lsp1-v3.jpg",
// //     videoId: "BS2jGGYC60c",
// //   },
// //   {
// //     imageSrc: "/images/listing/lsp1-v4.jpg",
// //     videoId: "8PiZNUCexrA",
// //   },
// //   {
// //     imageSrc: "/images/listing/lsp1-v5.jpg",
// //     videoId: "m4ZGuAbUMg8",
// //   },
// // ];

// // export default function ProductGallery() {
// //   const [thumbsSwiper, setThumbsSwiper] = useState(null);
// //   const [isOpen, setOpen] = useState(false);
// //   const [videoId, setVideoId] = useState("");

// //   const openModal = (id) => {
// //     setVideoId(id);
// //     setOpen(true);
// //   };

// //   return (
// //     <>
// //       <div className="row">
// //         <div className="col-lg-12">
// //           <Swiper
// //             style={{
// //               "--swiper-navigation-color": "#fff",
// //               "--swiper-pagination-color": "#fff",
// //             }}
// //             spaceBetween={10}
// //             navigation={true}
// //             thumbs={{
// //               swiper:
// //                 thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
// //             }}
// //             modules={[FreeMode, Navigation, Thumbs]}
// //             className="mySwiper2 sps_content single_product_grid user_profile "
// //           >
// //             {slides.map((slide, index) => (
// //               <SwiperSlide key={index}>
// //                 <div className="item">
// //                   <Image
// //                     width={856}
// //                     height={554}
// //                     priority
// //                     style={{ objectFit: "cover" }}
// //                     className="w-100 h-100"
// //                     src={slide.imageSrc}
// //                     alt="large car"
// //                   />

// //                   <div className="overlay_icon">
// //                     <button
// //                       className="video_popup_btn popup-img popup-youtube"
// //                       onClick={() => openModal(slide.videoId)}
// //                     >
// //                       <span className="flaticon-play-button" />
// //                       Video
// //                     </button>
// //                   </div>
// //                 </div>
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>

// //           <Swiper
// //             onSwiper={setThumbsSwiper}
// //             spaceBetween={10}
// //             slidesPerView={5}
// //             freeMode={true}
// //             watchSlidesProgress={true}
// //             modules={[FreeMode, Navigation, Thumbs]}
// //             className="mySwiper mt-2 thumb-gallery-opacity"
// //           >
// //             {slides.map((slide, index) => (
// //               <SwiperSlide key={index}>
// //                 <Image
// //                   width={163}
// //                   height={106}
// //                   priority
// //                   style={{ objectFit: "cover" }}
// //                   src={slide.imageSrc}
// //                   alt="thum car"
// //                 />
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>
// //         </div>
// //       </div>

// //       <ModalVideo
// //         channel="youtube"
// //         isOpen={isOpen}
// //         videoId={videoId}
// //         onClose={() => setOpen(false)}
// //       />
// //     </>
// //   );
// // }

// "use client";
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
// import ModalVideo from "react-modal-video";
// import "react-modal-video/scss/modal-video.scss";

// // import required modules
// import { FreeMode, Navigation, Thumbs } from "swiper";
// import Image from "next/image";

// // Used only if a car has no gallery AND no image at all
// const defaultSlides = [
//   { imageSrc: "/images/listing/lsp1-v1.jpg", videoId: "VWrJkx6O0L8" },
//   { imageSrc: "/images/listing/lsp1-v2.jpg", videoId: "TLEyLGWvjII" },
//   { imageSrc: "/images/listing/lsp1-v3.jpg", videoId: "BS2jGGYC60c" },
//   { imageSrc: "/images/listing/lsp1-v4.jpg", videoId: "8PiZNUCexrA" },
//   { imageSrc: "/images/listing/lsp1-v5.jpg", videoId: "m4ZGuAbUMg8" },
// ];

// export default function ProductGallery({ car }) {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [isOpen, setOpen] = useState(false);
//   const [videoId, setVideoId] = useState("");

//   // Priority: car.gallery (multiple photos/videos) -> car.image (single photo) -> demo fallback
//   const slides =
//     car?.gallery && car.gallery.length > 0
//       ? car.gallery
//       : car?.image
//       ? [{ imageSrc: car.image, videoId: null }]
//       : defaultSlides;

//   const openModal = (id) => {
//     setVideoId(id);
//     setOpen(true);
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-lg-12">
//           <Swiper
//             style={{
//               "--swiper-navigation-color": "#fff",
//               "--swiper-pagination-color": "#fff",
//             }}
//             spaceBetween={10}
//             navigation={true}
//             thumbs={{
//               swiper:
//                 thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//             }}
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="mySwiper2 sps_content single_product_grid user_profile "
//           >
//             {slides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   className="item"
//                   style={{ position: "relative", width: "100%", height: "460px" }}
//                 >
//                   <Image
//                     fill
//                     priority
//                     sizes="(max-width: 767px) 100vw, 856px"
//                     style={{ objectFit: "cover", objectPosition: "center" }}
//                     className="w-100 h-100"
//                     src={slide.imageSrc}
//                     alt={car?.title || "large car"}
//                   />

//                   {slide.videoId ? (
//                     <div className="overlay_icon">
//                       <button
//                         className="video_popup_btn popup-img popup-youtube"
//                         onClick={() => openModal(slide.videoId)}
//                       >
//                         <span className="flaticon-play-button" />
//                         Video
//                       </button>
//                     </div>
//                   ) : null}
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {slides.length > 1 ? (
//             <Swiper
//               onSwiper={setThumbsSwiper}
//               spaceBetween={10}
//               slidesPerView={5}
//               freeMode={true}
//               watchSlidesProgress={true}
//               modules={[FreeMode, Navigation, Thumbs]}
//               className="mySwiper mt-2 thumb-gallery-opacity"
//             >
//               {slides.map((slide, index) => (
//                 <SwiperSlide key={index}>
//                   <div
//                     style={{ position: "relative", width: "100%", height: "106px" }}
//                   >
//                     <Image
//                       fill
//                       priority
//                       sizes="(max-width: 767px) 100vw, 163px"
//                       style={{ objectFit: "cover", objectPosition: "center" }}
//                       src={slide.imageSrc}
//                       alt={car?.title || "thumb car"}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : null}
//         </div>
//       </div>

//       <ModalVideo
//         channel="youtube"
//         isOpen={isOpen}
//         videoId={videoId}
//         onClose={() => setOpen(false)}
//       />
//     </>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
// import ModalVideo from "react-modal-video";
// import "react-modal-video/scss/modal-video.scss";

// // import required modules
// import { FreeMode, Navigation, Thumbs } from "swiper";
// import Image from "next/image";

// // Used only if a car has no gallery AND no image at all
// const defaultSlides = [
//   { imageSrc: "/images/listing/lsp1-v1.jpg", videoId: "VWrJkx6O0L8" },
//   { imageSrc: "/images/listing/lsp1-v2.jpg", videoId: "TLEyLGWvjII" },
//   { imageSrc: "/images/listing/lsp1-v3.jpg", videoId: "BS2jGGYC60c" },
//   { imageSrc: "/images/listing/lsp1-v4.jpg", videoId: "8PiZNUCexrA" },
//   { imageSrc: "/images/listing/lsp1-v5.jpg", videoId: "m4ZGuAbUMg8" },
// ];

// export default function ProductGallery({ car }) {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [isOpen, setOpen] = useState(false);
//   const [videoId, setVideoId] = useState("");

//   // Priority: car.gallery (multiple photos/videos) -> car.image (single photo) -> demo fallback
//   const slides =
//     car?.gallery && car.gallery.length > 0
//       ? car.gallery
//       : car?.image
//       ? [{ imageSrc: car.image, videoId: null }]
//       : defaultSlides;

//   const openModal = (id) => {
//     setVideoId(id);
//     setOpen(true);
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-lg-12">
//           <Swiper
//             style={{
//               "--swiper-navigation-color": "#fff",
//               "--swiper-pagination-color": "#fff",
//             }}
//             spaceBetween={10}
//             navigation={true}
//             thumbs={{
//               swiper:
//                 thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//             }}
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="mySwiper2 sps_content single_product_grid user_profile "
//           >
//             {slides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   className="item"
//                   style={{
//                     position: "relative",
//                     width: "100%",
//                     aspectRatio: "856 / 554",
//                   }}
//                 >
//                   <Image
//                     fill
//                     priority
//                     sizes="(max-width: 767px) 100vw, 856px"
//                     style={{ objectFit: "cover", objectPosition: "center" }}
//                     className="w-100 h-100"
//                     src={slide.imageSrc}
//                     alt={car?.title || "large car"}
//                   />

//                   {slide.videoId ? (
//                     <div className="overlay_icon">
//                       <button
//                         className="video_popup_btn popup-img popup-youtube"
//                         onClick={() => openModal(slide.videoId)}
//                       >
//                         <span className="flaticon-play-button" />
//                         Video
//                       </button>
//                     </div>
//                   ) : null}
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {slides.length > 1 ? (
//             <Swiper
//               onSwiper={setThumbsSwiper}
//               spaceBetween={10}
//               slidesPerView={5}
//               freeMode={true}
//               watchSlidesProgress={true}
//               breakpoints={{
//                 0: { slidesPerView: 3, spaceBetween: 6 },
//                 480: { slidesPerView: 4, spaceBetween: 8 },
//                 768: { slidesPerView: 5, spaceBetween: 10 },
//               }}
//               modules={[FreeMode, Navigation, Thumbs]}
//               className="mySwiper mt-2 thumb-gallery-opacity"
//             >
//               {slides.map((slide, index) => (
//                 <SwiperSlide key={index}>
//                   <div
//                     style={{
//                       position: "relative",
//                       width: "100%",
//                       aspectRatio: "163 / 106",
//                     }}
//                   >
//                     <Image
//                       fill
//                       priority
//                       sizes="(max-width: 767px) 33vw, 163px"
//                       style={{ objectFit: "cover", objectPosition: "center" }}
//                       src={slide.imageSrc}
//                       alt={car?.title || "thumb car"}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : null}
//         </div>
//       </div>

//       <ModalVideo
//         channel="youtube"
//         isOpen={isOpen}
//         videoId={videoId}
//         onClose={() => setOpen(false)}
//       />
//     </>
//   );
// }

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

// import required modules
import { Autoplay, FreeMode, Keyboard, Navigation, Pagination, Thumbs } from "swiper";
import Image from "next/image";

// Used only if a car has no gallery AND no image at all
const defaultSlides = [
  { imageSrc: "/images/listing/lsp1-v1.jpg", videoId: "VWrJkx6O0L8" },
  { imageSrc: "/images/listing/lsp1-v2.jpg", videoId: "TLEyLGWvjII" },
  { imageSrc: "/images/listing/lsp1-v3.jpg", videoId: "BS2jGGYC60c" },
  { imageSrc: "/images/listing/lsp1-v4.jpg", videoId: "8PiZNUCexrA" },
  { imageSrc: "/images/listing/lsp1-v5.jpg", videoId: "m4ZGuAbUMg8" },
];

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export default function ProductGallery({ car }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const mainSwiperRef = useRef(null);

  // ---- Lightbox / zoom state ----
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });
  const imgWrapRef = useRef(null);

  // Priority: car.gallery (multiple photos/videos) -> car.image (single photo) -> demo fallback
  const slides =
    car?.gallery && car.gallery.length > 0
      ? car.gallery
      : car?.image
      ? [{ imageSrc: car.image, videoId: null }]
      : defaultSlides;

  const openModal = (id) => {
    setVideoId(id);
    setOpen(true);
  };

  const toggleAutoplay = () => {
    const swiper = mainSwiperRef.current;
    if (!swiper) return;

    if (isPlaying) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  // ---- Lightbox helpers ----
  const openLightbox = (index) => {
    // pause the main slider autoplay while viewing full screen
    const swiper = mainSwiperRef.current;
    if (swiper && isPlaying) {
      swiper.autoplay.stop();
    }
    setActiveIndex(index);
    setZoom(1);
    setPos({ x: 0, y: 0 });
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoom(1);
    setPos({ x: 0, y: 0 });
    const swiper = mainSwiperRef.current;
    if (swiper && isPlaying) {
      swiper.autoplay.start();
    }
  }, [isPlaying]);

  const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const zoomIn = () => {
    setZoom((z) => clampZoom(Number((z + ZOOM_STEP).toFixed(2))));
  };

  const zoomOut = () => {
    setZoom((z) => {
      const next = clampZoom(Number((z - ZOOM_STEP).toFixed(2)));
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  };

  const toggleZoomOnDoubleClick = (e) => {
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoom(2);
    }
  };

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, [slides.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, [slides.length]);

  // Mouse / touch drag-to-pan when zoomed in
  const handlePointerDown = (e) => {
    if (zoom <= 1) return;
    const point = e.touches ? e.touches[0] : e;
    dragState.current = {
      dragging: true,
      startX: point.clientX,
      startY: point.clientY,
      origX: pos.x,
      origY: pos.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const point = e.touches ? e.touches[0] : e;
    const dx = point.clientX - dragState.current.startX;
    const dy = point.clientY - dragState.current.startY;
    setPos({ x: dragState.current.origX + dx, y: dragState.current.origY + dy });
  };

  const handlePointerUp = () => {
    dragState.current.dragging = false;
  };

  // Scroll wheel to zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  // Keyboard controls while lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-" || e.key === "_") zoomOut();
      else if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKey);
    // lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  const activeSlide = slides[activeIndex];

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="gallery-main-wrap">
            <Swiper
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper;
              }}
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              loop={slides.length > 1}
              keyboard={{ enabled: true }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              pagination={
                slides.length > 1
                  ? { clickable: true, dynamicBullets: true }
                  : false
              }
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Pagination, Thumbs, Autoplay, Keyboard]}
              className="mySwiper2 sps_content single_product_grid user_profile "
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="item"
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "856 / 554",
                    }}
                  >
                    <Image
                      fill
                      priority
                      sizes="(max-width: 767px) 100vw, 856px"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      className="w-100 h-100"
                      src={slide.imageSrc}
                      alt={car?.title || "large car"}
                    />

                    {slide.videoId ? (
                      <div className="overlay_icon">
                        <button
                          className="video_popup_btn popup-img popup-youtube"
                          onClick={() => openModal(slide.videoId)}
                        >
                          <span className="flaticon-play-button" />
                          Video
                        </button>
                      </div>
                    ) : null}

                    {/* View full image / zoom trigger */}
                    <button
                      type="button"
                      className="gallery-expand-btn"
                      onClick={() => openLightbox(index)}
                      aria-label="View full image"
                      title="View full image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
                      </svg>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {slides.length > 1 ? (
              <button
                type="button"
                className="gallery-autoplay-toggle"
                onClick={toggleAutoplay}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" />
                    <rect x="14" y="5" width="4" height="14" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                )}
              </button>
            ) : null}
          </div>

          {slides.length > 1 ? (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              breakpoints={{
                0: { slidesPerView: 3, spaceBetween: 6 },
                480: { slidesPerView: 4, spaceBetween: 8 },
                768: { slidesPerView: 5, spaceBetween: 10 },
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-2 thumb-gallery-opacity"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "163 / 106",
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      fill
                      priority
                      sizes="(max-width: 767px) 33vw, 163px"
                      style={{ objectFit: "cover", objectPosition: "center", cursor: "pointer" }}
                      src={slide.imageSrc}
                      alt={car?.title || "thumb car"}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />

      {/* ---- Fullscreen zoom lightbox ---- */}
      {lightboxOpen ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true">
          <div className="gallery-lightbox-backdrop" onClick={closeLightbox} />

          <button
            type="button"
            className="lightbox-btn lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
            title="Close (Esc)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                className="lightbox-btn lightbox-prev"
                onClick={goPrev}
                aria-label="Previous image"
                title="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="lightbox-btn lightbox-next"
                onClick={goNext}
                aria-label="Next image"
                title="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          ) : null}

          <div
            className="gallery-lightbox-stage"
            onWheel={handleWheel}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            onDoubleClick={toggleZoomOnDoubleClick}
            ref={imgWrapRef}
          >
            <div
              className="gallery-lightbox-imgwrap"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
                cursor: zoom > 1 ? "grab" : "zoom-in",
              }}
            >
              <Image
                src={activeSlide.imageSrc}
                alt={car?.title || "full size image"}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className="lightbox-toolbar">
            <button
              type="button"
              className="lightbox-btn"
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              title="Zoom out (-)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35M8 11h6" />
              </svg>
            </button>

            <span className="lightbox-zoom-level">{Math.round(zoom * 100)}%</span>

            <button
              type="button"
              className="lightbox-btn"
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              title="Zoom in (+)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </button>

            <button
              type="button"
              className="lightbox-btn"
              onClick={resetZoom}
              disabled={zoom === 1 && pos.x === 0 && pos.y === 0}
              aria-label="Reset zoom"
              title="Reset (0)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
              </svg>
            </button>

            {slides.length > 1 ? (
              <span className="lightbox-counter">
                {activeIndex + 1} / {slides.length}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .gallery-main-wrap {
          position: relative;
        }
        .gallery-autoplay-toggle {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .gallery-autoplay-toggle:hover {
          background: rgba(0, 0, 0, 0.75);
        }

        .gallery-expand-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 10;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .gallery-expand-btn:hover {
          background: rgba(0, 0, 0, 0.75);
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gallery-lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
        }
        .gallery-lightbox-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          touch-action: none;
        }
        .gallery-lightbox-imgwrap {
          position: relative;
          width: min(90vw, 1100px);
          height: min(80vh, 750px);
          transition: transform 0.08s linear;
          will-change: transform;
        }

        .lightbox-btn {
          position: absolute;
          z-index: 10001;
          border: none;
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          transition: background 0.2s ease;
        }
        .lightbox-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
        }
        .lightbox-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .lightbox-close {
          top: 20px;
          right: 20px;
        }
        .lightbox-prev {
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        .lightbox-next {
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }

        .lightbox-toolbar {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10001;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 14px;
          border-radius: 999px;
          backdrop-filter: blur(6px);
        }
        .lightbox-toolbar .lightbox-btn {
          position: static;
          width: 32px;
          height: 32px;
        }
        .lightbox-zoom-level {
          color: #fff;
          font-size: 12px;
          min-width: 40px;
          text-align: center;
        }
        .lightbox-counter {
          color: #fff;
          font-size: 12px;
          margin-left: 6px;
          padding-left: 10px;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 767px) {
          .lightbox-prev,
          .lightbox-next {
            width: 34px;
            height: 34px;
          }
          .lightbox-prev {
            left: 8px;
          }
          .lightbox-next {
            right: 8px;
          }
          .gallery-lightbox-imgwrap {
            width: 95vw;
            height: 70vh;
          }
        }
      `}</style>
    </>
  );
}