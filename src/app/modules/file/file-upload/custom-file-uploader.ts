import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { FileLikeObject } from 'ng2-file-upload/file-upload/file-like-object.class';

/**
 * Currently the ng2-file-upload sends out a request for every file when uploading
 * multiple files. Our runtime expects only one call which contains multiple files.
 * Successive upload calls do not fail, but they are disregarded, so the files are
 * lost. So we need to be able to send multiple files in one go.
 *
 * This is not yet possible with the ng2-file-upload. There is an issue
 * {@see https://github.com/valor-software/ng2-file-upload/issues/671} and a PR
 * {@see https://github.com/valor-software/ng2-file-upload/pull/993}. For now, a
 * workaround that has been suggested in the comments
 * {@see https://github.com/valor-software/ng2-file-upload/issues/671#issuecomment-336521334}
 * is implemented below. It simply wraps all the files to upload in FormData and
 * sends that in one request.
 */
export class CustomFileUploader extends FileUploader {

  constructor(options: FileUploaderOptions) {
    super(options);
  }

  uploadAll(): void {
    const xhr = new XMLHttpRequest();
    const sendable = new FormData();
    const fakeItem: FileItem = null!;
    this.onBuildItemForm(fakeItem, sendable);

    for (const item of this.queue) {
      item.isReady = true;
      item.isUploading = true;
      item.isUploaded = false;
      item.isSuccess = false;
      item.isCancel = false;
      item.isError = false;
      item.progress = 0;

      if (typeof item._file.size !== 'number') {
        throw new TypeError('The file specified is no longer valid');
      }
      sendable.append('files[]', item._file, item.file.name);
    }

    if (this.options.additionalParameter !== undefined) {
      Object.keys(this.options.additionalParameter).forEach((key) => {
        if (this.options.additionalParameter) {
          sendable.append(key, this.options.additionalParameter[key]);
        }
      });
    }

    xhr.onerror = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response, headers);
      this.onErrorItem(fakeItem, response, xhr.status, headers);
    };

    xhr.onabort = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response, headers);
      this.onErrorItem(fakeItem, response, xhr.status, headers);
    };

    xhr.open('POST', this.options.url!, true);
    xhr.withCredentials = true;
    if (this.options.headers) {
      for (let _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
        const header = _a[_i];
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (this.authToken) {
      xhr.setRequestHeader(this.authTokenHeader, this.authToken);
    }

    xhr.onload = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response, headers);
      const gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
      const method = '_on' + gist + 'Item';
      for (const item of this.queue) {
        this[method](item, response, xhr.status, headers);
      }
      if (this.queue[0]) {
        this._onCompleteItem(this.queue[0], response, xhr.status, headers);
      }
    };
    xhr.send(sendable);
  }

  _fileTypeFilter(item: FileLikeObject): boolean {
    const fileExtension = item.name.split('.').pop();
    if (!fileExtension) {
      return false;
    } else if (this.options.allowedFileType) {
      return this.options.allowedFileType.indexOf(fileExtension) > -1;
    } else {
      return true;
    }
  }
}
