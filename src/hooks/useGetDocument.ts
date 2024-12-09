/* Custom hook to get a document from firebase */

import { CollectionReference, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetDocument = <T>(
  colRef: CollectionReference<T>,
  documentId: string | undefined
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) {
      setLoading(false);
      console.log("There was no doc!");
      return;
    }
    const docRef = doc(colRef, documentId);
    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        try {
          if (!snapshot.exists()) {
            setData(null);
            setError(true);
            setLoading(false);
            return;
          }

          const data: T = {
            ...snapshot.data(),
            _id: snapshot.id,
          };

          setData(data);
          setLoading(false);
        } catch (err) {
          setError(true);
          console.error("Error processing snapshot data:", err);
          setLoading(false);
        }
      },
      (err) => {
        // Error handler for any issues with the Firestore listener
        setError(true);
        console.error("Error with Firestore listener:", err);
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [colRef, documentId]);

  return {
    data,
    error,
    loading,
  };
};

export default useGetDocument;
