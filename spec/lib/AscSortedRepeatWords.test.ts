import {AscSortedRepeatWord} from 'lib/legacy/AscSortedRepeatWord';
import {RepeatedWordType} from 'lib/legacy/types';

describe('AscSortedRepeatWords', () => {
  const create = (data: RepeatedWordType[]) => {
    const mock = {
      get: () => data,
    };

    return new AscSortedRepeatWord(mock);
  };

  it('empty', () => {
    const words = create([]).get();
    expect(words.length).toBe(0);
  });

  it('one element', () => {
    const data = [{word: 'hi', count: 2}];
    const words = create(data).get();
    expect(words).toStrictEqual(data);
  });

  it('three elements', () => {
    const data = [{
      word: 'g', count: 5,
    },
    {
      word: 'hi', count: 2,
    },
    {
      word: 'hello', count: 14,
    }];

    const words = create(data).get();

    expect(words).toStrictEqual([{
      word: 'hi', count: 2,
    }, {
      word: 'g', count: 5,
    }, {
      word: 'hello', count: 14,
    }]);
  });
});

