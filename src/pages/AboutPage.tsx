/* About Page */

const AboutPage = () => {
  return (
    <div className="about bg-s500 mb-20 flex flex-col p-10 m-auto">
      <h2 className="color-s400 heading heading--primary">Our story</h2>
      <p className="color-s400 body mt-3">
        SpeedySnail is a thoughtfully designed app inspired by Miriam, an
        11-year-old superstar whose favorite animal was a snail and whose first
        sign was “snail.” Created to address the lack of visually appealing
        daily planners for children, the app carries her spirit and supports
        children in navigating their day with confidence and joy. The app offers
        a user-friendly platform where children can create daily schedules using
        pictures, independently or with a parent’s support. They can choose from
        a library of preloaded images or upload their own for a more
        personalized experience.
      </p>
      <p className="color-s400 body mt-5 mb-10">
        {" "}
        Every morning, the schedule resets, making it simple to start fresh. By
        limiting each day’s schedule to 5-6 pictures, SpeedySnail provides a
        clear, structured overview of what to expect. Easy-to-search and
        categorized images ensure that planning remains quick and stress-free.
        SpeedySnail combines simplicity with vibrant design to empower children
        to manage their days while creating a sense of comfort and
        predictability. It’s more than just a planning tool—it’s a space for
        exploration, creativity, and independence.
      </p>{" "}
    </div>
  );
};

export default AboutPage;
