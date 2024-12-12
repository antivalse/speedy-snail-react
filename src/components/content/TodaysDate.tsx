/* Todays Date Component */

const TodaysDate = () => {
  // Get today's date
  const date = new Date()
    .toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .replace(/,/g, "\n"); // Remove commas

  return (
    <h2
      id="date"
      className="heading heading--primary mb-5 color-p300 text-center"
    >
      {date}
    </h2>
  );
};

export default TodaysDate;
