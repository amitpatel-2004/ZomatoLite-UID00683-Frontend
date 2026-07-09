export type MenuItemCsvUploadModalProps = {
  open: boolean;
  isUploading: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
};
