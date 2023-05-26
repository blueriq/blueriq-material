import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe which transforms file extensions from a non-dotted notation to a dotted notation.
 *
 * Example: doc,txt -> .doc,.txt
 */
@Pipe({ name: 'dottedFileExtensions' })
export class DottedFileExtensionsPipe implements PipeTransform {
  transform(extensions: string[] | undefined): string[] | undefined {
    return extensions?.map(extension => `.${ extension }`);
  }
}
