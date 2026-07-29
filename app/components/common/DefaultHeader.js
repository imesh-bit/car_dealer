// import Link from "next/link";
// import MainMenu from "./MainMenu";
// import Image from "next/image";

// const DefaultHeader = () => {
//   return (
//     <header className="header-nav menu_style_home_one home3_style main-menu">
//       {/* Ace Responsive Menu */}
//       <nav>
//         <div className="container posr">
//           {/* Menu Toggle btn*/}
//           <div className="menu-toggle">
//             <button type="button" id="menu-btn">
//               <span className="icon-bar" />
//               <span className="icon-bar" />
//               <span className="icon-bar" />
//             </button>
//           </div>
//           <Link href="/" className="navbar_brand float-start dn-md">
//             <Image
//               width={140}
//               height={45}
//               className="logo1 img-fluid"
//               src="/images/header-logo.png"
//               alt="header-logo.svg"
//             />
//             <Image
//               width={140}
//               height={45}
//               className="logo2 img-fluid"
//               src="/images/header-logo"
//               alt="header-logo.png"
//             />
//           </Link>
//           {/* Responsive Menu Structure*/}
//           <ul
//             // id="respMenu"
//             className="ace-responsive-menu text-end"
//             data-menu-style="horizontal"
//           >
//             <MainMenu />
//             <li className="add_listing">
//               <Link href="/add-listings">+ Add Listing</Link>
//             </li>
//             <li
//               className="sidebar_panel"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasRight"
//               aria-controls="offcanvasRight"
//             >
//               <a className="sidebar_switch pt0" role="button">
//                 <span />
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default DefaultHeader;

"use client";
import Link from "next/link";
import MainMenu from "./MainMenu";
import Image from "next/image";

const DefaultHeader = () => {
  return (
    <header className="header-nav menu_style_home_one home3_style main-menu">
      {/* Ace Responsive Menu */}
      <nav>
        <div className="container posr">
          {/* Menu Toggle btn*/}
          <div className="menu-toggle">
            <button type="button" id="menu-btn">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <Link href="/" className="navbar_brand float-start dn-md brand-logo-wrap">
            <span className="brand-logo-chip">
              <Image
                width={175}
                height={40}
                className="img-fluid brand-logo brand-logo-dark"
                src="/images/header-logo-dark.png"
                alt="RAIKO GROUP"
                priority
              />
            </span>
          </Link>
          {/* Responsive Menu Structure*/}
          <ul
            // id="respMenu"
            className="ace-responsive-menu text-end"
            data-menu-style="horizontal"
          >
            <MainMenu />
            {/* <li className="add_listing">
              <Link href="/add-listings">+ Add Listing</Link>
            </li> */}
            <li
              className="sidebar_panel"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <a className="sidebar_switch pt0" role="button">
                <span />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .brand-logo-wrap {
          display: flex;
          align-items: center;
          background-color: transparent !important;
        }
        .brand-logo-chip {
          display: inline-flex;
          align-items: center;
          background: transparent !important;
          border-radius: 10px;
          padding: 6px 14px;
          box-shadow: none !important;
        }
        .brand-logo {
          height: 40px;
          width: 175px;
          object-fit: contain;
          display: block;
          background-color: transparent !important;
        }
        /* show light logo on mobile, dark logo on desktop (web) */
        .brand-logo-dark {
          display: none;
        }
        .brand-logo-light {
          display: block;
        }
        @media (min-width: 576px) {
          .brand-logo-light {
            display: none;
          }
          .brand-logo-dark {
            display: block;
          }
        }
        @media (max-width: 575px) {
          .brand-logo {
            height: 30px;
          }
          .brand-logo-chip {
            padding: 5px 10px;
          }
        }
      `}</style>
    </header>
  );
};

export default DefaultHeader;