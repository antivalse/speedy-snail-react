/* Function to compare db Timestamp and current date */

import { FieldValue, Timestamp } from "firebase/firestore";

const isSameDate = async (
  createdAt: Timestamp | FieldValue | undefined,
  scheduleId: string | undefined,
  emptyImages: (id: string) => Promise<void>
) => {
  // Create a variable for storing createdAt as javascript date
  let scheduleCreatedAtJsDate: Date | null = null;

  const scheduleCreatedAt = createdAt;
  const currentDate = new Date();

  // Check if scheduleCreatedAt is a Timestamp and convert it to JavaScript Date
  if (scheduleCreatedAt instanceof Timestamp) {
    scheduleCreatedAtJsDate = scheduleCreatedAt.toDate();
  }

  if (scheduleCreatedAtJsDate) {
    // Check if current day is the same as the schedule created date
    const isSameDay =
      currentDate.getDate() === scheduleCreatedAtJsDate.getDate() &&
      currentDate.getMonth() === scheduleCreatedAtJsDate.getMonth() &&
      currentDate.getFullYear() === scheduleCreatedAtJsDate.getFullYear();

    // If it's not the same day, check if current day is later than the schedule creation date
    if (!isSameDay) {
      const isCurrentDayLater = currentDate > scheduleCreatedAtJsDate;
      if (isCurrentDayLater && scheduleId) {
        await emptyImages(scheduleId);
      }
    } else {
      return;
    }
  }
};

export default isSameDate;

// TEST FUNCTION FOR SHORTER INTERVAL

// import { FieldValue, Timestamp } from "firebase/firestore";

// const isSameDate = async (
//   createdAt: Timestamp | FieldValue | undefined,
//   scheduleId: string | undefined,
//   emptyImages: (id: string) => Promise<void>
// ) => {
//   // Create a variable for storing createdAt as a JavaScript date
//   let scheduleCreatedAtJsDate: Date | null = null;

//   const scheduleCreatedAt = createdAt;
//   const currentDate = new Date();

//   // Check if scheduleCreatedAt is a Timestamp and convert it to JavaScript Date
//   if (scheduleCreatedAt instanceof Timestamp) {
//     scheduleCreatedAtJsDate = scheduleCreatedAt.toDate();
//   }

//   if (scheduleCreatedAtJsDate) {
//     // Calculate the difference in time (in minutes)
//     const diffInMinutes =
//       (currentDate.getTime() - scheduleCreatedAtJsDate.getTime()) / (1000 * 60);

//     // If the difference is greater than 2 minutes, call emptyImages
//     if (diffInMinutes > 2 && scheduleId) {
//       await emptyImages(scheduleId);
//     } else {
//       return;
//     }
//   }
// };

// export default isSameDate;
