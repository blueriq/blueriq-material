import { DottedFileExtensionsPipe } from './dotted-file-extensions.pipe';

describe('DottedFileExtensionsPipe', () => {
  const pipe = new DottedFileExtensionsPipe();

  it('should create a dotted notation of the file extensions', () => {
    // Verify
    expect(pipe.transform(['txt', 'doc'])).toEqual(['.txt', '.doc']);
  });

  it('should not break when no file extensions are provided', () => {
    // Verify
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
