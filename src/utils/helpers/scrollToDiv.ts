/* Scroll into view function */

const scrollToDiv = (elementId?: string) => {
  if (elementId) {
    const div = document.getElementById(elementId);
    div?.scrollIntoView({
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

export default scrollToDiv;
