import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { CustomFileUploader } from './custom-file-uploader';

describe('CustomFileUploader', () => {

  let customFileUploader: CustomFileUploader;

  it('should process file uploader options correctly', () => {
    // Init
    const uploadOptions: FileUploaderOptions = {
      url: 'www.some-url.com',
      maxFileSize: 256,
      autoUpload: true,
      headers: [{name: 'headerName', value: 'headerValue'}],
      additionalParameter: {'aParam': 'aValue'},
    };
    customFileUploader = new CustomFileUploader(uploadOptions);
    const xhrSend = spyOn(XMLHttpRequest.prototype, 'send');
    const xhrHeader = spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
    const formData = spyOn(FormData.prototype, 'append');
    const fileItem = createFile('hello.txt');
    customFileUploader.queue.push(fileItem);

    // SUT
    customFileUploader.uploadAll();

    // Verify
    // file submit
    expect(formData).toHaveBeenCalledWith('files[]', fileItem._file, fileItem._file.name);
    // additional parameters
    expect(formData).toHaveBeenCalledWith('aParam', 'aValue');
    // verify no more formdata
    expect(formData).toHaveBeenCalledTimes(2);
    // headers
    expect(xhrHeader).toHaveBeenCalledWith('headerName', 'headerValue');
    // asserting on the formData the XHR has been called with does not look at the contents of the formData,
    // which is why the formData is asserted directly. Only verify here that send was actually called.
    expect(xhrSend).toHaveBeenCalled();
  });

  describe('_fileTypeFilter', () => {

    it('should succeed on correct file type', () => {
      // Init
      const uploadOptions: FileUploaderOptions = {
        url: 'www.some-url.com',
        maxFileSize: 256,
        autoUpload: true,
        allowedFileType: ['txt'],
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
        allowedFileType: ['doc'],
      };
      customFileUploader = new CustomFileUploader(uploadOptions);

      // SUT
      const filterResults = customFileUploader._fileTypeFilter(createFile('hello.txt').file);

      // Verify
      expect(filterResults).toBeFalsy();
    });

    it('should succeed when no extension option is set', () => {
      // Init
      const uploadOptions: FileUploaderOptions = {
        url: 'www.some-url.com',
        maxFileSize: 256,
        autoUpload: true,
      };
      customFileUploader = new CustomFileUploader(uploadOptions);

      // SUT
      const filterResults = customFileUploader._fileTypeFilter(createFile('hello.doesnotmatter').file);

      // Verify
      expect(filterResults).toBeTruthy();
    });

    it('should succeed when extension case is different', () => {
      // Init
      const uploadOptions: FileUploaderOptions = {
        url: 'www.some-url.com',
        maxFileSize: 256,
        autoUpload: true,
        allowedFileType: ['txt'],
      };
      customFileUploader = new CustomFileUploader(uploadOptions);
      // SUT
      const filterResults = customFileUploader._fileTypeFilter(createFile('hello.TXT').file);

      // Verify
      expect(filterResults).toBeTruthy();
    });
  });

  function createFile(fileName): FileItem {
    const file = new File([], fileName, { type: 'text/plain', lastModified: new Date().getTime() });
    const fileUploader: FileUploader = new FileUploader({});
    return new FileItem(fileUploader, file, {});
  }

});
