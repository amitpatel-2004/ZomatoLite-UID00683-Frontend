export type CreateMenuItemPayload = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  quantity?: number | null;
  imagePath?: string | null;
};

export type UpdateMenuItemPayload = Partial<CreateMenuItemPayload>;

export type UploadUrlPayload = {
  fileName: string;
  contentType: string;
  fileSize: number;
};

export type UploadUrlResponse = {
  uploadUrl: string;
  imagePath: string;
};

export type CsvUploadUrlPayload = {
  contentType: 'text/csv';
  fileSize: number;
};

export type CsvUploadUrlResponse = {
  uploadUrl: string;
  uploadId: string;
};
