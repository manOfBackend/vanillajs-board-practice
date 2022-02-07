/* eslint-disable no-undef */
import { getByText, getByRole, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import Board from './Board.js';
let container;
describe('사용자는 대시보드에서 테이블을 보고 페이지를 이동할 수 있다.', () => {
  beforeEach(() => {
    container = new Board({
      contents: {
        data: [
          {
            id: 0,
            content:
              '같은 피부가 그들은 어디 곳으로 고행을 모래뿐일 있으며, 꽃 낙원을 피는 앞이 만물은 끝에',
            category: '영화',
            created_at: '2021-07-12T13:00:00.000Z',
          },
        ],
      },
    }).render();
  });

  afterEach(() => {
    if (container) {
      document.removeChild(container);
    }
  });
  it('사용자는 테이블에서 내용 항목을 볼 수 있다.', () => {
    const content = getByText(container, /내용/);
    expect(content).toBeInTheDocument();
  });
  it('사용자는 테이블에서 글을 클릭할 수 있다.', () => {
    const content = getByText(container, /영화/);
    expect(content).toBeInTheDocument();
    fireEvent(content, 'click');
  });
  it('사용자가 테이블에서 글을 클릭하면 추천수가 증가한다.', () => {
    const content = getByText(container, /영화/);
    expect(content).toBeInTheDocument();
    fireEvent(content, 'click');
  });
});
