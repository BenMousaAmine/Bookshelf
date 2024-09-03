// globals.d.ts
interface SaveFilePickerOptions {
  types?: Array<{ description: string; accept: Record<string, string[]> }>;
  suggestedName?: string;
  excludeAcceptAllOption?: boolean;
  startIn?: string;
}

interface FileSystemFileHandle {
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream {
  write: (data: BufferSource | Blob | string) => Promise<void>;
  close: () => Promise<void>;
}

declare global {
  interface Window {
    showSaveFilePicker: (
      options?: SaveFilePickerOptions
    ) => Promise<FileSystemFileHandle>;
  }
}

export {};
