import { useState } from "react";
import { Image } from "../types/Image.types"; // Assuming Image has properties like id, url, title, category, isDefault
import {
  collection,
  DocumentData,
  getDocs,
  limit,
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
  hasMore: boolean;
  getFirstPage: () => Promise<void>;
  getNextPage: () => Promise<void>;
};

const usePaginatedImages = (): UsePaginatedImagesResult => {
  const [paginatedImages, setPaginatedImages] = useState<Image[]>([]); // Store the fetched images
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null); // Track the last visible document
  const [paginatedImagesLoading, setPaginatedImagesLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // Check if there are more pages

  const { user } = useAuth();

  const pageLimit = 3; // Number of items per page

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
    console.error("Document missing required fields:", doc.id);
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
      console.error("Error fetching the first page:", error);
    } finally {
      setPaginatedImagesLoading(false);
    }
  };

  // Query the next page of docs
  const getNextPage = async () => {
    if (!lastVisible || !hasMore) return; // Prevent unnecessary calls
    setPaginatedImages([]);
    setPaginatedImagesLoading(true);
    try {
      const next = query(
        collection(db, "images"),
        where("userId", "==", user?.uid),
        orderBy("title"),
        startAfter(lastVisible),
        limit(pageLimit)
      );

      const documentSnapshots = await getDocs(next);

      // Map documents to Image[] while validating the structure
      const fetchedImages = documentSnapshots.docs
        .map(mapFirestoreDataToImage)
        .filter((image): image is Image => image !== null);

      // Update the state with new data
      setPaginatedImages((prev) => [...prev, ...fetchedImages]);

      // Update the last visible document
      const lastVisibleDoc =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      // Check if more documents exist
      setHasMore(documentSnapshots.docs.length === pageLimit);
    } catch (error) {
      console.error("Error fetching the next page:", error);
    } finally {
      setPaginatedImagesLoading(false);
    }
  };

  return {
    paginatedImages,
    paginatedImagesLoading,
    hasMore,
    getFirstPage,
    getNextPage,
  };
};

export default usePaginatedImages;
