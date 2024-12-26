/* Custom hook to get paginated images */

import { useState } from "react";
import { Image } from "../types/Image.types"; // Assuming Image has properties like id, url, title, category, isDefault
import {
  collection,
  DocumentData,
  DocumentSnapshot,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import useAuth from "./useAuth";

// Define the type for the return value of the hook
type UsePaginatedImagesResult = {
  paginatedImages: Image[];
  paginatedImagesLoading: boolean;
  paginatedImagesError: string | null;
  hasMore: boolean;
  getFirstPage: () => Promise<void>;
  getNextPage: () => Promise<void>;
  getPreviousPage: () => Promise<void>;
};

const usePaginatedImages = (): UsePaginatedImagesResult => {
  const [paginatedImages, setPaginatedImages] = useState<Image[]>([]); // Store the fetched images
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null); // Track the last visible document
  const [firstVisible, setFirstVisible] = useState<DocumentSnapshot | null>(
    null
  ); // Track the first doc on the current page
  const [paginatedImagesLoading, setPaginatedImagesLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Check if there are more pages
  const [paginatedImagesError, setPaginatedImagesError] = useState<
    string | null
  >(null);

  const { user } = useAuth();

  const pageLimit = 12; // Number of items per page

  // Validate and map Firestore data to the Image type
  const mapFirestoreDataToImage = (doc: DocumentData): Image | null => {
    const data = doc.data();
    if (
      data.url &&
      data.title &&
      data.category &&
      typeof data.isDefault === "boolean"
    ) {
      return {
        _id: doc.id,
        url: data.url,
        title: data.title,
        category: data.category,
        isDefault: data.isDefault,
      };
    }
    setPaginatedImagesError(
      `Oops, something went wrong! Document missing required fields: ${doc.id}`
    );
    return null;
  };

  // Query the first page of docs
  const getFirstPage = async () => {
    setPaginatedImagesLoading(true);
    try {
      const first = query(
        collection(db, "images"),
        where("userId", "==", user?.uid),
        orderBy("title"),
        limit(pageLimit)
      );
      const documentSnapshots = await getDocs(first);

      // Map documents to Image[] while validating the structure
      const fetchedImages = documentSnapshots.docs
        .map(mapFirestoreDataToImage)
        .filter((image): image is Image => image !== null); // Filter out invalid documents

      // Update the state
      setPaginatedImages(fetchedImages);

      // Get the last visible document
      const lastVisibleDoc =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      // Check if more documents exist
      setHasMore(documentSnapshots.docs.length === pageLimit);
    } catch (error) {
      setPaginatedImagesError(`Error fetching the first page: ${error} `);
    } finally {
      setPaginatedImagesLoading(false);
    }
  };

  // Query the next page of docs
  const getNextPage = async () => {
    if (!lastVisible || !hasMore) return;

    setPaginatedImagesLoading(true);

    try {
      const nextQuery = query(
        collection(db, "images"),
        where("userId", "==", user?.uid),
        orderBy("title"), // Ascending order
        startAfter(lastVisible),
        limit(pageLimit)
      );

      const documentSnapshots = await getDocs(nextQuery);

      const fetchedImages = documentSnapshots.docs
        .map(mapFirestoreDataToImage)
        .filter((image): image is Image => image !== null);

      setPaginatedImages(fetchedImages);

      // Update pagination state
      setFirstVisible(documentSnapshots.docs[0]); // First document on this page
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

      // Check if more documents exist
      setHasMore(documentSnapshots.docs.length === pageLimit);
    } catch (error) {
      setPaginatedImagesError(`Error fetching the next page: ${error}`);
    } finally {
      setPaginatedImagesLoading(false);
    }
  };

  // Query the previous page of docs
  const getPreviousPage = async () => {
    if (!firstVisible) return;
    setPaginatedImagesLoading(true);
    setHasMore(true);

    try {
      const prevQuery = query(
        collection(db, "images"),
        where("userId", "==", user?.uid),
        orderBy("title"), // Ascending order
        endBefore(firstVisible), // Move backward from the first doc
        limitToLast(pageLimit) // Fetch previous documents in reverse
      );

      const documentSnapshots = await getDocs(prevQuery);

      const fetchedImages = documentSnapshots.docs
        .map(mapFirestoreDataToImage)
        .filter((image): image is Image => image !== null);

      setPaginatedImages(fetchedImages);

      // Update pagination state
      setFirstVisible(documentSnapshots.docs[0]); // Update first doc
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]); // Update last doc
    } catch (error) {
      setPaginatedImagesError(`Error fetching the previous page: ${error}`);
    } finally {
      setPaginatedImagesLoading(false);
    }
  };

  return {
    paginatedImages,
    paginatedImagesLoading,
    paginatedImagesError,
    hasMore,
    getFirstPage,
    getNextPage,
    getPreviousPage,
  };
};

export default usePaginatedImages;
