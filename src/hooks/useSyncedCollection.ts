/* Custom hook for getting realtime collection updates from Firebase */

import {
  CollectionReference,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useSyncedCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[] | null>(null);

  // Set up real-time listener on component mount
  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));

      setData(data);
      setLoading(false);
    });

    // Clean up listener on unmount
    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colRef]);

  return {
    data,
    loading,
  };
};

export default useSyncedCollection;
