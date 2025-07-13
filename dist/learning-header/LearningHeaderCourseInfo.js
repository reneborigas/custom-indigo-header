import React from 'react';
import PropTypes from 'prop-types';
var LearningHeaderCourseInfo = function LearningHeaderCourseInfo(_ref) {
  var courseOrg = _ref.courseOrg,
    courseNumber = _ref.courseNumber,
    courseTitle = _ref.courseTitle;
  return /*#__PURE__*/React.createElement("div", {
    className: "course-info-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-block title"
  }, courseTitle), /*#__PURE__*/React.createElement("span", {
    className: "d-block org"
  }, courseOrg, " ", courseNumber));
};
export var courseInfoDataShape = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string
};
LearningHeaderCourseInfo.propTypes = courseInfoDataShape;
export default LearningHeaderCourseInfo;
//# sourceMappingURL=LearningHeaderCourseInfo.js.map