// "use client";
// import Link from "next/link";
// import MainMenu from "../../common/MainMenu";
// import Image from "next/image";

// const Header = () => {
//   return (
//     <header className="header-nav menu_style_home_one transparent main-menu">
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
//           <Link href="/" className="navbar_brand float-start dn-md brand-logo-wrap">
//             <span className="brand-logo-chip">
//               <Image
//                 width={175}
//                 height={40}
//                 className="img-fluid brand-logo brand-logo-full"
//                 src="/images/header-logo.png"
//                 alt="RAIKO GROUP"
//                 priority
//               />
//               <Image
//                 width={40}
//                 height={32}
//                 className="brand-logo brand-logo-icon"
//                 src="/images/header-logo-icon.png"
//                 alt="RAIKO GROUP"
//               />
//             </span>
//           </Link>
//           {/* Responsive Menu Structure*/}
//           <ul
//             id="respMenu"
//             className="ace-responsive-menu text-end"
//             data-menu-style="horizontal"
//           >
//             <MainMenu />
//             {/* <li className="add_listing">
//               <Link href="/add-listings">+ Add Listing</Link>
//             </li> */}
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

//       <style jsx>{`
//         .brand-logo-wrap {
//           display: flex;
//           align-items: center;
//         }
//         .brand-logo-chip {
//           display: inline-flex;
//           align-items: center;
//           background: rgba(10, 12, 20, 0.65);
//           border-radius: 10px;
//           padding: 6px 14px;
//         }
//         .brand-logo {
//           height: 40px;
//           width: auto;
//           object-fit: contain;
//           display: block;
//         }
//         .brand-logo-icon {
//           display: none;
//         }
//         @media (max-width: 575px) {
//           .brand-logo-full {
//             display: none;
//           }
//           .brand-logo-icon {
//             display: block;
//             height: 34px;
//           }
//           .brand-logo-chip {
//             padding: 6px 10px;
//           }
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;


"use client";
import Link from "next/link";
import MainMenu from "../../common/MainMenu";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header-nav menu_style_home_one transparent main-menu">
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
                className="img-fluid brand-logo"
                src="/images/header-logo.png"
                alt="RAIKO GROUP"
                priority
              />
            </span>
          </Link>
          {/* Responsive Menu Structure*/}
          <ul
            id="respMenu"
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
        }
        .brand-logo-chip {
          display: inline-flex;
          align-items: center;
          background: rgba(10, 12, 20, 0.65);
          border-radius: 10px;
          padding: 6px 14px;
        }
        .brand-logo {
          height: 40px;
          width: 175px;
          object-fit: contain;
          display: block;
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

export default Header;