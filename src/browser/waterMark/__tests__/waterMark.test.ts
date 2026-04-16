import { Watermark } from '../waterMark';

describe('Watermark', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should generate watermark masks on the body', () => {
    const wm = new Watermark({
      content: 'test mark',
    });

    const marks = document.querySelectorAll(`div[id="${wm.markId}"]`);
    expect(marks.length).toBe(1);
    expect(document.body.contains(marks[0])).toBeTruthy();
    
    wm.remove();
    expect(document.body.contains(marks[0])).toBeFalsy();
  });
});
