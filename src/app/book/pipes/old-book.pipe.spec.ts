import { OldBookPipe } from './old-book.pipe';

describe('OldBookPipe', () => {
  let pipe: OldBookPipe;

  beforeEach(() => {
    pipe = new OldBookPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return message for dates before 2010', () => {
    const result = pipe.transform('2005-06-15');
    expect(result).toBe('📚 This is an old book (published before 2010)');
  });

  it('should return empty string for dates from 2010 or later', () => {
    const result = pipe.transform('2015-01-01');
    expect(result).toBe('');
  });

  it('should return empty string for undefined input', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should return empty string for invalid date string', () => {
    const result = pipe.transform('invalid-date');
    expect(result).toBe('');
  });
});
