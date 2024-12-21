/* Function to handle change on input field if it is file or text input  */

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFileFn: (
    value: React.SetStateAction<{
      file: File | null;
      preview: string | null;
    }>
  ) => void,
  setTitleFn: (value: React.SetStateAction<string | null>) => void
) => {
  if (e.target.type === "file" && e.target.files && e.target.files.length > 0) {
    const selectedFile = e.target.files[0];
    setFileFn({
      file: selectedFile,
      preview: URL.createObjectURL(selectedFile),
    });
  } else if (e.target.type === "text") {
    setTitleFn(e.target.value.trim());
  }
};

export default handleInputChange;
