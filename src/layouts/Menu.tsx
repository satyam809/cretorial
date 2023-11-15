import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import classNames from "classnames";
import FeatherIcon from "feather-icons-react";

//helpers
import { findAllParent, findMenuItem } from "../helpers/menu";

// constants
import { MenuItemTypes } from "../constants/menu";
import * as apiService from "../services";

interface SubMenus {
  item: MenuItemTypes;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: any, status: boolean) => void;
  className?: string;
}

const MenuItemWithChildren = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}: SubMenus) => {
  const [open, setOpen] = useState<boolean>(
    activeMenuItems!.includes(item.key)
  );

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = (e: any) => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className={classNames({ "menuitem-active": open })}>
      <Link
        to="#"
        onClick={toggleMenuItem}
        data-menu-key={item.key}
        aria-expanded={open}
        className={classNames("side-sub-nav-link", linkClassName)}
      >
        {item.icon && <FeatherIcon icon={item.icon} />}
        {!item.badge ? (
          <span className="menu-arrow"></span>
        ) : (
          <span className={`badge bg-${item.badge.variant} float-end`}>
            {item.badge.text}
          </span>
        )}
        <span> {item.label} </span>
      </Link>
      <Collapse in={open}>
        <div>
          <ul className={classNames(subMenuClassNames)}>
            {(item.children || []).map((child, i) => {
              return (
                <React.Fragment key={i}>
                  {child.children ? (
                    <>
                      {/* parent */}
                      <MenuItemWithChildren
                        item={child}
                        activeMenuItems={activeMenuItems}
                        subMenuClassNames="side-nav-third-level"
                        toggleMenu={toggleMenu}
                      />
                    </>
                  ) : (
                    <>
                      {/* child */}
                      <MenuItem
                        item={child}
                        className={
                          activeMenuItems!.includes(child.key)
                            ? "menuitem-active"
                            : ""
                        }
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </Collapse>
    </li>
  );
};

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
  //console.log(item.key === 'expression-wizard' && item.isTitle === false);

  // if (item.key === "expression-wizard" && item.isTitle === false) {
  //   return (
  //     <li className={classNames("menu-title mt-2", className)} style={{padding:'25px 0px 0px 0px'}}>
  //       <MenuItemLink item={item} className={linkClassName} />
  //     </li>
  //   );
  // } else {
  return (
    <li className={classNames("side-nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
  // }
};

const MenuItemLink = ({ item, className }: SubMenus) => {
  return (
    <Link
      to={item.url!}
      target={item.target}
      className={classNames("side-nav-link-ref", className)}
      data-menu-key={item.key}
    >
      {item.icon && <FeatherIcon icon={item.icon} />}
      {item.badge && (
        <span className={`badge bg-${item.badge.variant} float-end`}>
          {item.badge.text}
        </span>
      )}

      <span> {item.label == "Tools" ? "Dashboard" : item.label} </span>
    </Link>
  );
};

/**
 * Renders the application menu
 */
interface AppMenuProps {
  menuItems: MenuItemTypes[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  let location = useLocation();
  const history = useHistory();

  const menuRef: any = useRef(null);

  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show)
      setActiveMenuItems([
        menuItem["key"],
        ...findAllParent(menuItems, menuItem),
      ]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById("side-menu");
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName("side-nav-link-ref");
      for (let i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute("data-menu-key");
        const activeMt = findMenuItem(menuItems, mid);
        if (activeMt) {
          setActiveMenuItems([
            // activeMt["key"],
            ...findAllParent(menuItems, activeMt),
          ]);
        }
      }
    }
  }, [location, menuItems]);

  const getSubStatus = async () => {
    const data = await apiService.CaiShowSubsData();
    console.log(data);
    if (data.Status != "Active") {
      history.push("/pages/pricing");
    }
  };

  // useEffect(() => {
  //   getSubStatus();
  // }, []);

  useEffect(() => {
    activeMenu();
  }, [activeMenu]);

  return (
    <>
      <ul className="side-menu" ref={menuRef} id="side-menu">
        {(menuItems || []).map((item, idx) => {
          // console.log(item);
          return (
            <React.Fragment key={idx}>
              {item.isTitle ? (
                <>
                  <li
                    data-id={idx}
                    className={classNames("", {
                      "menu-title mt-2": idx == 1,
                    })}
                  >
                    {item.label}
                  </li>

                  {idx == 9 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "16px 4px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "#666666",
                          height: "1.5px",
                        }}
                      />

                      <p style={{ margin: "0 10px", color: "#666666" }}>
                        Most Popular
                      </p>

                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "#666666",
                          height: "1.5px",
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {item.children ? (
                    <MenuItemWithChildren
                      item={item}
                      toggleMenu={toggleMenu}
                      subMenuClassNames="nav-second-level"
                      // activeMenuItems={(location.pathname == item.key) ? "menuitem-active" : ""}
                      activeMenuItems={activeMenuItems}
                    //  activeMenuItems={(location.pathname == item.key) ? "menuitem-active" : ""}
                    />
                  ) : (
                    <MenuItem
                      item={item}
                      className={
                        (location.pathname == item.key)
                        //(activeMenuItems[0] == item.key)
                          ? "menuitem-active"
                          : ""
                      }
                    />
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default AppMenu;
