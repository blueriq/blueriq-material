import { CheckboxflowonrefreshFlow } from './checkboxflowonrefresh.flow';

describe('CheckBox flow on refresh App', () => {

  let app: CheckboxflowonrefreshFlow = new CheckboxflowonrefreshFlow();

  beforeEach(async() => {
    await app.reset(); // in beforeEach because taking screenshot for failing tests fails when placed in the afterEach
    await app.start();
  });

  it('should display header with text', () => {
    expect(app.pageTitlePersonsActive).toBe('persons');
  });

  it('should have 4 checkboxes', () => {
    expect(app.nrOfCheckboxes).toBe(4);
  });

  it('should have 4 textareas', () => {
    expect(app.nrOfTextAreas).toBe(4);
  });

  it('first text should be 1', () => {
    expect(app.getTextForCheckbox(1)).toBe('1');
  });

  it('second text should be 2', () => {
    expect(app.getTextForCheckbox(2)).toBe('2');
  });

  it('third text should be 2', () => {
    expect(app.getTextForCheckbox(3)).toBe('2');
  });

  it('fourth text should be 3', () => {
    expect(app.getTextForCheckbox(4)).toBe('3');
  });

  it('only the first text should be 5 after checking the first checkbox', () => {
    expect(app.getTextForCheckbox(1)).toBe('1');
    app.getCheckboxLabel(1).click();

    expect(app.getTextForCheckbox(1)).toBe('5');

    expect(app.getTextForCheckbox(2)).not.toBe('5');
    expect(app.getTextForCheckbox(3)).not.toBe('5');
    expect(app.getTextForCheckbox(4)).not.toBe('5');
  });

  it('only the third text should be 5 after checking the third checkbox', () => {
    expect(app.getTextForCheckbox(3)).toBe('2');
    app.getCheckboxLabel(3).click();

    expect(app.getTextForCheckbox(3)).toBe('5');

    expect(app.getTextForCheckbox(1)).not.toBe('5');
    expect(app.getTextForCheckbox(2)).not.toBe('5');
    expect(app.getTextForCheckbox(4)).not.toBe('5');
  });

  it('only the second and third text should be 5 after checking the second and third checkbox', () => {
    expect(app.getTextForCheckbox(3)).toBe('2');
    app.getCheckboxLabel(3).click();

    expect(app.getTextForCheckbox(3)).toBe('5');

    expect(app.getTextForCheckbox(1)).not.toBe('5');
    expect(app.getTextForCheckbox(2)).not.toBe('5');
    expect(app.getTextForCheckbox(4)).not.toBe('5');

    expect(app.getTextForCheckbox(2)).toBe('2');
    app.getCheckboxLabel(2).click();

    expect(app.getTextForCheckbox(2)).toBe('5');
    expect(app.getTextForCheckbox(3)).toBe('5');

    expect(app.getTextForCheckbox(1)).not.toBe('5');
    expect(app.getTextForCheckbox(4)).not.toBe('5');
  });
});
