const { groupByName, formatGroupedSessions: formatSession } = require('./groupByName');

describe('Group by name util', () => {
    it('Should group an array of sessions by session name', () => {
        const input = [{name: 'session1', otherProp: 'xxx'}, {name:'session2', otherProp: 'xxx'}, {name:'session3', otherProp: 'xxx'}, {name:'session4', otherProp: 'xxx'}]
        const output = expect.objectContaining(
            input.reduce((acc, {name}) => ({...acc, [name]: expect.anything()}), {})
        )
        expect(groupByName(formatSession)(input)).toEqual(output);
    });
});