/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import WatchingYou from '../src/index';

const mousemove = async (x, y) => {
  fireEvent(
    window,
    new MouseEvent('mousemove', {
      clientX: x,
      clientY: y,
    }),
  );
  await window.happyDOM.whenAsyncComplete();
};

describe('WatchingYou core test', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
  });

  it('It should be able to be initialized', () => {
    const gazer = new WatchingYou();
    expect(gazer instanceof WatchingYou).toBe(true);
  });

  it('It should be watching mouse', async () => {
    const eyesDom = document.querySelector('.eyes');
    const gazer = new WatchingYou(eyesDom);
    gazer.start();
    await mousemove(100, 200);
    expect(eyesDom.style.transform).not.toBe('none');
    expect(eyesDom.style.transform).not.toBe(
      'translate(0px,0px) rotate(0deg)',
    );
    expect(eyesDom.style.transform).toMatchSnapshot();
    await mousemove(300, 300);
    expect(eyesDom.style.transform).toMatchSnapshot();
  });
});