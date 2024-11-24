/* Scroll into view function */

const scrollToDiv = (elementId: string) => {
  const div = document.getElementById(elementId);
  div?.scrollIntoView({
    behavior: "smooth",
  });
};

export default scrollToDiv;
