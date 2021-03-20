import {main} from '../src/index';

test('test main', () => {
    const result = main()
    expect(result).toEqual(2)
})