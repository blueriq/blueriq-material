import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { CustomFileUploader } from './custom-file-uploader';

describe('CustomFileUploader', () => {

  let customFileUploader: CustomFileUploader;

  it('should call send with correct formdate', () => {
    // Init
    const uploadOptions: FileUploaderOptions = {
      url: 'www.some-url.com',
      maxFileSize: 256,
      autoUpload: true
    };
    customFileUploader = new CustomFileUploader(uploadOptions);
    spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();
    const fileItem = createFile('hello.txt');
    customFileUploader.queue.push(fileItem);
    const sendable = new FormData();
    sendable.append('files[]', fileItem._file, fileItem._file.name);

    // SUT
    customFileUploader.uploadAll();

    // Verify
    expect(XMLHttpRequest.prototype.send).toHaveBeenCalledWith(sendable);
  });

  describe('_fileTypeFilter', () => {

    it('should succeed on correct file type', () => {
      // Init
      const uploadOptions: FileUploaderOptions = {
        url: 'www.some-url.com',
        maxFileSize: 256,
        autoUpload: true,
        allowedFileType: ['txt']
      };
      customFileUploader = new CustomFileUploader(uploadOptions);

      // SUT
      const filterResults = customFileUploader._fileTypeFilter(createFile('hello.txt').file);

      // Verify
      expect(filterResults).toBeTruthy();
    });

    it('should fail on incorrect file type', () => {
      // Init
      const uploadOptions: FileUploaderOptions = {
        url: 'www.some-url.com',
        maxFileSize: 256,
        autoUpload: true,
        allowedFileType: ['doc']
      };
      customFileUploader = new CustomFileUploader(uploadOptions);

      // SUT
      const filterResults = customFileUploader._fileTypeFilter(createFile('hello.txt').file);

      // Verify
      expect(filterResults).toBeFalsy();
    });

    it('should fail when no file has no extension', () => {
      // Init
      const uploadOptions: FileUploaderOptions = {
        url: 'www.some-url.com',
        maxFileSize: 256,
        autoUpload: true
      };
      customFileUploader = new CustomFileUploader(uploadOptions);

      // SUT
      const filterResults = customFileUploader._fileTypeFilter(createFile('hello_no_extension_file.').file);

      // Verify
      expect(filterResults).toBeFalsy();
    });
  });

  function createFile(fileName): FileItem {
    const file = new File([], fileName, { type: 'text/plain', lastModified: new Date().getTime() });
    const fileUploader: FileUploader = new FileUploader({});
    return new FileItem(fileUploader, file, {});
  }

});
