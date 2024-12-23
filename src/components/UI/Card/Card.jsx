import React from "react";
import PropTypes from "prop-types";

const Card = ({
  title,
  subtitle,
  actionIcon,
  actionClick,
  headerClass,
  children,
  footerText,
  footerClick,
  containerClass,
}) => {
  return (
    <div
      className={`w-full h-full p-4 rounded-xl shadow-input dark:shadow-none dark:bg-inherit bg-white border border-light_border_grid dark:border-dark_border_grid ${containerClass}`}
    >
      <div className={`flex items-center justify-between mb-4 ${headerClass}`}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        {actionIcon && (
          <button
            onClick={actionClick}
            className="text-sm font-medium hover:underline"
          >
            {actionIcon}
          </button>
        )}
      </div>
      {subtitle && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-gray-500 dark:text-gray-100 p-2">{subtitle}</h4>
        </div>
      )}
      {children}

      {footerText && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-6" />
          <button
            onClick={footerClick}
            className="w-full py-2 text-sm font-medium hover:underline"
          >
            {footerText}
          </button>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  actionIcon: PropTypes.element,
  actionClick: PropTypes.func,
  headerClass: PropTypes.string,
  children: PropTypes.node,
  footerText: PropTypes.string,
  footerClick: PropTypes.func,
  containerClass: PropTypes.string,
};

Card.defaultProps = {
  actionIcon: null,
  actionClick: null,
  headerClass: "",
  footerText: null,
  footerClick: null,
  containerClass: "",
};

export default Card;
