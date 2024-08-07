import React from "react";
import Link from "next/link";
import { MenuItem } from "@mui/material";
import { generateNavLink } from "../../../utils/linkFunctions";
import { COLORS } from "../../../consts/stylingValues";
/**
 * This componenet is for an individual item in the mobile navigation menu.
 * @param {*} activeLink the current name of the page the user is currently on.
 * @param {*} externalLink a link that is not inside the website.
 * @param {*} itemTextAndOrLink the item text to display and for the generated link.
 * @returns component
 */
export const MobileNavItem = ({
  activeLink,
  externalLink,
  itemTextAndOrLink,
}) => {
  return (
    <Link
      href={generateNavLink(itemTextAndOrLink)}
      style={{
        textDecoration: "none",
        color:
          activeLink === itemTextAndOrLink
            ? COLORS.mainOrange
            : "#000",
      }}
      target={externalLink ? "_blank" : ""}
      rel={externalLink ? "noopener noreferrer" : ""}
      role="menuitem"
    >
      <MenuItem>{itemTextAndOrLink}</MenuItem>
    </Link>
  );
};
