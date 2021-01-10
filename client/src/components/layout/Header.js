import React,{useState} from "react";

// import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
// import {  showRightSidebarAction,toggleLeftmenu } from "../../store/actions";
// reactstrap
// import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import NotificationDropdown from "../common/NotificationDropdown";
import ProfileMenu from "../common/ProfileMenu";

//i18n
// import { withNamespaces } from 'react-i18next';

const Header = (props) => {

    const [menu, setMenu] = useState(false);
    const [isSearch, setSearch] = useState(false);
    const [socialDrp, setsocialDrp] = useState(false);


  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
      return (
        <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                  RevvedAI
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                data-toggle="collapse"
                onClick={() => { props.toggleLeftmenu(!props.leftMenu); }}
                data-target="#topnav-menu-content">
                <i className="fa fa-fw fa-bars"></i>
              </button>

              <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="bx bx-search-alt"></span>
                </div>
              </form>
            </div>

            <div className="d-flex">
              <div className="dropdown d-inline-block d-lg-none ml-2">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  id="page-header-search-dropdown"
                  onClick={() => setSearch(!isSearch)}>
                  <i className="mdi mdi-magnify"></i>
                </button>
                <div
                  className={isSearch ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"}
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Recipient's username"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <NotificationDropdown />

              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
      );
    }

// const mapStatetoProps = state => {
//   const { layoutType,showRightSidebar, leftMenu } = state.Layout;
//   return { layoutType,showRightSidebar,leftMenu };
// };
export default Header;

// export default connect(mapStatetoProps, { showRightSidebarAction,toggleLeftmenu })(withNamespaces()(Header));


