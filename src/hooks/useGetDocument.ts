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

    return onSnapshot(docRef, (snapshot) => {
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
    });
  }, [colRef, documentId]);

  return {
    data,
    error,
    loading,
  };
};

export default useGetDocument;
