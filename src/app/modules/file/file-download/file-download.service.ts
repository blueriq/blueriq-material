
import { Injectable, DOCUMENT, inject } from '@angular/core';
import { withErrorRedirect } from '@blueriq/angular';

@Injectable()
export class FileDownloadService {
  private readonly document = inject<Document>(DOCUMENT);


  download(url: string): void {
    // Let the browser redirect to the URL, which will initiate the download and abort any actual redirection. In case
    // the download fails, the error redirect URL that is added ensures that the browser follows a redirect to the
    // same location we are currently at.
    //
    // Alternatively, this logic could be changed to download the file over XHR and offer it as download
    // programmatically. In that scenario, the error redirect should not be applied as you'd want to have the API just
    // return a regular error response instead of a redirect. This approach is not taken by default as browser
    // compatibility may be lacking.
    this.document.location.href = toAbsoluteUrl(withErrorRedirect(url, this.document.location.href));
  }

}

// Prevent a bug where IE would interpret a relative link differently than Chrome:
// relative to the current URL in the browser instead of relative to the location of index.html
function toAbsoluteUrl(url: string): string {
  const el = document.createElement('a');
  el.href = url;
  return el.href;
}
