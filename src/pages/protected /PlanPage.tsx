/* Plan Page */

import PlaceholderImg from "../../assets/images/placeholders/scheduleimg_test.png";
import AddImage from "../../components/ui/AddImage";

const PlanPage = () => {
  // Get today's date
  const date = new Date()
    .toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .replace(/,/g, "\n"); // Remove commas

  const testItems = [
    { id: 1, name: "Eat breakfast", image: PlaceholderImg },
    { id: 2, name: "Eat more breakfast", image: PlaceholderImg },
    { id: 3, name: "Eat breakfast again", image: PlaceholderImg },
    { id: 4, name: "Eat last breakfast", image: PlaceholderImg },
    { id: 5, name: "Smoothie", image: PlaceholderImg },
  ];
  return (
    <>
      <div className="plan-page flex flex-col items-center my-10 ">
        <h2 className="heading heading--primary mb-10 color-p300 whitespace-pre-wrap text-center">
          {date}
        </h2>
        <div className="plan-page__schedule bg-p100 flex flex-col items-center py-10 mb-12">
          <ul className="plan-page__schedule__images">
            {testItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <h3 className="body body--secondary color-p200 my-5">
                  {item.name}
                </h3>
                <img
                  className="plan-page__schedule__images__image"
                  src={item.image}
                  alt={item.name}
                />
              </div>
            ))}

            {testItems.length < 6 ? <AddImage /> : ""}
          </ul>
        </div>
        <div className="today-page__suggestions"></div>
      </div>
    </>
  );
};

export default PlanPage;
